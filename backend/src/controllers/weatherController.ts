import { Request, Response, NextFunction } from 'express';
import weatherService from '../services/weatherService.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { City, ApiResponse, WeatherData } from '../types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllWeather = async (
  req: Request, 
  res: Response<ApiResponse<WeatherData[]>>, 
  next: NextFunction
): Promise<void> => {
  try {
    const citiesPath = path.join(__dirname, '../data/cities.json');
    const citiesData = await fs.readFile(citiesPath, 'utf-8');
    const cities: City[] = JSON.parse(citiesData);
    const cityIds = cities.map(city => city.id);
    const weatherData = await weatherService.getMultipleCities(cityIds);
    
    res.json({
      success: true,
      count: weatherData.length,
      data: weatherData
    });
  } catch (error) {
    next(error);
  }
};

export const getWeatherByCity = async (
  req: Request<{ cityId: string }>, 
  res: Response<ApiResponse<WeatherData>>, 
  next: NextFunction
): Promise<void> => {
  try {
    const { cityId } = req.params;
    
    if (!cityId) {
      res.status(400).json({
        success: false,
        error: 'City ID is required'
      });
      return;
    }
    
    const weatherData = await weatherService.getWeatherByCity(parseInt(cityId));
    
    res.json({
      success: true,
      data: weatherData
    });
  } catch (error) {
    next(error);
  }
};
