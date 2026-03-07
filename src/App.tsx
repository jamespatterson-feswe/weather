// import reactLogo from './assets/react.svg'

import { useQuery } from "@tanstack/react-query"
import { getWeather } from "./service/weather.service"

function App() {
  const { data } = useQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({lat: 50, long: 50})
  });

  return (
    <div>{ JSON.stringify(data) }</div>
  )
}

export default App
