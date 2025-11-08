import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import {
  getWeatherData,
  getWeatherByCity,
  setAccessTokenGetter,
} from "../services/api";
import type { WeatherData } from "../types/weather";

export const useWeatherData = (): UseQueryResult<WeatherData[], Error> => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      setAccessTokenGetter(getAccessTokenSilently);
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  return useQuery<WeatherData[], Error>({
    queryKey: ["weather", "all"],
    queryFn: getWeatherData,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
};

export const useWeatherByCity = (
  cityId: number | null
): UseQueryResult<WeatherData, Error> => {
  const { isAuthenticated } = useAuth0();

  return useQuery<WeatherData, Error>({
    queryKey: ["weather", cityId],
    queryFn: () => getWeatherByCity(cityId!),
    enabled: isAuthenticated && cityId !== null,
    staleTime: 5 * 60 * 1000,
  });
};
