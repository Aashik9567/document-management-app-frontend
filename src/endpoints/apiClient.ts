import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://document-backend-y4tz.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});