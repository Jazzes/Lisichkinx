import {
  type LoanCalculationResult,
  calculateAnnualRatePercent,
  calculateMonthlyPayment,
  calculatePrincipal,
  calculateTermMonths,
} from './loanCalculations';

export type CalculationMode = 'payment' | 'principal' | 'rate' | 'term';
export type FieldKey = 'annualRatePercent' | 'payment' | 'principal' | 'termMonths';
export type SummaryKind = 'money' | 'months' | 'percent';
export type TermInputUnit = 'months' | 'years';

export interface CalculatorValues {
  annualRatePercent: number | null;
  payment: number | null;
  principal: number | null;
  /** Срок в месяцах (целое число). */
  termMonths: number | null;
}

export interface SummaryItem {
  kind: SummaryKind;
  label: 'monthlyPayment' | 'overpayment' | 'principal' | 'rate' | 'term' | 'totalPayment';
  value: number;
}

export const CALCULATION_MODES: CalculationMode[] = ['payment', 'rate', 'principal', 'term'];

export const DEFAULT_VALUES: CalculatorValues = {
  annualRatePercent: 12,
  payment: 88_849,
  principal: 1_000_000,
  termMonths: 12,
};

export const RESULT_FIELDS: Record<CalculationMode, FieldKey> = {
  payment: 'payment',
  principal: 'principal',
  rate: 'annualRatePercent',
  term: 'termMonths',
};

export const INPUT_FIELDS: FieldKey[] = ['principal', 'payment', 'annualRatePercent', 'termMonths'];

export const calculateCalculatorResult = (
  mode: CalculationMode,
  values: CalculatorValues,
): LoanCalculationResult => {
  const months = values.termMonths;

  if (mode === 'payment') {
    if (values.principal === null || values.annualRatePercent === null || months === null) {
      return { reason: 'invalid-input', status: 'error' };
    }

    return calculateMonthlyPayment({
      annualRatePercent: values.annualRatePercent,
      months,
      principal: values.principal,
    });
  }

  if (mode === 'rate') {
    if (values.principal === null || values.payment === null || months === null) {
      return { reason: 'invalid-input', status: 'error' };
    }

    return calculateAnnualRatePercent({
      months,
      payment: values.payment,
      principal: values.principal,
    });
  }

  if (mode === 'principal') {
    if (values.payment === null || values.annualRatePercent === null || months === null) {
      return { reason: 'invalid-input', status: 'error' };
    }

    return calculatePrincipal({
      annualRatePercent: values.annualRatePercent,
      months,
      payment: values.payment,
    });
  }

  if (values.principal === null || values.payment === null || values.annualRatePercent === null) {
    return { reason: 'invalid-input', status: 'error' };
  }

  return calculateTermMonths({
    annualRatePercent: values.annualRatePercent,
    payment: values.payment,
    principal: values.principal,
  });
};

export const getFieldStep = (field: FieldKey, _termUnit: TermInputUnit = 'months') => {
  if (field === 'annualRatePercent') {
    return 0.1;
  }

  if (field === 'termMonths') {
    return 1;
  }

  return 10_000;
};

export const createCalculatorSummary = (
  mode: CalculationMode,
  values: CalculatorValues,
  resultValue: number,
): SummaryItem[] | null => {
  const principal = mode === 'principal' ? resultValue : values.principal;
  const payment = mode === 'payment' ? resultValue : values.payment;
  const months = mode === 'term' ? resultValue : values.termMonths;
  const annualRatePercent = mode === 'rate' ? resultValue : values.annualRatePercent;

  if (principal === null || payment === null || months === null || annualRatePercent === null) {
    return null;
  }

  const totalPayment = payment * months;

  return [
    { kind: 'money', label: 'principal', value: principal },
    { kind: 'money', label: 'monthlyPayment', value: payment },
    { kind: 'percent', label: 'rate', value: annualRatePercent },
    { kind: 'months', label: 'term', value: months },
    { kind: 'money', label: 'totalPayment', value: totalPayment },
    { kind: 'money', label: 'overpayment', value: Math.max(totalPayment - principal, 0) },
  ];
};
