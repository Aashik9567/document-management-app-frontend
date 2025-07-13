import { apiClient } from '../apiClient';
import type { GetUserDocumentsResponse } from '../../types/document';

export const getUserDocuments = async (): Promise<GetUserDocumentsResponse> => {
  try {
     const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');
    const response = await apiClient.get<GetUserDocumentsResponse>('/api/user-documents', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Get user documents error:', error);
    throw error;
  }
};