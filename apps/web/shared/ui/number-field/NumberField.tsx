'use client';

import type { FC, ReactNode } from 'react';

import { Field } from '@base-ui/react/field';
import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { MinusIcon, PlusIcon } from 'lucide-react';

import { cn } from '@/shared/lib/cn';

export interface NumberFieldProps {
  className?: string;
  disabled?: boolean;
  error?: ReactNode;
  hint?: ReactNode;
  label: string;
  max?: number;
  min?: number;
  name?: string;
  onValueChange: (value: number | null) => void;
  placeholder?: string;
  step?: number;
  unit?: ReactNode;
  value: number | null;
}

export const NumberField: FC<NumberFieldProps> = ({
  className,
  disabled,
  error,
  hint,
  label,
  max,
  min,
  name,
  onValueChange,
  placeholder,
  step,
  unit,
  value,
}) => (
  <Field.Root className={cn('grid gap-2', className)} invalid={Boolean(error)} name={name}>
    <Field.Label className="text-s font-black uppercase tracking-[0.16em] text-foreground">
      {label}
    </Field.Label>
    <BaseNumberField.Root
      disabled={disabled}
      max={max}
      min={min}
      onValueChange={onValueChange}
      step={step}
      value={value}
    >
      <BaseNumberField.Group className="flex min-h-14 items-stretch overflow-hidden rounded-control border border-foreground/25 bg-background shadow-s transition focus-within:border-accent focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-accent">
        <BaseNumberField.Input
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-l font-semibold text-foreground outline-none placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={placeholder}
        />
        {unit ? (
          <span className="flex shrink-0 items-center border-l border-foreground/10 px-3 text-s font-black uppercase tracking-[0.14em] text-muted">
            {unit}
          </span>
        ) : null}
        <div className="flex shrink-0 border-l border-foreground/10">
          <BaseNumberField.Decrement className="flex w-10 items-center justify-center text-muted transition hover:bg-accent hover:text-accent-foreground focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-35">
            <MinusIcon aria-hidden="true" size={14} strokeWidth={3} />
          </BaseNumberField.Decrement>
          <BaseNumberField.Increment className="flex w-10 items-center justify-center border-l border-foreground/10 text-muted transition hover:bg-accent hover:text-accent-foreground focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-35">
            <PlusIcon aria-hidden="true" size={14} strokeWidth={3} />
          </BaseNumberField.Increment>
        </div>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
    {hint ? <Field.Description className="text-s text-muted">{hint}</Field.Description> : null}
    <Field.Error className="text-s font-semibold text-destructive" match={Boolean(error)}>
      {error}
    </Field.Error>
  </Field.Root>
);
