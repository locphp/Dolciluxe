import {response} from '~/services/axios';



// Đổi lại thứ tự tham số cho hợp lý và nhất quán

// export const getCurrentUser = async (instance, token, id) => {
//   try {
//     const res = await instance.get(`/api/users/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return res.data;
//   } catch (err) {
//     if (err.response) console.error('Server error: ', err.response.data.message, err.response.status);
//     else console.error('Request error: ', err.message);
//   }
// };

export const getCurrentUser = async () => {
  try {
    const res = await response.get(`/api/users/current-user`);
    return res;
  } catch (err) {
    console.error('Lỗi getCurrentUser:', err.response?.data || err.message);
    throw err;
  }
};


// export const updateUser = async (instance, token, data) => {
//   try {
//     const config = {
//       headers: token
//         ? { Authorization: `Bearer ${token}` }
//         : undefined,
//       withCredentials: !token, // true nếu không dùng token
//     };
//     console.log('ID gửi update:', data.id);
//     console.log('Data gửi update:', data);
//     console.log('Token truyền vào:', token);
//     console.log('config truyền vào:', config);
//     const res = await instance.put(`/api/users/${data.id}`, config, data);
//     return res.data;
//   } catch (err) {
//     console.error('Lỗi khi gọi updateUser API:', err.response?.data || err.message);
//     throw err;
//   }
// };

export const updateUser = async (data) => {
  try {
    const { id, ...updateData } = data;
    const res = await response.put(`/api/users/${id}`, updateData);
    return res;
  } catch (err) {
    console.error('Lỗi updateUser:', err.response?.data || err.message);
    throw err;
  }
};
// export const updateUser = async (instance, data) => {
//   try {
//     const { id, ...updateData } = data;
//     const res = await instance.put(`/api/users/${id}`, updateData);
//     return res;
//   } catch (err) {
//     console.error('Lỗi updateUser:', err.response?.data || err.message);
//     throw err;
//   }
// };



// export const updateImageUser = async (instance, token, file) => {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       const res = await instance.post('/api/upload', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data', 
//         },
//       });
  
//       return res.data;
//     } catch (err) {
//       if (err.response) {
//         console.error('Server error: ', err.response.message, err.response.status);
//       } else {
//         console.error('Request error: ', err.message);
//       }
//     }
//   };

export const updateImageUser = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await response.post('/api/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res;
  } catch (err) {
    console.error('Lỗi updateImageUser:', err.response?.data || err.message);
    throw err;
  }
};
  
  // export const requestPasswordUser = async (email) => {
  //   try {
  //     const res = await response.post('/api/public/request-password-reset', {"email": email})
  //     return res.message
  //   }
  //   catch(err) {
  //    console.log(err)
  //   }
  // }

  export const requestPasswordUser = async (email) => {
    try {
      const res = await response.post('/api/auth/forgot-password', { email });
      return res.message;
    } catch (err) {
      console.error('Lỗi requestPasswordUser:', err.response?.data || err.message);
      throw err;
    }
  };

  export const changePasswordFromMail = async (data) => {
    try {
      const res = await response.post('/api/auth/reset-password', data);
      return res;
    } catch (err) {
      console.error('Lỗi changePasswordUserFromMail:', err.response?.data?.message || err.message);
      throw err;
    }
  };

export const changePasswordUser = async ( data ) => {
  try {
    const res = await response.put(`/api/users/current-user/update-password`,  data );
    return res;
  } catch (err) {
    console.error('Lỗi changePasswordUser:', err.response?.data?.message || err.message);
    throw err;
  }
};


// export const getListUsers = async (token, instance) => {
//     try {
//       const res = await instance.get('/api/users/', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log('Response từ API:', res.data);
//       return res.data; 
//     } catch (err) {
//       console.error('Lỗi API:', err.response?.data || err.message);
//       throw new Error(err.response?.data?.message || 'Lỗi khi lấy danh sách người dùng');
//     }
//   };

export const getListUsers = async () => {
  try {
    const res = await response.get('/api/users/');
    return res;
  } catch (err) {
    console.error('Lỗi getListUsers:', err.response?.data || err.message);
    throw err;
  }
};

  // export const deleteUsers = async (token, id, instance) => {
  //   try{
  //       const res = await instance.delete(`/api/protected/user/${id}`, {
  //           headers: {Authorization: `Bearer ${token}`},
  //       });
  //       console.log('Xóa thành công:', res.data);
  //       return res.data;
  //   } catch (err) {
  //       if(err.response){
  //           console.error('Server error: ', err.response.data, err.response.status);
  //           console.error('Request error: ', err.message);
  //           throw err;
  //       }
  //   }
  // }; 

  export const deleteUsers = async (id) => {
    try {
      const res = await response.delete(`/api/protected/user/${id}`);
      return res;
    } catch (err) {
      console.error('Lỗi deleteUsers:', err.response?.data || err.message);
      throw err;
    }
  };