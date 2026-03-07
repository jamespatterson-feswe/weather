export interface GetWeatherParameters {
  lat: number;
  long: number;
}

export interface GetWeatherResponse {
  coord: {
    lon: number | null | undefined;
    lat: number | null | undefined;
  };
  weather: Weather[];
  base: string | null | undefined;
  main: WeatherDescription;
  visibility: number | null | undefined;
  wind: Wind;
  clouds: {
    all: number | null | undefined;
  };
  dt: number | null | undefined;
  sys: {
    country: string | null | undefined;
    sunrise: number | null | undefined;
    sunset: number | null | undefined;
  };
  timezone: number | null | undefined;
  id: number | null | undefined;
  name: string | null | undefined;
  cod: number | null | undefined;
}

export interface WeatherDescription {
  temp: number | null | undefined;
  feels_like: number | null | undefined;
  temp_min: number | null | undefined;
  temp_max: number | null | undefined;
  pressure: number | null | undefined;
  humidity: number | null | undefined;
  sea_level: number | null | undefined;
  grnd_level: number | null | undefined;
}

export interface Wind {
  speed: number | null | undefined;
  deg: number | null | undefined;
  gust: number | null | undefined;
}

export interface Weather {
  id: number | null | undefined;
  main: string | null | undefined;
  description: string | null | undefined;
  icon: string | null | undefined;
}
