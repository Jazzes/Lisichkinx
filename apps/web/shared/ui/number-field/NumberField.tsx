'use client';

import { type FC, type ReactNode, useEffect, useMemo, useState } from 'react';

import { Field } from '@base-ui/react/field';
import { MinusIcon, PlusIcon } from 'lucide-react';

import { cn } from '@/shared/lib/cn';

const DEFAULT_FORMAT_LOCALE = 'en';
const EMPTY_NUMBER_TEXT = /^[\s\u00a0\u202f]*$/;
const COMMON_GROUP_SEPARATORS = ["'", ' ', '\u00a0', '\u202f'];
const NUMBER_TEXT_CHARS = /[^\d,.-]/g;

export interface NumberFieldProps {
  className?: string;
  disabled?: boolean;
  error?: ReactNode;
  formatLocale?: Intl.LocalesArgument;
  hint?: ReactNode;
  label: string;
  /** Дополнительный блок справа от подписи (например переключатель единиц). */
  labelExtra?: ReactNode;
  max?: number;
  maximumFractionDigits?: number;
  min?: number;
  name?: string;
  onValueChange: (value: number | null) => void;
  placeholder?: string;
  /** Вычисляемое значение: без +/- , неактивный ввод, отличимый от обычного disabled. */
  readOnly?: boolean;
  step?: number;
  unit?: ReactNode;
  useGrouping?: boolean;
  value: number | null;
}

export const NumberField: FC<NumberFieldProps> = ({
  className,
  disabled,
  error,
  formatLocale = DEFAULT_FORMAT_LOCALE,
  hint,
  label,
  labelExtra,
  max,
  maximumFractionDigits,
  min,
  name,
  onValueChange,
  placeholder,
  readOnly,
  step,
  unit,
  useGrouping = true,
  value,
}) => {
  const isLocked = Boolean(disabled || readOnly);
  const resolvedMaximumFractionDigits = useMemo(
    () => maximumFractionDigits ?? getStepFractionDigits(step),
    [maximumFractionDigits, step],
  );
  const shouldFormatWhileTyping = resolvedMaximumFractionDigits === 0;
  const separators = useMemo(() => getNumberSeparators(formatLocale), [formatLocale]);
  const [inputValue, setInputValue] = useState(() =>
    formatNumberValue(value, formatLocale, resolvedMaximumFractionDigits, useGrouping),
  );

  useEffect(() => {
    setInputValue(
      formatNumberValue(value, formatLocale, resolvedMaximumFractionDigits, useGrouping),
    );
  }, [formatLocale, resolvedMaximumFractionDigits, useGrouping, value]);

  const commitValue = (nextValue: number | null) => {
    setInputValue(
      formatNumberValue(nextValue, formatLocale, resolvedMaximumFractionDigits, useGrouping),
    );
    onValueChange(nextValue);
  };

  const handleInputValueChange = (rawValue: string) => {
    const nextValue = parseNumberText(rawValue, separators, useGrouping);

    if (nextValue === null) {
      setInputValue('');
      onValueChange(null);
      return;
    }

    onValueChange(nextValue);

    setInputValue(
      shouldFormatWhileTyping && useGrouping
        ? formatNumberValue(nextValue, formatLocale, resolvedMaximumFractionDigits, useGrouping)
        : rawValue,
    );
  };

  const handleBlur = () => {
    const nextValue = clampValue(parseNumberText(inputValue, separators, useGrouping), min, max);
    commitValue(nextValue);
  };

  const changeByStep = (direction: 1 | -1) => {
    const stepValue = step ?? 1;
    const baseValue = value ?? 0;
    const nextValue = roundToFractionDigits(
      baseValue + stepValue * direction,
      resolvedMaximumFractionDigits,
    );

    commitValue(clampValue(nextValue, min, max));
  };

  const isDecrementDisabled = isLocked || (min !== undefined && value !== null && value <= min);
  const isIncrementDisabled = isLocked || (max !== undefined && value !== null && value >= max);

  return (
    <Field.Root className={cn('grid gap-2', className)} invalid={Boolean(error)} name={name}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <Field.Label className="text-s font-black uppercase tracking-[0.16em] text-foreground">
          {label}
        </Field.Label>
        {labelExtra ? (
          <div className="flex shrink-0 flex-wrap items-center gap-2">{labelExtra}</div>
        ) : null}
      </div>
      <div
        className={cn(
          'flex min-h-14 items-stretch overflow-hidden rounded-control border shadow-s transition',
          readOnly
            ? 'cursor-default border-dashed border-muted-foreground/35 bg-muted/25 focus-within:border-muted-foreground/45 focus-within:outline-none'
            : 'border-foreground/25 bg-background focus-within:border-accent focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-accent',
        )}
      >
        <Field.Control
          aria-readonly={readOnly ? true : undefined}
          className={cn(
            'min-w-0 flex-1 bg-transparent px-4 py-3 text-l font-semibold text-foreground outline-none placeholder:text-muted',
            readOnly
              ? 'cursor-default text-foreground/90 selection:bg-transparent disabled:opacity-100'
              : 'disabled:cursor-not-allowed disabled:opacity-50',
          )}
          disabled={isLocked}
          inputMode={resolvedMaximumFractionDigits > 0 ? 'decimal' : 'numeric'}
          onBlur={handleBlur}
          onValueChange={handleInputValueChange}
          placeholder={placeholder}
          type="text"
          value={inputValue}
        />
        {unit ? (
          <span
            className={cn(
              'flex shrink-0 items-center border-l px-3 text-s font-black uppercase tracking-[0.14em]',
              readOnly
                ? 'border-muted-foreground/20 text-muted-foreground/80'
                : 'border-foreground/10 text-muted',
            )}
          >
            {unit}
          </span>
        ) : null}
        {readOnly ? null : (
          <div className="flex shrink-0 border-l border-foreground/10">
            <button
              className="flex w-10 items-center justify-center text-muted transition hover:bg-accent hover:text-accent-foreground focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-35"
              disabled={isDecrementDisabled}
              onClick={() => changeByStep(-1)}
              type="button"
            >
              <MinusIcon aria-hidden="true" size={14} strokeWidth={3} />
            </button>
            <button
              className="flex w-10 items-center justify-center border-l border-foreground/10 text-muted transition hover:bg-accent hover:text-accent-foreground focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-35"
              disabled={isIncrementDisabled}
              onClick={() => changeByStep(1)}
              type="button"
            >
              <PlusIcon aria-hidden="true" size={14} strokeWidth={3} />
            </button>
          </div>
        )}
      </div>
      {hint ? <Field.Description className="text-s text-muted">{hint}</Field.Description> : null}
      <Field.Error className="text-s font-semibold text-destructive" match={Boolean(error)}>
        {error}
      </Field.Error>
    </Field.Root>
  );
};

const formatNumberValue = (
  value: number | null,
  locale: Intl.LocalesArgument,
  maximumFractionDigits: number,
  useGrouping: boolean,
) => {
  if (value === null) {
    return '';
  }

  return new Intl.NumberFormat(locale, {
    maximumFractionDigits,
    useGrouping,
  }).format(value);
};

interface NumberSeparators {
  decimal: string;
  group: string | null;
}

const getNumberSeparators = (locale: Intl.LocalesArgument): NumberSeparators => {
  const parts = new Intl.NumberFormat(locale).formatToParts(1000.1);

  return {
    decimal: parts.find((part) => part.type === 'decimal')?.value ?? '.',
    group: parts.find((part) => part.type === 'group')?.value ?? null,
  };
};

const parseNumberText = (text: string, separators: NumberSeparators, useGrouping: boolean) => {
  if (EMPTY_NUMBER_TEXT.test(text)) {
    return null;
  }

  const groupSeparators =
    useGrouping && separators.group
      ? [...COMMON_GROUP_SEPARATORS, separators.group]
      : COMMON_GROUP_SEPARATORS;
  const valueText = groupSeparators
    .reduce((currentText, separator) => currentText.split(separator).join(''), text)
    .replace(NUMBER_TEXT_CHARS, '');
  const decimalIndex = getDecimalIndex(valueText, separators.decimal, useGrouping);
  const sign = valueText.startsWith('-') ? '-' : '';
  const integerText = decimalIndex === -1 ? valueText : valueText.slice(0, decimalIndex);
  const fractionText = decimalIndex === -1 ? '' : valueText.slice(decimalIndex + 1);
  const normalizedText = [
    sign,
    integerText.replace(/\D/g, '') || '0',
    fractionText ? `.${fractionText.replace(/\D/g, '')}` : '',
  ].join('');
  const nextValue = Number(normalizedText);

  return Number.isFinite(nextValue) ? nextValue : null;
};

const getDecimalIndex = (text: string, localeDecimalSeparator: string, useGrouping: boolean) => {
  if (!useGrouping) {
    return Math.max(text.lastIndexOf(','), text.lastIndexOf('.'));
  }

  return text.lastIndexOf(localeDecimalSeparator);
};

const clampValue = (value: number | null, min?: number, max?: number) => {
  if (value === null) {
    return null;
  }

  const minBoundedValue = min === undefined ? value : Math.max(value, min);

  return max === undefined ? minBoundedValue : Math.min(minBoundedValue, max);
};

const getStepFractionDigits = (step?: number) => {
  if (step === undefined || Number.isInteger(step)) {
    return 0;
  }

  return step.toString().split('.')[1]?.length ?? 0;
};

const roundToFractionDigits = (value: number, fractionDigits: number) =>
  Number(value.toFixed(fractionDigits));
