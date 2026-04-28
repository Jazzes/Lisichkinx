import { describe, expect, it } from 'vitest';

import {
  calculateAnnualRatePercent,
  calculateMonthlyPayment,
  calculatePrincipal,
  calculateTermMonths,
  yearsToMonths,
} from './loanCalculations';

const expectOkValue = (result: ReturnType<typeof calculateMonthlyPayment>) => {
  expect(result.status).toBe('ok');

  if (result.status !== 'ok') {
    throw new Error('Expected successful calculation');
  }

  return result.value;
};

describe('loanCalculations', () => {
  it('calculates annuity monthly payment', () => {
    const payment = expectOkValue(
      calculateMonthlyPayment({
        annualRatePercent: 12,
        months: 12,
        principal: 1_000_000,
      }),
    );

    expect(payment).toBeCloseTo(88_848.79, 2);
  });

  it('calculates monthly payment for a zero interest loan', () => {
    const payment = expectOkValue(
      calculateMonthlyPayment({
        annualRatePercent: 0,
        months: 10,
        principal: 500_000,
      }),
    );

    expect(payment).toBe(50_000);
  });

  it('calculates principal from payment, rate and term', () => {
    const principal = expectOkValue(
      calculatePrincipal({
        annualRatePercent: 12,
        months: 12,
        payment: 88_848.79,
      }),
    );

    expect(principal).toBeCloseTo(1_000_000, 0);
  });

  it('calculates term in whole months', () => {
    const months = expectOkValue(
      calculateTermMonths({
        annualRatePercent: 12,
        payment: 88_848.79,
        principal: 1_000_000,
      }),
    );

    expect(months).toBe(12);
  });

  it('returns an error when payment does not cover monthly interest', () => {
    const result = calculateTermMonths({
      annualRatePercent: 12,
      payment: 10_000,
      principal: 1_000_000,
    });

    expect(result).toEqual({
      reason: 'payment-too-low',
      status: 'error',
    });
  });

  it('finds annual rate from principal, payment and term', () => {
    const annualRatePercent = expectOkValue(
      calculateAnnualRatePercent({
        months: 12,
        payment: 88_848.79,
        principal: 1_000_000,
      }),
    );

    expect(annualRatePercent).toBeCloseTo(12, 2);
  });

  it('returns zero rate when payment equals principal divided by months', () => {
    const annualRatePercent = expectOkValue(
      calculateAnnualRatePercent({
        months: 10,
        payment: 50_000,
        principal: 500_000,
      }),
    );

    expect(annualRatePercent).toBe(0);
  });

  it('converts years to months using rounded whole months', () => {
    expect(yearsToMonths(1.5)).toBe(18);
  });
});
