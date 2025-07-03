import { apiClient } from "../apiClient";
import type { LoginFormData } from '../../lib/validations/auth';

export interface LoginRequest {
  email: string;
  password: string;
}

// Updated to match your actual API response structure
export interface LoginResponse {
  message: string;
  token: string;
  userWithoutPassword: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profileImage: string;
    totalDocuments: number;
    isVerified: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export const loginUser = async (data: LoginFormData): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/api/auth/login', data);
  return response.data;
};