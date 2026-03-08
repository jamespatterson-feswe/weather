import { getIconUrl } from '../../service';

type Props = {
  src: string;
};

export default function WeatherIcon({ src }: Props) {
  return <img className="size-8" src={getIconUrl(src)} alt="Forecast icon" />;
}
