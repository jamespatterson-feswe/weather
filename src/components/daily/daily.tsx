import type { ReactNode } from 'react';
import { Card } from '../card';
import { getDailyForecast, round, type ForecastResponse } from '../../service';
import { WeatherIcon } from '../index';

type Props = {
  children?: ReactNode;
  title: string;
  data: ForecastResponse;
};

export default function DailyForecast({ title, data }: Props) {
  const dailyForecast = getDailyForecast(data);

  return !data ? (
    <></>
  ) : (
    <Card title={title} childrenClassName="flex flex-col gap-4">
      {Array.from(dailyForecast).map(([key, value], index) => {
        const date = new Date(`${key}T00:00:00Z`);

        return (
          <div key={index + '-' + key} className="flex justify-between">
            <WeatherIcon src={value.icon || ''} />
            <p>
              {date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                timeZone: 'UTC',
              })}
            </p>
            <p>{round(value.temp as number)}° F</p>
            <p className="text-gray-500/75">{round(value.min as number)}° F</p>
            <p className="text-gray-500/75">{round(value.max as number)}° F</p>
          </div>
        );
      })}
    </Card>
  );
}
