export const API_KEY = import.meta.env.VITE_API_KEY;

export const baseUrl = 'https://api.openweathermap.org/data/2.5';
export const units = '&units=imperial';
export const key = `&appid=${API_KEY}`;

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
