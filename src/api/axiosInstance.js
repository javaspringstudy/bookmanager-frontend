import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true
});

// 요청 인터셉터, 응답 인터셉터 공통
api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const res = await axios.post('/api/auth/refresh', {}, { withCredentials: true });
      const newAccessToken = res.data.accessToken;

      localStorage.setItem('accessToken', newAccessToken);

      api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api;