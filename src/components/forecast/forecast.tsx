import type { ReactNode } from 'react';
import { Card } from '../card';
import { getForecast } from '../../service';
import { useQuery } from '@tanstack/react-query';

type Props = {
  children?: ReactNode;
  title: string;
};

export default function Forecast({ title }: Props) {
  const { data } = useQuery({
    queryKey: ['forecast'],
    queryFn: () => getForecast({ lat: 50, long: 50 }),
  });

  return !data ? <></> : <Card title={title}>{JSON.stringify(data)}</Card>;
}
