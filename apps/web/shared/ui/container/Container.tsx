import { type ComponentPropsWithoutRef, type ReactNode, createElement } from 'react';

import { cn } from '@/shared/lib/cn';

type ContainerElement = 'article' | 'div' | 'main' | 'section';

export interface ContainerProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'className' | 'children'
> {
  as?: ContainerElement;
  children: ReactNode;
  className?: string;
}

export const Container = ({ as = 'div', children, className, ...props }: ContainerProps) => {
  return createElement(
    as,
    { className: cn('mx-auto w-full max-w-page px-6', className), ...props },
    children,
  );
};
