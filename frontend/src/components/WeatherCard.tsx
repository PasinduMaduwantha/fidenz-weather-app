import React from "react";
import { X, Wind } from "lucide-react";
import type { WeatherData } from "../types/weather";

interface WeatherCardProps {
  city: WeatherData;
  onClick: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, onClick }) => {
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
    <div
      onClick={onClick}
      className="cursor-pointer transform hover:scale-105 transition-all duration-200"
    >
      <div className="bg-white/5 backdrop-blur-xl rounded-md overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl">
        <div
          className={`bg-gradient-to-br ${colors.bg} rounded-t-sm p-4 ${colors.text} relative`}
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-2xl font-bold text-white mb-1">
            {city.name}, {city.country}
          </h3>
          <p className="text-white/70 text-sm mb-2">
            {new Date().toLocaleString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
              month: "short",
              day: "numeric",
            })}
          </p>

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">
                {getWeatherIcon(city.weather.description)}
              </div>
              <p className="text-lg text-white font-medium capitalize">
                {city.weather.description}
              </p>
            </div>

            <div className="text-right">
              <div className="text-5xl font-bold text-white">
                {city.temperature.current}°<span className="text-2xl">C</span>
              </div>
              <p className="text-white/80 text-sm mt-1">
                Min: {city.temperature.min}°c
              </p>
              <p className="text-white/80 text-sm">
                Max: {city.temperature.max}°c
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 p-4">
          <div className="grid grid-cols-3 gap-4 text-sm justify-items-center">
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

            <div className="flex space-y-1 align-middle">
              <div className="ml-2 h-16 w-px bg-white/30"></div>
              <div className="m-auto grid-cols-1 items-center gap-2 text-white/70 mx-2">
                <Wind className="mx-6 -4 h-4" />
                <span>
                  {city.details.windSpeed}m/s {city.details.windDegree}°
                </span>
              </div>
              <div className="h-16 w-px bg-white/30"></div>
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
  );
};

export default WeatherCard;
