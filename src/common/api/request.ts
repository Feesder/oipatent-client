import { useAuthStore } from "@/src/features/auth/stores/auth-store";
import axios from "axios";
import { refresh } from "./requests/auth/refresh";

export const request = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use((config) => {
  const token = useAuthStore.getState().getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

request.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status == 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const [user, auth] = await refresh();
        useAuthStore.getState().setAuth(auth, user);
        console.log(auth);
        return await request(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);
