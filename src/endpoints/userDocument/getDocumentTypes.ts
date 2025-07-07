import { apiClient } from '../apiClient';

export const getDocumentTypes = async () => {
  const response = await apiClient.get('/api/document-types');
  return response.data;
};