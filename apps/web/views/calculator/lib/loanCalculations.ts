const MONTHS_IN_YEAR = 12;
const MIN_RATE = 0;
const MAX_MONTHLY_RATE = 1;
const RATE_SEARCH_ITERATIONS = 80;
const MONEY_EPSILON = 0.000001;

export type LoanCalculationError =
  | 'invalid-input'
  | 'payment-too-low'
  | 'rate-out-of-range'
  | 'term-out-of-range';

export type LoanCalculationResult =
  | {
      status: 'ok';
      value: number;
    }
  | {
      reason: LoanCalculationError;
      status: 'error';
    };

export interface LoanTermInput {
  months: number;
  payment: number;
  principal: number;
}

export interface PaymentInput {
  annualRatePercent: number;
  months: number;
  principal: number;
}

export interface PrincipalInput {
  annualRatePercent: number;
  months: number;
  payment: number;
}

export interface TermInput {
  annualRatePercent: number;
  payment: number;
  principal: number;
}

const isPositiveFinite = (value: number) => Number.isFinite(value) && value > 0;

const toMonthlyRate = (annualRatePercent: number) => annualRatePercent / 100 / MONTHS_IN_YEAR;

const isValidMonths = (months: number) => Number.isInteger(months) && months > 0;

const createOk = (value: number): LoanCalculationResult => ({
  status: 'ok',
  value,
});

const createError = (reason: LoanCalculationError): LoanCalculationResult => ({
  reason,
  status: 'error',
});

export const yearsToMonths = (years: number) => Math.round(years * MONTHS_IN_YEAR);

export const calculateMonthlyPayment = ({
  annualRatePercent,
  months,
  principal,
}: PaymentInput): LoanCalculationResult => {
  if (!isPositiveFinite(principal) || !isValidMonths(months) || annualRatePercent < MIN_RATE) {
    return createError('invalid-input');
  }

  const monthlyRate = toMonthlyRate(annualRatePercent);

  if (monthlyRate === 0) {
    return createOk(principal / months);
  }

  const rateFactor = (1 + monthlyRate) ** -months;

  return createOk((principal * monthlyRate) / (1 - rateFactor));
};

export const calculatePrincipal = ({
  annualRatePercent,
  months,
  payment,
}: PrincipalInput): LoanCalculationResult => {
  if (!isPositiveFinite(payment) || !isValidMonths(months) || annualRatePercent < MIN_RATE) {
    return createError('invalid-input');
  }

  const monthlyRate = toMonthlyRate(annualRatePercent);

  if (monthlyRate === 0) {
    return createOk(payment * months);
  }

  const rateFactor = (1 + monthlyRate) ** -months;

  return createOk((payment * (1 - rateFactor)) / monthlyRate);
};

export const calculateTermMonths = ({
  annualRatePercent,
  payment,
  principal,
}: TermInput): LoanCalculationResult => {
  if (!isPositiveFinite(principal) || !isPositiveFinite(payment) || annualRatePercent < MIN_RATE) {
    return createError('invalid-input');
  }

  const monthlyRate = toMonthlyRate(annualRatePercent);

  if (monthlyRate === 0) {
    return createOk(Math.ceil(principal / payment));
  }

  const monthlyInterest = principal * monthlyRate;

  if (payment <= monthlyInterest) {
    return createError('payment-too-low');
  }

  const months = -Math.log(1 - monthlyInterest / payment) / Math.log(1 + monthlyRate);

  if (!Number.isFinite(months) || months <= 0) {
    return createError('term-out-of-range');
  }

  return createOk(Math.ceil(months));
};

export const calculateAnnualRatePercent = ({
  months,
  payment,
  principal,
}: LoanTermInput): LoanCalculationResult => {
  if (!isPositiveFinite(principal) || !isPositiveFinite(payment) || !isValidMonths(months)) {
    return createError('invalid-input');
  }

  const zeroRatePayment = principal / months;

  if (Math.abs(payment - zeroRatePayment) <= MONEY_EPSILON) {
    return createOk(0);
  }

  if (payment < zeroRatePayment) {
    return createError('payment-too-low');
  }

  let lowRate = MIN_RATE;
  let highRate = MAX_MONTHLY_RATE;

  const paymentAtMaxRate = calculatePaymentForMonthlyRate(principal, months, highRate);

  if (payment > paymentAtMaxRate) {
    return createError('rate-out-of-range');
  }

  for (let iteration = 0; iteration < RATE_SEARCH_ITERATIONS; iteration += 1) {
    const middleRate = (lowRate + highRate) / 2;
    const middlePayment = calculatePaymentForMonthlyRate(principal, months, middleRate);

    if (middlePayment < payment) {
      lowRate = middleRate;
    } else {
      highRate = middleRate;
    }
  }

  return createOk(((lowRate + highRate) / 2) * MONTHS_IN_YEAR * 100);
};

const calculatePaymentForMonthlyRate = (principal: number, months: number, monthlyRate: number) => {
  if (monthlyRate === 0) {
    return principal / months;
  }

  return (principal * monthlyRate) / (1 - (1 + monthlyRate) ** -months);
};
