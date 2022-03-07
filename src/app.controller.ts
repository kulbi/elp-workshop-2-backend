import { Controller, Get, HttpException, Query } from '@nestjs/common';
import axios from 'axios';

@Controller()
export class AppController {
  @Get('/example')
  getHello() {
    return { example: true };
  }

  @Get('/current_weather')
  async getCurrentWeather(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
    @Query('alternateSource') alternateSource: string,
  ): Promise<{
    temperature: number;
    pressure: number;
    humidity: number;
    source: string;
  }> {
    if (!lat) {
      throw new HttpException('lat is required', 400);
    }
    if (!lon) {
      throw new HttpException('lon is required', 400);
    }

    // TODO: move to separate service file
    // TODO: use another service if alternateApi flag is provided
    // TODO: let both services uses same interface (Adapter pattern)
    // class OpenWeatherService implements WeatherService {
    // class AnotherOpenWeatherService implements WeatherService {
    // TODO: implememnt WeatherService interface
    if (alternateSource === 'false') {
      const response = await axios.request<{
        main: { temp: number; pressure: number; humidity: number };
        name: string;
      }>({
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        params: {
          lat: lat,
          lon: lon,
          units: 'metric',
        },
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': process.env.RAPID_API_KEY,
        },
      });
      const returnedObject = {
        temperature: response.data.main.temp,
        pressure: response.data.main.pressure,
        humidity: response.data.main.humidity,
        source: 'Open Weather Map',
      };
      return returnedObject;
    }
    if (alternateSource === 'true') {
      const response = await axios.request<{
        currently: { temperature: number; pressure: number; humidity: number };
        name: string;
      }>({
        method: 'GET',
        url: `https://dark-sky.p.rapidapi.com/${lat},${lon}`,
        params: {
          lang: 'en',
          units: 'si',
        },
        headers: {
          'x-rapidapi-host': 'dark-sky.p.rapidapi.com',
          'x-rapidapi-key': process.env.RAPID_API_KEY,
        },
      });

      const returnedObject = {
        temperature: response.data.currently.temperature,
        pressure: response.data.currently.pressure,
        humidity: response.data.currently.humidity,
        source: 'Dark Sky',
      };
      return returnedObject;
    }
  }
}
