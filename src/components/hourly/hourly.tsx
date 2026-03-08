import type { ReactNode } from 'react';
import { Card } from '../card';
import { getIconUrl, round, type ForecastResponse } from '../../service';

type Props = {
  children?: ReactNode;
  title: string;
  data: ForecastResponse;
};

export default function Hourly({ title, data }: Props) {
  return !data ? (
    <></>
  ) : (
    <Card title={title} childrenClassName="flex flex-col gap-4">
      {(data.list || []).map((hourlyForecast, index) => {
        const date = new Date(hourlyForecast?.dt_txt);

        return (
          <div
            key={index + '-' + hourlyForecast.dt_txt}
            className="flex justify-between"
          >
            <img
              className="size-8"
              src={getIconUrl(hourlyForecast?.weather?.[0]?.icon)}
              alt="Forecast icon"
            />
            <p>
              {date.toLocaleDateString('en-US', {
                weekday: 'short',
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
