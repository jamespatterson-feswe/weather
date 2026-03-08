import { GET_FORECAST_CONSTANTS, iconUrl, replacement } from '../constants';
import type { GetWeatherParameters } from '../weather/weather.interface';
import type { ForecastResponse } from './forecast.interface';

export async function getForecast(
  params: GetWeatherParameters,
): Promise<ForecastResponse> {
  const { lat, long, url, key, units } = {
    ...params,
    ...GET_FORECAST_CONSTANTS,
  };

  const response = await fetch(`${url}?lat=${lat}&lon=${long}${units}${key}`);

  if (!response.ok) throw new Error('Hourly weather data failed to fetch.');

  return response.json();
}

/**
 * @description To take the string icon value and return the url
 *
 * @function getIconUrl
 * @param { string } icon A string value of the icon from an API response
 * @returns { string }
 */
export function getIconUrl(icon: string): string {
  return !icon ? '' : iconUrl.replace(replacement, icon);
}
