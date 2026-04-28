import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentProps,
  FC,
  ReactNode,
} from 'react';

import { cva } from 'class-variance-authority';

import Link from 'next/link';

import { cn } from '@/shared/lib/cn';

type ButtonVariant = 'inline' | 'primary' | 'secondary';

export const buttonVariants = cva('', {
  defaultVariants: {
    variant: 'primary',
  },
  variants: {
    variant: {
      primary: [
        'inline-flex items-center justify-center rounded-control border px-5 py-3 text-m font-black uppercase tracking-[0.12em]',
        'transition duration-200 ease-out active:translate-1',
        'bg-foreground text-background shadow-m-accent',
        'hover:-translate-y-1 hover:translate-x-1 hover:bg-accent-hover hover:shadow-m-accent-hover',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent',
        'disabled:pointer-events-none disabled:translate-0 disabled:opacity-45',
      ],
      secondary: [
        'inline-flex items-center justify-center rounded-control border px-5 py-3 text-m font-black uppercase tracking-[0.12em]',
        'transition duration-200 ease-out active:translate-1',
        'border-foreground/35 bg-surface text-foreground shadow-m',
        'hover:-translate-y-1 hover:translate-x-1 hover:border-accent hover:bg-accent hover:text-accent-foreground hover:shadow-m-hover',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground',
        'disabled:pointer-events-none disabled:translate-0 disabled:opacity-45',
      ],
      inline: [
        'inline-flex items-center border border-transparent bg-transparent px-3 py-2 text-s font-black uppercase tracking-[0.16em]',
        'text-muted transition-colors hover:text-foreground',
        'underline-offset-4 decoration-solid underline decoration-transparent',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent',
        'data-active:text-foreground data-active:underline data-active:decoration-foreground',
      ],
    },
  },
});

interface ButtonBaseProps {
  active?: boolean;
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

export interface ButtonProps
  extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {}

export interface LinkButtonProps
  extends
    ButtonBaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps | 'href'> {
  href: ComponentProps<typeof Link>['href'];
}

export const Button: FC<ButtonProps> = ({
  active,
  children,
  className,
  type = 'button',
  variant = 'primary',
  ...props
}) => (
  <button
    className={cn(buttonVariants({ variant }), className)}
    type={type}
    {...props}
    data-active={variant === 'inline' && active === true ? '' : undefined}
  >
    {children}
  </button>
);

export const LinkButton: FC<LinkButtonProps> = ({
  active,
  children,
  className,
  href,
  variant = 'primary',
  ...props
}) => (
  <Link
    className={cn(buttonVariants({ variant }), className)}
    href={href}
    {...props}
    aria-current={active === true ? 'page' : undefined}
    data-active={variant === 'inline' && active === true ? '' : undefined}
  >
    {children}
  </Link>
);
