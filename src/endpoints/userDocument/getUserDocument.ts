import { apiClient } from '../apiClient';
import type { GetUserDocumentsResponse } from '../../types/document';

export const getUserDocuments = async (): Promise<GetUserDocumentsResponse> => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const response = await apiClient.get<GetUserDocumentsResponse>('/api/user-documents',{
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the request headers
      }, 
    });
    return response.data;
  } catch (error: any) {
    console.error('Get user documents error:', error);
    throw error;
  }
};