import { Button } from './Button';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    invert: { control: 'boolean' },
    children: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Inverted: Story = {
  args: {
    children: 'Inverted Button',
    invert: true,
  },
};

export const AsLink: Story = {
  args: {
    children: 'Link Button',
    href: '#',
  },
};

export const AsInvertedLink: Story = {
  args: {
    children: 'Inverted Link Button',
    href: '#',
    invert: true,
  },
};