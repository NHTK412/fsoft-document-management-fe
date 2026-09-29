import apiClient from './apiClient';

export const dashboardService = {
  async getStats(projectId) {
    return await apiClient.get(`/projects/${projectId}/dashboard/stats`);
  },

  async getRecentlyViewed(projectId, limit = 5) {
    return await apiClient.get(`/projects/${projectId}/dashboard/recently-viewed`, {
      params: { limit },
    });
  },

  async getActivities(projectId, limit = 10) {
    return await apiClient.get(`/projects/${projectId}/dashboard/activities`, {
      params: { limit },
    });
  },
};
