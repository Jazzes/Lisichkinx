import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  addons: ['@storybook/addon-a11y'],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  stories: [
    '../{app,shared,views,widgets}/**/*.mdx',
    '../{app,shared,views,widgets}/**/*.stories.@(ts|tsx)',
  ],
};

export default config;
