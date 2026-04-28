import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Tab } from './Tab';

describe('Tab', () => {
  it('renders default tab styles and pressed state', () => {
    render(<Tab active>Срок</Tab>);

    const tab = screen.getByRole('button', { name: 'Срок' });

    expect(tab).toHaveAttribute('aria-pressed', 'true');
    expect(tab).toHaveAttribute('data-active');
    expect(tab).toHaveClass('rounded-control', 'data-active:bg-foreground');
  });

  it('forwards click handlers', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Tab onClick={onClick}>Ставка</Tab>);

    await user.click(screen.getByRole('button', { name: 'Ставка' }));

    expect(onClick).toHaveBeenCalledOnce();
  });
});
