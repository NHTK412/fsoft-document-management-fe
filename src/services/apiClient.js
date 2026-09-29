import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('kbase_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle errors & format ApiResponse
apiClient.interceptors.response.use(
  (response) => {
    // If response is standard ApiResponse, return payload or full data
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Auto clear token on unauthorized
      localStorage.removeItem('kbase_access_token');
      localStorage.removeItem('kbase_user');
      // If not already on auth page, can redirect
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login';
      }
    }

    // Normalize error message
    const errMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Đã xảy ra lỗi khi kết nối tới máy chủ!';

    return Promise.reject(new Error(errMessage));
  }
);

export default apiClient;
