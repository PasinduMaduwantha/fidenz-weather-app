import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import WeatherCard from "./components/WeatherCard";
import WeatherDetail from "./components/WeatherDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingSpinner from "./components/LoadingSpinner";
import { useWeatherData } from "./hooks/useWeather";
import { Cloud, LogOut } from "lucide-react";
import type { WeatherData } from "./types/weather";

function App() {
  const { isAuthenticated, isLoading, logout } = useAuth0();
  const [selectedCity, setSelectedCity] = useState<WeatherData | null>(null);

  const { data: cities, isLoading: weatherLoading, error } = useWeatherData();

  const handleLogout = () => {
    // Clear any user-specific data
    setSelectedCity(null);

    // Clear local/session storage (if you're using it)
    localStorage.clear();
    sessionStorage.clear();

    // Logout from Auth0 (clears Auth0 session + tokens)
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };
  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            {selectedCity ? (
              <WeatherDetail
                city={selectedCity}
                onBack={() => setSelectedCity(null)}
                onLogout={handleLogout}
              />
            ) : (
              <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 md:p-8 m-auto">
                <div className="max-w-4xl mx-auto p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center p-6">
                      <Cloud className="w-8 h-8 text-white" />
                      <h1 className="text-3xl md:text-3xl font-bold text-white">
                        Weather App
                      </h1>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-white px-4 py-2 rounded-lg transition-all mr-4"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="hidden md:inline">Logout</span>
                    </button>
                  </div>

                  {/* <div className="flex gap-4 mb-8">
                    <input
                      type="text"
                      placeholder="Enter a city"
                      className="flex-1 bg-gray-800/50 text-white px-6 py-3 rounded-lg border border-gray-700/50 focus:outline-none focus:border-purple-500 transition-colors"
                      disabled
                    />
                    <button
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold opacity-50 cursor-not-allowed"
                      disabled
                    >
                      Add City
                    </button>
                  </div> */}

                  {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-white px-6 py-4 rounded-lg mb-6">
                      <p className="font-semibold">
                        Error loading weather data
                      </p>
                      <p className="text-sm text-white/80">{error.message}</p>
                    </div>
                  )}

                  {weatherLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {cities?.map((city) => (
                        <WeatherCard
                          key={city.id}
                          city={city}
                          onClick={() => setSelectedCity(city)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <footer className="text-center text-white/50 mt-12">
                  2021 Fidenz Technologies
                </footer>
              </div>
            )}
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
