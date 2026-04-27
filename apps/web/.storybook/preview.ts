import type { Preview } from '@storybook/nextjs-vite';

import '../shared/styles/tailwind.css';
import '../shared/styles/globals.scss';

const preview: Preview = {
  parameters: {
    a11y: {
      test: 'error',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
