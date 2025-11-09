import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosError,
} from "axios";
import type { WeatherData, ApiResponse } from "../types/weather";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

let getAccessToken: (() => Promise<string>) | null = null;

export const setAccessTokenGetter = (getter: () => Promise<string>) => {
  getAccessToken = getter;
};

// Request interceptor - Add token to requests
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
        // Don't throw here - let the request proceed
        // The backend will return 401 if token is required
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; error?: string }>) => {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const message =
        error.response.data?.message ||
        error.response.data?.error ||
        "An error occurred";

      // Handle specific status codes
      switch (status) {
        case 401:
          console.error("Unauthorized - Token may be expired");
          return Promise.reject(
            new Error("Unauthorized - Please log in again")
          );
        case 403:
          return Promise.reject(
            new Error("Forbidden - Insufficient permissions")
          );
        case 404:
          return Promise.reject(new Error("Resource not found"));
        case 429:
          return Promise.reject(
            new Error("Too many requests - Please try again later")
          );
        case 500:
          return Promise.reject(
            new Error("Server error - Please try again later")
          );
        default:
          return Promise.reject(new Error(message));
      }
    } else if (error.request) {
      // Request made but no response
      console.error("No response from server:", error.request);
      return Promise.reject(
        new Error("No response from server. Please check your connection.")
      );
    } else {
      // Something else happened
      console.error("Request error:", error.message);
      return Promise.reject(
        new Error(error.message || "An unexpected error occurred")
      );
    }
  }
);

// Weather API functions
export const getWeatherData = async (): Promise<WeatherData[]> => {
  try {
    const response = await apiClient.get<ApiResponse<WeatherData[]>>(
      "/weather"
    );

    // Handle different response structures
    if (Array.isArray(response.data)) {
      return response.data;
    }

    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const getWeatherByCity = async (
  cityId: number
): Promise<WeatherData> => {
  try {
    const response = await apiClient.get<ApiResponse<WeatherData>>(
      `/weather/${cityId}`
    );

    // Handle different response structures
    const data = response.data.data || response.data;

    if (!data) {
      throw new Error("No weather data returned");
    }

    return data as WeatherData;
  } catch (error) {
    console.error(`Error fetching weather for city ${cityId}:`, error);
    throw error;
  }
};

export default apiClient;
