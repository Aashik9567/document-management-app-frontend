import { apiClient } from "../apiClient";

export const getProfileApi = async () => {
  const response = await apiClient.get("/api/auth/profile");
  return response.data;
};