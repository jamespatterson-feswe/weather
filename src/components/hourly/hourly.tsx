import type { ReactNode } from 'react';
import { Card } from '../card';
import { round, type ForecastResponse } from '../../service';
import { WeatherIcon } from '../index';

type Props = {
  children?: ReactNode;
  title: string;
  data: ForecastResponse;
};

export default function Hourly({ title, data }: Props) {
  return !data ? (
    <></>
  ) : (
    <Card title={title} childrenClassName="flex gap-6">
      {(data.list || []).map((hourlyForecast, index) => {
        const date = new Date(hourlyForecast?.dt_txt);

        return (
          <div
            key={index + '-' + hourlyForecast.dt_txt}
            className="flex flex-col gap-2 shrink-0 items-center"
          >
            <WeatherIcon src={hourlyForecast?.weather?.[0]?.icon} />
            <p>
              {date.toLocaleDateString('en-US', {
                weekday: 'long',
              })}
            </p>
            <p>
              {date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <p>
              {date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </p>
            <p>{round(hourlyForecast.main.temp)}°</p>
            <p className="text-gray-500/75">
              {round(hourlyForecast.main.temp_min)}°
            </p>
            <p className="text-gray-500/75">
              {round(hourlyForecast.main.temp_max)}°
            </p>
          </div>
        );
      })}
    </Card>
  );
}
