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

export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await apiClient.get<ProfileResponse>("api/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("An unexpected error occurred while fetching the profile.");
  }
};
