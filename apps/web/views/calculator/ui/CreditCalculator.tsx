'use client';

import { type FC, useMemo, useState } from 'react';

import { useTranslations } from 'next-intl';

import type { Locale } from '@/shared/config/i18n';
import { Button, NumberField, Tab } from '@/shared/ui';

import {
  CALCULATION_MODES,
  DEFAULT_VALUES,
  INPUT_FIELDS,
  RESULT_FIELDS,
  calculateCalculatorResult,
  createCalculatorSummary,
  getFieldStep,
} from '../lib/calculatorModel';

import type {
  CalculationMode,
  CalculatorValues,
  FieldKey,
  SummaryKind,
} from '../lib/calculatorModel';

export interface CreditCalculatorProps {
  locale: Locale;
}

export const CreditCalculator: FC<CreditCalculatorProps> = ({ locale }) => {
  const t = useTranslations('calculator.page.calculator');
  const [mode, setMode] = useState<CalculationMode>('payment');
  const [values, setValues] = useState<CalculatorValues>(DEFAULT_VALUES);

  const calculation = useMemo(() => calculateCalculatorResult(mode, values), [mode, values]);
  const resultField = RESULT_FIELDS[mode];
  const visibleFields = INPUT_FIELDS.filter((field) => field !== resultField);
  const resultValue = calculation.status === 'ok' ? calculation.value : null;
  const resultLabel = t(`modes.${mode}`);
  const summary = resultValue === null ? null : createCalculatorSummary(mode, values, resultValue);

  const handleFieldChange = (field: FieldKey) => (value: number | null) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setValues(DEFAULT_VALUES);
  };

  return (
    <section
      aria-labelledby="calculator-title"
      className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]"
    >
      <div className="rounded-card border border-foreground bg-surface p-5 shadow-l sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-accent text-accent-m text-foreground" id="calculator-title">
            {t('modeTitle')}
          </h2>
          <Button onClick={handleReset} variant="secondary">
            {t('reset')}
          </Button>
        </div>

        <div
          aria-label={t('modeTitle')}
          className="mt-6 grid gap-3 grid-cols-2 md:grid-cols-4"
          role="group"
        >
          {CALCULATION_MODES.map((item) => (
            <Tab active={mode === item} key={item} onClick={() => setMode(item)}>
              {t(`modes.${item}`)}
            </Tab>
          ))}
        </div>

        <div className="mt-7 grid gap-5">
          {visibleFields.map((field) => {
            return (
              <NumberField
                hint={t(`fields.${field}.hint`)}
                key={field}
                label={t(`fields.${field}.label`)}
                min={0}
                onValueChange={handleFieldChange(field)}
                placeholder={t(`fields.${field}.placeholder`)}
                step={getFieldStep(field)}
                unit={t(`fields.${field}.unit`)}
                value={values[field]}
              />
            );
          })}
        </div>

        <p className="mt-6 border-l-4 border-accent pl-4 text-m text-muted">{t('note')}</p>
      </div>

      <aside className="rounded-card border border-foreground bg-foreground p-5 text-background shadow-l-accent sm:p-6">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-background/55">
          {t('result.title')}
        </p>
        <h3 className="mt-5 text-m font-black uppercase tracking-[0.16em] text-background/70">
          {resultLabel}
        </h3>
        <div className="mt-3 font-accent text-accent-l leading-none text-accent">
          {calculation.status === 'ok'
            ? formatResult(mode, calculation.value, locale)
            : t('result.empty')}
        </div>
        {calculation.status === 'error' && calculation.reason !== 'invalid-input' ? (
          <p className="mt-4 border border-accent bg-accent/15 p-3 text-m font-semibold text-background">
            {t(`errors.${calculation.reason}`)}
          </p>
        ) : null}

        {summary ? (
          <dl className="mt-7 grid gap-3 border-t border-background/20 pt-5">
            {summary.map((item) => (
              <div className="flex items-baseline justify-between gap-4" key={item.label}>
                <dt className="text-s uppercase tracking-[0.14em] text-background/55">
                  {t(`result.${item.label}`)}
                </dt>
                <dd className="text-right text-m font-black text-background">
                  {formatSummaryValue(item.value, item.kind, locale)}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </aside>
    </section>
  );
};

const formatResult = (mode: CalculationMode, value: number, locale: Locale) => {
  if (mode === 'rate') {
    return formatPercent(value, locale);
  }

  if (mode === 'term') {
    return formatMonths(value, locale);
  }

  return formatMoney(value, locale);
};

const formatSummaryValue = (value: number, kind: SummaryKind, locale: Locale) => {
  if (kind === 'percent') {
    return formatPercent(value, locale);
  }

  if (kind === 'months') {
    return formatMonths(value, locale);
  }

  return formatMoney(value, locale);
};

const formatMoney = (value: number, locale: Locale) =>
  `${new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(value)} ${locale === 'ru' ? '₽' : 'units'}`;

const formatPercent = (value: number, locale: Locale) =>
  new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
  }).format(value) + '%';

const formatMonths = (value: number, locale: Locale) =>
  new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(Math.ceil(value));
