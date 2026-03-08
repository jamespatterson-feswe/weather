import { GET_FORECAST_CONSTANTS, iconUrl, replacement } from '../constants';
import type { GetWeatherParameters } from '../weather/weather.interface';
import type { DayOptions, ForecastResponse } from './forecast.interface';

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

export const round = (date: number): number => Math.round(date);

/**
 * @description To analyze the data, parse into daily chunks, and return daily weather data
 *
 * @function getDailyForecast
 * @param { ForecastResponse} data Api response from 5 day hourly forecast
 * @returns { Map<string, DayOptions> }
 */
export const getDailyForecast = (
  data: ForecastResponse,
): Map<string, DayOptions> => {
  const dayMap: Map<string, DayOptions> = new Map<string, DayOptions>();
  const response: Map<string, DayOptions> = new Map<string, DayOptions>();

  (data?.list || []).forEach((date) => {
    const dateString = date.dt_txt.split(' ')[0];
    const icon = date?.weather?.[0]?.icon || '';

    if (dayMap.has(dateString)) {
      const _day = dayMap.get(dateString);

      dayMap.set(dateString, {
        temp: [_day?.temp || [], date?.main?.temp || 0].flat(),
        min: !_day?.min
          ? date?.main?.temp_min
          : _day?.min < date?.main?.temp_min
            ? _day?.min
            : date?.main?.temp_min,
        max: !_day?.max
          ? date?.main?.temp_max
          : _day?.max > date?.main?.temp_max
            ? _day?.max
            : date?.main?.temp_max,
        icons: [_day?.icons || [], icon].flat(),
      });
    } else {
      dayMap.set(dateString, {
        temp: [date?.main?.temp || 0],
        min: date?.main?.temp_min,
        max: date?.main?.temp_max,
        icons: [icon],
      });
    }
  });

  dayMap.forEach((value, key) => {
    const temperatures = {
      temp: (value.temp as number[])
        .map(Number)
        .filter(Boolean)
        .filter((value) => value !== 0),
      min: value.min,
      max: value.max,
    };

    const frequencyMap = new Map<string, number>();

    (value.icons || []).forEach((icon) => {
      frequencyMap.set(icon, (frequencyMap.get(icon) || 0) + 1);
    });

    response.set(key, {
      temp: round(
        temperatures.temp.reduce((acc, temp) => acc + temp, 0) /
          temperatures.temp.length,
      ),
      min: round(value.min as number),
      max: round(value.max as number),
      icon: Array.from(frequencyMap).reduce(
        (acc, [key, count]) => (count > acc.count ? { key, count } : acc),
        { key: '', count: 0 },
      ).key,
    });
  });

  return response;
};
