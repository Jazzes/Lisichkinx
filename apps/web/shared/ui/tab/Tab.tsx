import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/shared/lib/cn';

type TabVariant = 'default';

export const tabVariants = cva('', {
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: {
      default: [
        'rounded-control border px-4 py-3 text-left text-s font-black uppercase tracking-[0.14em]',
        'bg-background text-muted shadow-s transition hover:-translate-y-0.5 hover:border-accent hover:text-foreground',
        'border-foreground/25 data-active:border-foreground data-active:bg-foreground data-active:text-background data-active:shadow-s-accent',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent',
        'disabled:pointer-events-none disabled:opacity-45',
      ],
    },
  },
});

interface TabBaseProps {
  active?: boolean;
  children: ReactNode;
  className?: string;
  variant?: TabVariant;
}

export interface TabProps
  extends TabBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof TabBaseProps> {}

export const Tab: FC<TabProps> = ({
  active,
  children,
  className,
  type = 'button',
  variant = 'default',
  ...props
}) => (
  <button
    aria-pressed={active}
    className={cn(tabVariants({ variant }), className)}
    data-active={active === true ? '' : undefined}
    type={type}
    {...props}
  >
    {children}
  </button>
);
