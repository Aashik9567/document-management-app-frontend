import { apiClient } from '../apiClient';

export const deleteUserDocument = async (documentId: string) => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (!token) {
        throw new Error('No authentication token found');
    }
  const response = await apiClient.delete(`api/user-documents/${documentId}`,{
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the request headers
      }, 
    });
    return response.data;
};