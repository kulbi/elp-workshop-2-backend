import { Controller, Get, HttpException, Param, Query } from '@nestjs/common';
import axios from 'axios';
import { mainModule } from 'process';

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
  ): Promise<{
    temperature: number;
    pressure: number;
    humidity: number;
  }> {
    if (!lat) {
      throw new HttpException('lat is required', 400);
    }
    if (!lon) {
      throw new HttpException('lon is required', 400);
    }

    const response = await axios.request<{
      main: { temp: number; pressure: number; humidity: number };
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
    };

    return returnedObject;
  }
}
