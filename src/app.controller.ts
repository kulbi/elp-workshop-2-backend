import { Controller, Get, HttpException, Query } from '@nestjs/common';
import axios from 'axios';

@Controller()
export class AppController {
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
      throw new HttpException('lat parameter is required', 400);
    }
    if (!lon) {
      throw new HttpException('lon parameter is required', 400);
    }
    if (!alternateSource) {
      throw new HttpException('alternateSource parameter is required', 400);
    }
    if (lat < -90 || lat > 90) {
      throw new HttpException('latitude out of range', 400);
    }
    if (lon < -180 || lon > 180) {
      throw new HttpException('longitude out of range', 400);
    }

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
        humidity: response.data.currently.humidity * 100,
        source: 'Dark Sky',
      };
      return returnedObject;
    }
  }
}
