import { GET_FORECAST_CONSTANTS } from '../constants';
import type { GetWeatherParameters } from '../weather/weather.interface';
import type { ForecastResponse } from './forecast.interface';

export async function getForecast(
  params: GetWeatherParameters,
): Promise<ForecastResponse> {
  const { lat, long, url, key } = { ...params, ...GET_FORECAST_CONSTANTS };

  const response = await fetch(`${url}?lat=${lat}&lon=${long}${key}`);

  if (!response.ok) throw new Error('Hourly weather data failed to fetch.');

  return response.json();
}
