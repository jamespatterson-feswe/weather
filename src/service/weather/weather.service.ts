import { GET_WEATHER_CONSTANTS } from '../constants';
import type {
  GetWeatherParameters,
  GetWeatherResponse,
} from './weather.interface';

/**
 * @description To get weather data from a third party api service
 *
 * @function getWeather
 * @param { GetWeatherParameters } params Object that holds the lat/long combination
 * @returns { GetWeatherResponse } A data response from the open weather api service
 */
export async function getWeather(
  params: GetWeatherParameters,
): Promise<GetWeatherResponse> {
  const { url, units, key } = GET_WEATHER_CONSTANTS;

  const response = await fetch(
    `${url}?lat=${params.lat}&lon=${params.long}${units}${key}`,
  );

  if (!response.ok) throw new Error('Failed to fetch weather data');

  return response.json();
}
