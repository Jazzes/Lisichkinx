import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SelectField } from './SelectField';

describe('SelectField', () => {
  it('renders trigger with visible value and associates label', () => {
    render(
      <SelectField
        label="Language"
        onValueChange={vi.fn()}
        options={[
          { label: 'ru', value: 'ru', trailing: '🇷🇺' },
          { label: 'en', value: 'en', trailing: '🇬🇧' },
        ]}
        value="ru"
      />,
    );

    const trigger = screen.getByRole('combobox', { name: 'Language' });

    expect(trigger).toHaveTextContent('ru');
    expect(trigger).toHaveTextContent('🇷🇺');
  });
});
