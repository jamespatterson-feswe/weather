// import reactLogo from './assets/react.svg'

import { useQuery } from '@tanstack/react-query';
import { getWeather } from './service/index';
import { Card, Forecast } from './components/index';

function App() {
  const weatherResponse = useQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({ lat: 50, long: 50 }),
    staleTime: 1000 * 60 * 15,
  });

  return (
    <div className="flex flex-col gap-8">
      <Card title="Weather description">
        {JSON.stringify(weatherResponse?.data?.weather)}
      </Card>
      <Card title="Wind Details">
        {JSON.stringify(weatherResponse?.data?.wind)}
      </Card>
      <Forecast title="Forecast Details"></Forecast>
    </div>
  );
}

export default App;
