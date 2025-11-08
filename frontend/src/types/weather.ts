export interface WeatherData {
  id: number;
  name: string;
  country: string;
  weather: {
    main: string;
    description: string;
    icon: string;
  };
  temperature: {
    current: number;
    min: number;
    max: number;
    feelsLike: number;
  };
  details: {
    pressure: number;
    humidity: number;
    visibility: string;
    windSpeed: number;
    windDegree: number;
    sunrise: string;
    sunset: string;
  };
  timestamp: string;
  cached: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  error?: string;
  message?: string;
}
