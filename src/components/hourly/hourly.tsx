import { Card } from '../card';
import { round } from '../../service';
import { WeatherIcon, type HourlyProps } from '../index';

export default function Hourly({ title, data }: HourlyProps) {
  return !data ? (
    <></>
  ) : (
    <Card title={title} childrenClassName="flex gap-6 overflow-x-scroll">
      {(data.list || []).map((hourlyForecast, index) => {
        const date = new Date(hourlyForecast?.dt_txt);

        return (
          <div
            key={index + '-' + hourlyForecast.dt_txt}
            className="flex flex-col gap-2 shrink-0 mb-5 items-center"
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
            <p>{round(hourlyForecast.main.temp)}° F</p>
          </div>
        );
      })}
    </Card>
  );
}
