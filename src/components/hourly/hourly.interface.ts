import type { ReactNode } from 'react';
import type { ForecastResponse } from '../../service';

export type HourlyProps = {
  children?: ReactNode;
  title: string;
  data: ForecastResponse;
};
