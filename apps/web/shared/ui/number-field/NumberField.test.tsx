import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { NumberField } from './NumberField';

afterEach(() => {
  cleanup();
});

describe('NumberField', () => {
  it('renders an accessible numeric input with unit and hint', () => {
    render(
      <NumberField
        hint="Введите сумму кредита"
        label="Сумма"
        onValueChange={vi.fn()}
        unit="₽"
        value={1_000_000}
      />,
    );

    const input = screen.getByRole('textbox', { name: 'Сумма' });

    expect(input).toHaveValue('1,000,000');
    expect(screen.getByText('₽')).toBeInTheDocument();
    expect(screen.getByText('Введите сумму кредита')).toBeInTheDocument();
  });

  it('renders validation error when provided', () => {
    render(
      <NumberField
        error="Некорректное значение"
        label="Ставка"
        onValueChange={vi.fn()}
        unit="%"
        value={null}
      />,
    );

    expect(screen.getByText('Некорректное значение')).toBeInTheDocument();
  });
});
