import {
  loginFail,
  loginStart,
  loginSuccess,
  logOutFail,
  logOutStart,
  logOutSuccess,
  registerFail,
  registerStart,
  registerSuccess,
} from './authSlice';
import { response } from '~/services/axios';
import { toast } from 'react-toastify';

export const loginUser = async (dispatch, user, navigate, redirectPath = '/') => {
  dispatch(loginStart());
  try {
    // const res = await response.post('/api/public/login', user);

    const res = await response.post('/api/auth/login', user);
    const { accessToken, refreshToken } = res;
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('login_type', 'normal');
    localStorage.removeItem('loggedOut');
    sessionStorage.removeItem('googleSynced');
    localStorage.setItem('login_type', 'normal');
    dispatch(loginSuccess(res));
    toast.success('Đăng nhập thành công', {
      position: 'bottom-right',
    });
    // console.log('Res login:', res);
    navigate(redirectPath);
  } catch (err) {
    dispatch(loginFail());
    if (err.response) {
      if (err.response.status === 500) {
        toast.error('Tài khoản chưa được đăng ký', {
          position: 'bottom-right',
        });
      } else if (err.response.status === 400) {
        toast.error('Sai mật khẩu', {
          position: 'bottom-right',
        });
      }
    }
  }
};

export const logOutUser = async (dispatch, token, navigate, redirectPath = '/auth?mode=signin') => {
  dispatch(logOutStart());
  try {

    await response.post('/api/auth/logout', { refresh_token: token });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('login_type');
    localStorage.setItem('loggedOut', 'true');
    sessionStorage.removeItem('googleSynced');
    dispatch(logOutSuccess());
    navigate(redirectPath);
  } catch (err) {
    console.log(err);
    dispatch(logOutFail());
  }
};

export const registerUser = async (dispatch, user, navigator) => {
  dispatch(registerStart());
  try {
    await response.post('/api/auth/register', user);
    dispatch(registerSuccess());
    toast.success('Đăng kí thành công', {
      position: 'bottom-right',
    });
    navigator('/auth?mode=signin');
  } catch (err) {
    dispatch(registerFail());
    if (err.response) {
      if (err.response.status === 400) {
        toast.error('Tài khoản đã tồn tại', {
          position: 'bottom-right',
        });
      } else if (err.response.status === 401) {
        toast.error('Sai mật khẩu', {
          position: 'bottom-right',
        });
      }
    }
  }
};

// export const googleLoginUser = async (dispatch, refToken, token) => {
//   dispatch(loginStart());
//   try {
//     const res = await response.get('/api/protected/user/current_user', {
//       headers: { Authorization: `Bearer ${refToken}` },
//     });
//     const data = {
//       user: res.data,
//       refresh_token: refToken,
//       access_token: token,
//     };
//     console.log(data);
//     dispatch(loginSuccess(data));
//   } catch (err) {
//     dispatch(loginFail());
//   }
// };

// export const renewToken = async (token) => {
//   try {
//     const res = await response.post('/api/public/renew_access', { refresh_token: token });
//     return res.data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const refreshToken = async (token) => {
//   try {
//     const res = await response.post('/auth/renew_refresh', { refresh_token: token });
//     return res.data;
//   } catch (err) {
//     console.log(err);
//   }
// };

export const refreshToken = async (refreshToken) => {
  try {
    const res = await response.post('/api/auth/refresh-token', { refreshToken: refreshToken });
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const googleLoginUser = async (dispatch) => {
  dispatch(loginStart());
  try {
    const res = await response.get('/api/auth/google', {
      withCredentials: true,
    });
    const { user, access_token, refresh_token } = res.data;

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('login_type', 'google');

    dispatch(loginSuccess({ user, access_token, refresh_token }));
  } catch (err) {
    dispatch(loginFail());
  }
};