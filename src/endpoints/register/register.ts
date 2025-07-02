import { apiClient } from "../apiClient";
import type { SignupFormData } from "../../types/auth";

export const registerApi = async (data: SignupFormData) => {
  const response = await apiClient.post("/api/auth/register", data);
  return response.data;
};