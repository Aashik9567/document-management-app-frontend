import { apiClient } from "../apiClient";
import type { SignupFormData } from '../../lib/validations/auth';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  profileImage?: string;
}

export interface RegisterResponse {
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
    token: string;
  };
}

export const registerUser = async (data: SignupFormData): Promise<RegisterResponse> => {
  // Handle profile image upload if exists
  let profileImageUrl: string | undefined;
  
  if (data.profileImage && data.profileImage.length > 0) {
    const formData = new FormData();
    formData.append('profileImage', data.profileImage[0]);
    
    // Upload image first (you might need a separate endpoint for this)
    // For now, we'll skip the actual upload and send undefined
    profileImageUrl = undefined;
  }

  const payload: RegisterRequest = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    password: data.password,
    profileImage: profileImageUrl,
  };

  const response = await apiClient.post<RegisterResponse>('/api/auth/register', payload);
  return response.data;
};