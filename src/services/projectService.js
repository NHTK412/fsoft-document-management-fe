import apiClient from './apiClient';

export const projectService = {
  async getAllProjects(params = {}) {
    return await apiClient.get('/projects', { params });
  },

  async getProjectById(projectId) {
    return await apiClient.get(`/projects/${projectId}`);
  },

  async createProject(data) {
    const payload = { ...data };
    if (Array.isArray(payload.inviteEmails)) {
      payload.inviteEmails = payload.inviteEmails.map((e) => (typeof e === 'string' ? e.trim() : '')).filter(Boolean).join(',') || null;
    }
    return await apiClient.post('/projects', payload);
  },

  async updateProject(projectId, data) {
    return await apiClient.put(`/projects/${projectId}`, data);
  },

  async getProjectSettings(projectId) {
    return await apiClient.get(`/projects/${projectId}/settings`);
  },

  async updateProjectSettings(projectId, data) {
    return await apiClient.put(`/projects/${projectId}/settings`, data);
  },

  async transferOwnership(projectId, newOwnerEmail) {
    return await apiClient.post(`/projects/${projectId}/transfer-ownership`, { newOwnerEmail });
  },

  async archiveProject(projectId) {
    return await apiClient.post(`/projects/${projectId}/archive`);
  },

  async deleteProject(projectId, confirmationProjectName) {
    return await apiClient.delete(`/projects/${projectId}`, {
      data: { confirmationProjectName },
    });
  },
};
