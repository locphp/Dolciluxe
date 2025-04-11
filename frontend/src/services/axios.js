import axios from 'axios';

const BE_BASE_URL = 'http://localhost:8080'
const response = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true, // URL cho localhost
});


response.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Gắn access_token nếu có
response.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tự động refresh token khi access_token hết hạn
response.interceptors.response.use(
  res => res,
  async err => {
    const originalConfig = err.config;
    if (err.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const refresh_token = localStorage.getItem('refresh_token');
        const res = await axios.post(`${BE_BASE_URL}/api/auth/refresh-token`, { refresh_token });

        const newAccess = res.data.access_token;
        localStorage.setItem('access_token', newAccess);

        originalConfig.headers.Authorization = `Bearer ${newAccess}`;
        return response(originalConfig); // Gửi lại request cũ
      } catch (e) {
        localStorage.clear();
        window.location.href = '/auth?mode=signin';
      }
    }
    return Promise.reject(err);
  }
);


export { response, BE_BASE_URL };
