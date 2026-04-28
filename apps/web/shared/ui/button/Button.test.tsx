import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button, LinkButton } from './Button';

describe('Button', () => {
  it('renders a button with the primary design token classes by default', () => {
    render(<Button>Открыть</Button>);

    const button = screen.getByRole('button', { name: 'Открыть' });

    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('bg-foreground', 'text-background');
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
    expect(button).toHaveClass('border-foreground/35', 'bg-surface', 'text-foreground');
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
    expect(link).toHaveClass('rounded-control', 'border-foreground/35', 'bg-surface');
  });

  it('sets aria-current when active', () => {
    render(
      <LinkButton active href={{ pathname: '/' }} variant="primary">
        Главная
      </LinkButton>,
    );

    expect(screen.getByRole('link', { name: 'Главная' })).toHaveAttribute('aria-current', 'page');
  });

  it('does not set aria-current when inactive', () => {
    render(
      <LinkButton active={false} href={{ pathname: '/projects' }} variant="primary">
        Проекты
      </LinkButton>,
    );

    expect(screen.getByRole('link', { name: 'Проекты' })).not.toHaveAttribute('aria-current');
  });

  it('renders inline variant as plain text when inactive', () => {
    render(
      <LinkButton active={false} href={{ pathname: '/about' }} variant="inline">
        О нас
      </LinkButton>,
    );

    const link = screen.getByRole('link', { name: 'О нас' });

    expect(link).toHaveClass('border-transparent', 'text-muted');
    expect(link).not.toHaveClass('bg-foreground');
  });

  it('sets data-active on inline link when active (underline via data-active:)', () => {
    render(
      <LinkButton active href={{ pathname: '/inline-active' }} variant="inline">
        Inline active
      </LinkButton>,
    );

    const link = screen.getByRole('link', { name: 'Inline active' });

    expect(link).toHaveAttribute('data-active');
    expect(link.className).toMatch(/data-active:underline/);
    expect(link).not.toHaveClass('bg-foreground');
    expect(link).toHaveAttribute('aria-current', 'page');
  });
});
