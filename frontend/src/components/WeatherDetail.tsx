import React from "react";
import { Cloud, Wind, LogOut, MousePointer2 } from "lucide-react";
import type { WeatherData } from "../types/weather";

interface WeatherDetailProps {
  city: WeatherData;
  onBack: () => void;
  onLogout: () => void;
}

const WeatherDetail: React.FC<WeatherDetailProps> = ({
  city,
  onBack,
  onLogout,
}) => {
  const getWeatherIcon = (description: string): string => {
    const icons: Record<string, string> = {
      "clear sky": "☀️",
      "few clouds": "⛅",
      "scattered clouds": "☁️",
      "broken clouds": "☁️",
      "shower rain": "🌧️",
      rain: "🌧️",
      "light rain": "🌧️",
      thunderstorm: "⛈️",
      snow: "❄️",
      mist: "🌫️",
    };
    return icons[description.toLowerCase()] || "☁️";
  };

  const weatherColors: Record<string, { bg: string; text: string }> = {
    Clouds: { bg: "from-blue-400 to-blue-500", text: "text-white" },
    Clear: { bg: "from-yellow-300 to-yellow-400", text: "text-white" },
    Rain: { bg: "from-slate-400 to-slate-500", text: "text-white" },
    Mist: { bg: "from-slate-300 to-slate-400", text: "text-white" },
    Drizzle: { bg: "from-slate-400 to-slate-500", text: "text-white" },
    Thunderstorm: { bg: "from-purple-500 to-purple-600", text: "text-white" },
    Snow: { bg: "from-slate-200 to-slate-300", text: "text-gray-700" },
  };

  const colors = weatherColors[city.weather.main] || {
    bg: "from-purple-400 to-purple-500",
    text: "text-white",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-2 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Cloud className="w-8 h-8 text-white mr-3" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Weather App
            </h1>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-white px-4 py-2 rounded-lg transition-all mr-4"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-md overflow-hidden border border-white/10 shadow-2xl">
          <div className={`bg-gradient-to-br ${colors.bg} p-4 md:p-4 relative`}>
            <button
              onClick={onBack}
              className="absolute top-6 left-6 text-white/80 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {city.name}, {city.country}
              </h2>
              <p className="text-white/80 text-lg">
                {new Date().toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                  month: "short",
                  day: "numeric",
                })}
              </p>

              <div className="flex items-center justify-center gap-8 md:gap-16 mt-4">
                <div className="text-center">
                  <div className="text-6xl mb-2">
                    {getWeatherIcon(city.weather.description)}
                  </div>
                  <p className="text-xl text-white font-medium capitalize">
                    {city.weather.description}
                  </p>
                </div>

                <div className="h-32 w-px bg-white/30"></div>

                <div className="text-center">
                  <div className="text-7xl md:text-8xl font-bold text-white mb-2">
                    {city.temperature.current}°
                    <span className="text-5xl">C</span>
                  </div>
                  <p className="text-white/90">
                    Temp Min: {city.temperature.min}°c
                  </p>
                  <p className="text-white/90">
                    Temp Max: {city.temperature.max}°c
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 md:p-12 justify-items-center">
            <div className="flex md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-white/70">
                  <span className="font-semibold">Pressure:</span>{" "}
                  {city.details.pressure}hPa
                </p>
                <p className="text-white/70">
                  <span className="font-semibold">Humidity:</span>{" "}
                  {city.details.humidity}%
                </p>
                <p className="text-white/70">
                  <span className="font-semibold">Visibility:</span>{" "}
                  {city.details.visibility}km
                </p>
              </div>

              <div className="flex items-center justify-center mx-4">
                <div className="ml-2 h-16 w-px bg-white/30"></div>
                <div className="mx-6 justify-items-center">
                  <Wind className="w-12 h-12 text-white/70 mb-2" />
                  <p className="text-2xl font-bold text-white">
                    {city.details.windSpeed}m/s {city.details.windDegree}°
                  </p>
                </div>
                <div className="ml-2 h-16 w-px bg-white/30"></div>
              </div>

              <div className="space-y-1">
                <p className="text-white/70">
                  <span className="font-semibold">Sunrise:</span>{" "}
                  {city.details.sunrise}
                </p>
                <p className="text-white/70">
                  <span className="font-semibold">Sunset:</span>{" "}
                  {city.details.sunset}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center text-white/50 mt-12">
        2021 Fidenz Technologies
      </footer>
    </div>
  );
};

export default WeatherDetail;
