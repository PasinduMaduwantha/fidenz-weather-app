import axios from 'axios';
import cacheService from './cacheService.js';
import { WeatherData, OpenWeatherResponse } from '../types/index.js';

class WeatherService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY || '';
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  async getWeatherByCity(cityId: number): Promise<WeatherData> {
    const cacheKey = `weather_${cityId}`;
    
    if (cacheService.has(cacheKey)) {
      console.log(`✅ Cache hit for city ${cityId}`);
      const cachedData = cacheService.get<WeatherData>(cacheKey);
      if (cachedData) {
        return { ...cachedData, cached: true };
      }
    }

    console.log(`🌐 Fetching fresh data for city ${cityId}`);
    
    try {
      const response = await axios.get<OpenWeatherResponse>(`${this.baseUrl}/weather`, {
        params: {
          id: cityId,
          appid: this.apiKey,
          units: 'metric'
        }
      });

      const weatherData = this.formatWeatherData(response.data);
      cacheService.set(cacheKey, weatherData);
      return weatherData;
    } catch (error: any) {
      console.error(`Error fetching weather for city ${cityId}:`, error.message);
      throw new Error(`Failed to fetch weather data: ${error.response?.data?.message || error.message}`);
    }
  }

  async getMultipleCities(cityIds: number[]): Promise<WeatherData[]> {
    const promises = cityIds.map(id => this.getWeatherByCity(id));
    return Promise.all(promises);
  }

  private formatWeatherData(data: OpenWeatherResponse): WeatherData {
    return {
      id: data.id,
      name: data.name,
      country: data.sys.country,
      weather: {
        main: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon
      },
      temperature: {
        current: Math.round(data.main.temp),
        min: Math.round(data.main.temp_min),
        max: Math.round(data.main.temp_max),
        feelsLike: Math.round(data.main.feels_like)
      },
      details: {
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        visibility: (data.visibility / 1000).toFixed(1),
        windSpeed: data.wind.speed,
        windDegree: data.wind.deg,
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit', 
          hour12: true 
        }),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit', 
          hour12: true 
        })
      },
      timestamp: new Date().toISOString(),
      cached: false
    };
  }
}

export default new WeatherService();
