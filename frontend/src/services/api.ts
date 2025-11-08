import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import type { WeatherData, ApiResponse } from "../types/weather";

const API_URL = import.meta.env.VITE_API_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let getAccessToken: (() => Promise<string>) | null = null;

export const setAccessTokenGetter = (getter: () => Promise<string>) => {
  getAccessToken = getter;
};

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (getAccessToken) {
      try {
        const token = await getAccessToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error getting access token:", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message =
        error.response.data.message ||
        error.response.data.error ||
        "An error occurred";
      return Promise.reject(new Error(message));
    } else if (error.request) {
      return Promise.reject(
        new Error("No response from server. Please check your connection.")
      );
    } else {
      return Promise.reject(error);
    }
  }
);

export const getWeatherData = async (): Promise<WeatherData[]> => {
  const response = await apiClient.get<ApiResponse<WeatherData[]>>("/weather");
  return response.data.data || [];
};

export const getWeatherByCity = async (
  cityId: number
): Promise<WeatherData> => {
  const response = await apiClient.get<ApiResponse<WeatherData>>(
    `/weather/${cityId}`
  );
  if (!response.data.data) {
    throw new Error("No weather data returned");
  }
  return response.data.data;
};

export default apiClient;
