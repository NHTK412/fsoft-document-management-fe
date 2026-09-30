import apiClient from './apiClient';

export const adminService = {
  // Lấy dữ liệu thống kê tổng quan hệ thống
  async getStats() {
    return await apiClient.get('/admin/stats');
  },

  // Lấy danh sách người dùng (phân trang & tìm kiếm)
  async getUsers(page = 0, size = 10, sort = 'id,asc') {
    return await apiClient.get(`/admin/users?page=${page}&size=${size}&sort=${sort}`);
  },

  // Xem chi tiết người dùng
  async getUserById(userId) {
    return await apiClient.get(`/admin/users/${userId}`);
  },

  // Đổi vai trò (ROLE_ADMIN, ROLE_USER)
  async changeRole(userId, role) {
    return await apiClient.patch(`/admin/users/${userId}/role?role=${role}`);
  },

  // Khóa / Mở khóa tài khoản
  async toggleStatus(userId) {
    return await apiClient.patch(`/admin/users/${userId}/status`);
  },

  // Xóa tài khoản người dùng
  async deleteUser(userId) {
    return await apiClient.delete(`/admin/users/${userId}`);
  },

  // Lấy toàn bộ danh sách dự án
  async getAllProjects() {
    return await apiClient.get('/admin/projects');
  },

  // Xóa dự án (Admin)
  async deleteProject(projectId) {
    return await apiClient.delete(`/admin/projects/${projectId}`);
  },
};
