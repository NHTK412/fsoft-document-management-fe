import apiClient from './apiClient';

export const inviteService = {
  /**
   * Lấy danh sách tất cả lời mời tham gia dự án đang chờ xử lý của người dùng hiện tại
   */
  async getMyPendingInvites() {
    return await apiClient.get('/invites/my-invites');
  },

  /**
   * Chấp nhận lời mời tham gia dự án
   */
  async acceptInvite(inviteId) {
    return await apiClient.post(`/invites/${inviteId}/accept`);
  },

  /**
   * Từ chối lời mời tham gia dự án
   */
  async declineInvite(inviteId) {
    return await apiClient.post(`/invites/${inviteId}/decline`);
  },
};

export default inviteService;
