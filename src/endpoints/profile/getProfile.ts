import { useAuthStore } from "../../states/authStore";
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
  // Get token and setUser from the store
  const { token} = useAuthStore.getState();

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