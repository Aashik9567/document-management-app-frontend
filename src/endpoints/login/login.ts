import { apiClient } from "../apiClient";
import type { LoginFormData } from '../../lib/validations/auth';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
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

export const loginUser = async (data: LoginFormData): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/api/auth/login', data);
  return response.data;
};

