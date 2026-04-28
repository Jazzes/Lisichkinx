import { Button, LinkButton } from './Button';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  args: {
    children: 'Открыть калькулятор',
  },
  component: Button,
  title: 'Shared UI/Button',
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const AsLink: StoryObj<typeof LinkButton> = {
  args: {
    children: 'На главную',
    href: { pathname: '/' },
    variant: 'secondary',
  },
  render: (args) => <LinkButton {...args} />,
};

export const AsLinkActive: StoryObj<typeof LinkButton> = {
  args: {
    active: true,
    children: 'Текущая страница',
    href: { pathname: '/' },
    variant: 'primary',
  },
  render: (args) => <LinkButton {...args} />,
};

export const InlineNavLink: StoryObj<typeof LinkButton> = {
  args: {
    active: false,
    children: 'Раздел',
    href: { pathname: '/projects' },
    variant: 'inline',
  },
  render: (args) => <LinkButton {...args} />,
};

export const InlineNavLinkActive: StoryObj<typeof LinkButton> = {
  args: {
    active: true,
    children: 'Текущий раздел',
    href: { pathname: '/projects' },
    variant: 'inline',
  },
  render: (args) => <LinkButton {...args} />,
};
