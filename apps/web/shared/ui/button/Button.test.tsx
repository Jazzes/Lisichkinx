import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button, LinkButton } from './Button';

describe('Button', () => {
  it('renders a button with the primary design token classes by default', () => {
    render(<Button>Открыть</Button>);

    const button = screen.getByRole('button', { name: 'Открыть' });

    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('bg-accent', 'text-accent-foreground', 'rounded-control');
  });

  it('keeps explicit button type and forwards click handlers', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button onClick={onClick} type="submit" variant="secondary">
        Сохранить
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Сохранить' });

    await user.click(button);

    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveClass('border-border-subtle', 'bg-surface', 'text-foreground');
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe('LinkButton', () => {
  it('renders a navigational link with button styling', () => {
    render(
      <LinkButton href={{ pathname: '/calculator' }} variant="secondary">
        Калькулятор
      </LinkButton>,
    );

    const link = screen.getByRole('link', { name: 'Калькулятор' });

    expect(link).toHaveAttribute('href', '/calculator');
    expect(link).toHaveClass('rounded-control', 'border-border-subtle', 'bg-surface');
  });
});
