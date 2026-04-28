import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it } from 'vitest';

import calculatorMessages from '@/lang/ru/calculator.json';

import { CreditCalculator } from './CreditCalculator';

afterEach(() => {
  cleanup();
});

const renderCreditCalculator = () =>
  render(
    <NextIntlClientProvider locale="ru" messages={{ calculator: calculatorMessages }}>
      <CreditCalculator locale="ru" />
    </NextIntlClientProvider>,
  );

describe('CreditCalculator', () => {
  it('renders payment mode by default and hides calculated field from inputs', () => {
    renderCreditCalculator();

    expect(screen.getByRole('button', { name: 'Платеж' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('textbox', { name: 'Сумма кредита' })).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: 'Ежемесячный платеж' })).not.toBeInTheDocument();
    expect(screen.getAllByText(/88\s?849/).length).toBeGreaterThan(0);
  });

  it('switches mode and recalculates annual rate', async () => {
    const user = userEvent.setup();

    renderCreditCalculator();

    const modeGroup = screen.getAllByRole('group', { name: 'Что считаем' })[0];
    const rateButton = within(modeGroup).getByRole('button', { name: 'Ставка' });

    await user.click(rateButton);

    expect(rateButton).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('textbox', { name: 'Ежемесячный платеж' })).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: 'Годовая ставка' })).not.toBeInTheDocument();
    expect(screen.getAllByText('12%').length).toBeGreaterThan(0);
  });
});
