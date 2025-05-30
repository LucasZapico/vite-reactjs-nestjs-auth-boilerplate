import type {
  InternalAxiosRequestConfig,
  AxiosInstance,
  AxiosRequestHeaders,
} from "axios";
import axios from "axios";
import { logInfo } from "@/utils/logger";

interface AdaptAxiosRequestConfig extends InternalAxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

export const PrimeApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PRIME_API_URL,
  timeout: 10000, // 10 seconds timeout
});



PrimeApi.interceptors.request.use((config) => {
  if (config) {
    logInfo("axios config check", config);
    const { method, url } = config;
    logInfo(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);
    return config;
  }
  return config;
});

export const addBearerToken = (
  axiosInstance: AxiosInstance,
  accessToken: string
) => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      if (config && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      }
      console.log("axios config check", config);
      return config;
    }
  );
  return true;
};
