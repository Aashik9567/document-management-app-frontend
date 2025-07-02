import { apiClient } from "../apiClient";
import type { LoginFormData } from "../../types/auth";

export const loginApi = async (data: LoginFormData) => {
  const response = await apiClient.post("/api/auth/login", data);
  return response.data;
};