import type { ReactNode } from 'react';

export type CardProps = {
  children: ReactNode;
  title: string;
  childrenClassName?: string;
};
