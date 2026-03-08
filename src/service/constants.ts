export const API_KEY = import.meta.env.VITE_API_KEY;

export const key = `&appid=${API_KEY}`;
export const replacement = '$icon$';
export const units = '&units=imperial';

export const baseUrl = 'https://api.openweathermap.org/data/2.5';
export const iconUrl = `https://openweathermap.org/img/wn/${replacement}.png`;

export const latLong = {
  lat: 34.760294,
  long: -84.767539,
};

const BASE_CONSTANTS = {
  units,
  key,
};

export const GET_WEATHER_CONSTANTS = {
  url: `${baseUrl}/weather`,
  ...BASE_CONSTANTS,
};

export const GET_FORECAST_CONSTANTS = {
  url: `${baseUrl}/forecast`,
  ...BASE_CONSTANTS,
};
