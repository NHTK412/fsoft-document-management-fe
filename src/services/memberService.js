import apiClient from './apiClient';

export const memberService = {
  async getMembers(projectId, search) {
    return await apiClient.get(`/projects/${projectId}/members`, {
      params: search ? { search } : {},
    });
  },

  async getPendingInvites(projectId) {
    return await apiClient.get(`/projects/${projectId}/invites`);
  },

  async inviteMember(projectId, email, role = 'Member') {
    return await apiClient.post(`/projects/${projectId}/invites`, { email, role });
  },

  async updateMemberRole(projectId, memberId, role) {
    return await apiClient.patch(`/projects/${projectId}/members/${memberId}/role`, { role });
  },

  async resendInvite(projectId, inviteId) {
    return await apiClient.post(`/projects/${projectId}/invites/${inviteId}/resend`);
  },

  async cancelInvite(projectId, inviteId) {
    return await apiClient.delete(`/projects/${projectId}/invites/${inviteId}`);
  },

  async removeMember(projectId, memberId) {
    return await apiClient.delete(`/projects/${projectId}/members/${memberId}`);
  },
};
