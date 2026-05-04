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
  TermInputUnit,
} from '../lib/calculatorModel';

const MONTHS_PER_YEAR = 12;
const MAX_ANNUAL_RATE_PERCENT = 1_000;
const MAX_PRINCIPAL = 1_000_000_000;
const MAX_TERM_YEARS = 100;
const MAX_TERM_MONTHS = MAX_TERM_YEARS * MONTHS_PER_YEAR;
const TERM_FRACTION_DIGITS = 1;

const noopValueChange = (_value: number | null) => {};

const roundToTenths = (value: number) =>
  Math.round(value * 10 ** TERM_FRACTION_DIGITS) / 10 ** TERM_FRACTION_DIGITS;

const termMonthsFromYearsInput = (years: number) =>
  Math.max(1, Math.round(years * MONTHS_PER_YEAR));

const termYearsFromMonthsInput = (months: number) => roundToTenths(months / MONTHS_PER_YEAR);

const roundResultForReadOnlyField = (field: FieldKey, raw: number) => {
  if (field === 'payment' || field === 'principal') {
    return Math.round(raw);
  }

  if (field === 'annualRatePercent') {
    return Math.round(raw * 100) / 100;
  }

  if (field === 'termMonths') {
    return Math.ceil(raw);
  }

  return raw;
};

const getFieldFractionDigits = (field: FieldKey, termInputUnit: TermInputUnit) => {
  if (field === 'annualRatePercent') {
    return 2;
  }

  if (field === 'termMonths' && termInputUnit === 'years') {
    return TERM_FRACTION_DIGITS;
  }

  return 0;
};

const getFieldFormatLocale = (field: FieldKey, locale: Locale) =>
  field === 'principal' || field === 'payment' ? locale : 'en';

const isMoneyField = (field: FieldKey) => field === 'principal' || field === 'payment';

const getFieldMax = (
  field: FieldKey,
  isResultField: boolean,
  termInputUnit: TermInputUnit,
): number | undefined => {
  if (isResultField) {
    return undefined;
  }

  if (field === 'principal') {
    return MAX_PRINCIPAL;
  }

  if (field === 'annualRatePercent') {
    return MAX_ANNUAL_RATE_PERCENT;
  }

  if (field === 'termMonths') {
    return termInputUnit === 'years' ? MAX_TERM_YEARS : MAX_TERM_MONTHS;
  }

  return undefined;
};

export interface CreditCalculatorProps {
  locale: Locale;
}

export const CreditCalculator: FC<CreditCalculatorProps> = ({ locale }) => {
  const t = useTranslations('calculator.page.calculator');
  const [mode, setMode] = useState<CalculationMode>('payment');
  const [values, setValues] = useState<CalculatorValues>(DEFAULT_VALUES);
  const [termInputUnit, setTermInputUnit] = useState<TermInputUnit>('years');

  const calculation = useMemo(() => calculateCalculatorResult(mode, values), [mode, values]);
  const resultField = RESULT_FIELDS[mode];
  const orderedFields = useMemo(
    () => [...INPUT_FIELDS.filter((field) => field !== resultField), resultField],
    [resultField],
  );
  const resultValue = calculation.status === 'ok' ? calculation.value : null;
  const resultLabel = t(`modes.${mode}`);
  const summary = resultValue === null ? null : createCalculatorSummary(mode, values, resultValue);

  const handleFieldChange = (field: FieldKey) => (value: number | null) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const handleTermValueChange = (value: number | null) => {
    if (value === null) {
      setValues((current) => ({ ...current, termMonths: null }));
      return;
    }

    if (termInputUnit === 'years') {
      setValues((current) => ({ ...current, termMonths: termMonthsFromYearsInput(value) }));
      return;
    }

    setValues((current) => ({ ...current, termMonths: Math.max(1, Math.round(value)) }));
  };

  const handleReset = () => {
    setValues(DEFAULT_VALUES);
    setTermInputUnit('years');
  };

  const getFieldNumberValue = (field: FieldKey, isResultField: boolean): number | null => {
    if (isResultField) {
      if (calculation.status !== 'ok') {
        return null;
      }

      return roundResultForReadOnlyField(field, calculation.value);
    }

    if (field === 'termMonths') {
      if (values.termMonths === null) {
        return null;
      }

      return termInputUnit === 'years'
        ? termYearsFromMonthsInput(values.termMonths)
        : values.termMonths;
    }

    return values[field];
  };

  const getFieldUnit = (field: FieldKey, isResultField: boolean) => {
    if (field === 'termMonths') {
      return isResultField || termInputUnit === 'months'
        ? t('fields.termMonths.unitMonths')
        : t('fields.termMonths.unitYears');
    }

    return t(`fields.${field}.unit` as 'fields.principal.unit');
  };

  const getFieldPlaceholder = (field: FieldKey, isResultField: boolean) => {
    if (isResultField) {
      return undefined;
    }

    if (field === 'termMonths') {
      return termInputUnit === 'years'
        ? t('fields.termMonths.placeholderYears')
        : t('fields.termMonths.placeholderMonths');
    }

    return t(`fields.${field}.placeholder` as 'fields.principal.placeholder');
  };

  const getTermMin = () => (termInputUnit === 'years' ? 0.5 : 1);

  const getFieldHint = (field: FieldKey, isResultField: boolean) =>
    isResultField
      ? t(`fields.${field}.hintResult` as 'fields.principal.hintResult')
      : t(`fields.${field}.hintInput` as 'fields.principal.hintInput');

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
          {orderedFields.map((field) => {
            const isResultField = field === resultField;
            const readOnly = isResultField;

            return (
              <NumberField
                formatLocale={getFieldFormatLocale(field, locale)}
                hint={getFieldHint(field, isResultField)}
                key={field}
                label={t(`fields.${field}.label` as 'fields.principal.label')}
                labelExtra={
                  field === 'termMonths' && !isResultField ? (
                    <div
                      aria-label={t('termUnit.groupLabel')}
                      className="flex flex-wrap gap-2"
                      role="group"
                    >
                      <Tab
                        active={termInputUnit === 'years'}
                        className="px-3! py-2! text-xs!"
                        onClick={() => setTermInputUnit('years')}
                        type="button"
                      >
                        {t('fields.termMonths.unitYears')}
                      </Tab>
                      <Tab
                        active={termInputUnit === 'months'}
                        className="px-3! py-2! text-xs!"
                        onClick={() => setTermInputUnit('months')}
                        type="button"
                      >
                        {t('termUnit.months')}
                      </Tab>
                    </div>
                  ) : undefined
                }
                max={getFieldMax(field, isResultField, termInputUnit)}
                min={field === 'termMonths' && !isResultField ? getTermMin() : 0}
                onValueChange={
                  readOnly
                    ? noopValueChange
                    : field === 'termMonths'
                      ? handleTermValueChange
                      : handleFieldChange(field)
                }
                maximumFractionDigits={getFieldFractionDigits(field, termInputUnit)}
                placeholder={getFieldPlaceholder(field, isResultField)}
                readOnly={readOnly}
                step={getFieldStep(field, termInputUnit)}
                unit={getFieldUnit(field, isResultField)}
                useGrouping={isMoneyField(field)}
                value={getFieldNumberValue(field, isResultField)}
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
    useGrouping: false,
  }).format(value) + '%';

const formatMonths = (value: number, locale: Locale) =>
  new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
    useGrouping: false,
  }).format(Math.ceil(value));
