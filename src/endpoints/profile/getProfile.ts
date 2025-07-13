
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
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token found.");
  }

  const response = await apiClient.get<ProfileResponse>('api/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  if (response.data.success) {
    return response.data;
  } else {
    throw new Error(response.data.message || 'Failed to fetch profile.');
  }
};