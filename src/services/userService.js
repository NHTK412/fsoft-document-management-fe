import apiClient from './apiClient';

export const userService = {
  async getProfile() {
    return await apiClient.get('/users/me/profile');
  },

  async updateProfile(data) {
    return await apiClient.put('/users/me/profile', data);
  },

  async uploadAvatar(file) {
    const formData = new FormData();
    formData.append('file', file);
    return await apiClient.post('/users/me/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async removeAvatar() {
    return await apiClient.delete('/users/me/avatar');
  },

  async changePassword(currentPassword, newPassword) {
    return await apiClient.post('/users/me/change-password', {
      currentPassword,
      newPassword,
    });
  },

  async getSessions() {
    return await apiClient.get('/users/me/sessions');
  },

  async revokeSession(sessionId) {
    return await apiClient.delete(`/users/me/sessions/${sessionId}`);
  },

  async revokeAllOtherSessions() {
    return await apiClient.delete('/users/me/sessions');
  },
};
