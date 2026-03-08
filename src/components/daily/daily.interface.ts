import type { ReactNode } from 'react';
import type { ForecastResponse } from '../../service';

export type DailyProps = {
  children?: ReactNode;
  title: string;
  data: ForecastResponse;
};
