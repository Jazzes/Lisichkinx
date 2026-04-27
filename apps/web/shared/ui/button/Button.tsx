import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentProps,
  FC,
  ReactNode,
} from 'react';

import Link from 'next/link';

import { cn } from '@/shared/lib/cn';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonBaseProps {
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

const buttonClassName = (variant: ButtonVariant, className?: string): string => {
  return cn(
    'inline-flex items-center justify-center rounded-control px-5 py-3 text-m font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4',
    variant === 'primary' &&
      'bg-accent text-accent-foreground hover:bg-accent-hover focus-visible:outline-accent',
    variant === 'secondary' &&
      'border border-border-subtle bg-surface text-foreground hover:bg-surface-muted focus-visible:outline-border-subtle',
    className,
  );
};

export const Button: FC<ButtonProps> = ({
  children,
  className,
  type = 'button',
  variant = 'primary',
  ...props
}) => {
  return (
    <button className={buttonClassName(variant, className)} type={type} {...props}>
      {children}
    </button>
  );
};

export const LinkButton: FC<LinkButtonProps> = ({
  children,
  className,
  href,
  variant = 'primary',
  ...props
}) => {
  return (
    <Link className={buttonClassName(variant, className)} href={href} {...props}>
      {children}
    </Link>
  );
};
