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
  it('renders payment mode by default and shows payment as the last read-only field', () => {
    renderCreditCalculator();

    expect(screen.getByRole('button', { name: 'Платеж' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('textbox', { name: 'Сумма кредита' })).toBeInTheDocument();
    const paymentField = screen.getByRole('textbox', { name: 'Ежемесячный платеж' });
    expect(paymentField).toHaveAttribute('aria-readonly', 'true');
    expect(paymentField).toBeDisabled();
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
    const rateField = screen.getByRole('textbox', { name: 'Годовая ставка' });
    expect(rateField).toHaveAttribute('aria-readonly', 'true');
    expect(rateField).toBeDisabled();
    expect(screen.getAllByText('12%').length).toBeGreaterThan(0);
  });

  it('formats manually entered money values with locale group separators', async () => {
    const user = userEvent.setup();

    renderCreditCalculator();

    const principalField = screen.getByRole('textbox', { name: 'Сумма кредита' });

    await user.clear(principalField);
    await user.type(principalField, '1000000');

    expect(principalField).toHaveValue('1 000 000');

    await user.tab();

    expect(principalField).toHaveValue('1 000 000');
  });

  it('does not add group separators to annual rate input before clamping on blur', async () => {
    const user = userEvent.setup();

    renderCreditCalculator();

    const rateField = screen.getByRole('textbox', { name: 'Годовая ставка' });

    await user.clear(rateField);
    await user.type(rateField, '1111');

    expect(rateField).toHaveValue('1111');

    await user.tab();

    expect(rateField).toHaveValue('1000');
  });

  it('keeps decimal annual rate input stable while typing and on blur', async () => {
    const user = userEvent.setup();

    renderCreditCalculator();

    const rateField = screen.getByRole('textbox', { name: 'Годовая ставка' });

    await user.clear(rateField);
    await user.type(rateField, '1.11');

    expect(rateField).toHaveValue('1.11');

    await user.tab();

    expect(rateField).toHaveValue('1.11');
  });

  it('clamps annual rate to 1000 percent on blur', async () => {
    const user = userEvent.setup();

    renderCreditCalculator();

    const rateField = screen.getByRole('textbox', { name: 'Годовая ставка' });

    await user.clear(rateField);
    await user.type(rateField, '1001');
    await user.tab();

    expect(rateField).toHaveValue('1000');
  });

  it('clamps principal to one billion on blur', async () => {
    const user = userEvent.setup();

    renderCreditCalculator();

    const principalField = screen.getByRole('textbox', { name: 'Сумма кредита' });

    await user.clear(principalField);
    await user.type(principalField, '1000000001');
    await user.tab();

    expect(principalField).toHaveValue('1 000 000 000');
  });

  it('clamps term to 100 years on blur', async () => {
    const user = userEvent.setup();

    renderCreditCalculator();

    const termField = screen.getByRole('textbox', { name: 'Срок' });

    await user.clear(termField);
    await user.type(termField, '101');
    await user.tab();

    expect(termField).toHaveValue('100');
  });

  it('clamps term to 1200 months on blur', async () => {
    const user = userEvent.setup();

    renderCreditCalculator();

    const termField = screen.getByRole('textbox', { name: 'Срок' });

    await user.click(screen.getByRole('button', { name: 'Мес.' }));
    await user.clear(termField);
    await user.type(termField, '1201');
    await user.tab();

    expect(termField).toHaveValue('1200');
  });

  it('rounds term unit conversion to tenths and uses full-year step', async () => {
    const user = userEvent.setup();

    renderCreditCalculator();

    const termField = screen.getByRole('textbox', { name: 'Срок' });
    await user.click(screen.getByRole('button', { name: 'Мес.' }));
    await user.clear(termField);
    await user.type(termField, '133');

    await user.click(screen.getByRole('button', { name: 'лет' }));

    expect(termField).toHaveValue('11.1');

    const incrementTerm = screen.getAllByRole('button', { name: '' }).at(-1);
    if (!incrementTerm) {
      throw new Error('Term increment button was not found');
    }

    await user.click(incrementTerm);

    expect(termField).toHaveValue('12.1');

    await user.click(screen.getByRole('button', { name: 'Мес.' }));

    expect(termField).toHaveValue('145');
  });
});
