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
      const wrappedGetter = async () => {
        try {
          // CRITICAL: Pass audience option!
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUTH0_AUDIENCE,
              scope: "openid profile email",
            },
          });

          console.log("✅ Token retrieved");
          console.log("Token parts:", token?.split(".").length);

          return token;
        } catch (error) {
          console.error("❌ Error getting token:", error);
          throw error;
        }
      };

      setAccessTokenGetter(wrappedGetter);
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  return useQuery<WeatherData[], Error>({
    queryKey: ["weather", "all"],
    queryFn: getWeatherData,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

export const useWeatherByCity = (
  cityId: number | null
): UseQueryResult<WeatherData, Error> => {
  const { getAccessTokenSilently, isAuthenticated, logout } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      setAccessTokenGetter(getAccessTokenSilently);
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  const query = useQuery<WeatherData, Error>({
    queryKey: ["weather", "city", cityId],
    queryFn: () => getWeatherByCity(cityId!),
    enabled: isAuthenticated && cityId !== null,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  // Handle 401 errors
  useEffect(() => {
    if (query.error?.message.includes("Unauthorized")) {
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    }
  }, [query.error, logout]);

  return query;
};
