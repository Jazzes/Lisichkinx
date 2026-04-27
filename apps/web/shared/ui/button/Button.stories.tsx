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
