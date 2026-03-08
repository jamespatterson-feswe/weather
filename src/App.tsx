// import reactLogo from './assets/react.svg'

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getForecast, getWeather, latLong } from './service/index';
import { Card } from './components/index';
import DailyForecast from './components/daily/daily';
import Hourly from './components/hourly/hourly';

function App() {
  const weatherResponse = useQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({ lat: latLong.lat, long: latLong.long }),
    staleTime: 1000 * 60 * 15,
  });

  const forecastResponse = useSuspenseQuery({
    queryKey: ['forecast'],
    queryFn: () => getForecast({ lat: latLong.lat, long: latLong.long }),
  });

  return (
    <div className="flex flex-col gap-8">
      <Card title="Weather Now">
        {JSON.stringify(weatherResponse?.data?.weather)}
      </Card>
      {/* <Card title="Wind Details">
        {JSON.stringify(weatherResponse?.data?.wind)}
      </Card> */}
      <DailyForecast
        title="Daily Forecast"
        data={forecastResponse.data}
      ></DailyForecast>
      <Hourly title="Hourly Forecast" data={forecastResponse.data}></Hourly>
    </div>
  );
}

export default App;
