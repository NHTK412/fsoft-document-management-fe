import apiClient from './apiClient';

export const chatService = {
  async getSessions(projectId) {
    return await apiClient.get(`/projects/${projectId}/chat/sessions`);
  },

  async createSession(projectId, initialQuery) {
    return await apiClient.post(`/projects/${projectId}/chat/sessions`, { initialQuery });
  },

  async getSessionMessages(projectId, sessionId) {
    return await apiClient.get(`/projects/${projectId}/chat/sessions/${sessionId}/messages`);
  },

  async sendMessage(projectId, sessionId, message, selectedDocumentIds = []) {
    return await apiClient.post(`/projects/${projectId}/chat/sessions/${sessionId}/messages`, {
      message,
      selectedDocumentIds,
    });
  },
};
