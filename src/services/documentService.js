import apiClient from './apiClient';

export const documentService = {
  async getDocuments(projectId, params = {}) {
    return await apiClient.get(`/projects/${projectId}/documents`, { params });
  },

  async uploadDocument(projectId, file, category) {
    const formData = new FormData();
    formData.append('file', file);
    if (category) {
      formData.append('category', category);
    }
    return await apiClient.post(`/projects/${projectId}/documents/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async getPreviewUrl(projectId, documentId) {
    return await apiClient.get(`/projects/${projectId}/documents/${documentId}/preview-url`);
  },

  async getDownloadUrl(projectId, documentId) {
    return await apiClient.get(`/projects/${projectId}/documents/${documentId}/download-url`);
  },

  async deleteDocument(projectId, documentId) {
    return await apiClient.delete(`/projects/${projectId}/documents/${documentId}`);
  },

  async bulkDeleteDocuments(projectId, ids) {
    return await apiClient.post(`/projects/${projectId}/documents/bulk-delete`, { ids });
  },
};
