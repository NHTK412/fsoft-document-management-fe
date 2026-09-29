import apiClient from './apiClient';

export const authService = {
  async login(credentials) {
    const res = await apiClient.post('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });
    if (res?.data?.accessToken) {
      localStorage.setItem('kbase_access_token', res.data.accessToken);
      if (res.data.user) {
        localStorage.setItem('kbase_user', JSON.stringify(res.data.user));
      }
    }
    return res;
  },

  async register(data) {
    return await apiClient.post('/auth/register', {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });
  },

  async getCurrentUser() {
    return await apiClient.get('/auth/me');
  },

  logout() {
    localStorage.removeItem('kbase_access_token');
    localStorage.removeItem('kbase_user');
  },

  getStoredToken() {
    return localStorage.getItem('kbase_access_token');
  },

  getStoredUser() {
    const u = localStorage.getItem('kbase_user');
    try {
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },
};
