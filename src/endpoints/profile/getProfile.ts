import { apiClient } from "../apiClient";

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
      profileImage?: string;
      createdAt: string;
    };
  };
}

export const getProfile = async (): Promise<ProfileResponse> => {
  const response = await apiClient.get<ProfileResponse>('/api/auth/profile');
  return response.data;
};