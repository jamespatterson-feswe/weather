import { Card } from '../index';
import type { TemperatureProps } from './temperature.interface';

export default function Temperature({ children }: TemperatureProps) {
  return <Card title="Temperature Details">{children}</Card>;
}
