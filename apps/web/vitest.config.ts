import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const appDirectory = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': appDirectory,
    },
  },
  test: {
    clearMocks: true,
    coverage: {
      exclude: ['**/*.stories.tsx', '**/*.test.{ts,tsx}', 'test/**'],
      include: ['{app,shared,views,widgets}/**/*.{ts,tsx}'],
      provider: 'v8',
      reporter: ['text', 'html'],
    },
    environment: 'jsdom',
    include: ['{app,shared,views,widgets}/**/*.test.{ts,tsx}'],
    restoreMocks: true,
    setupFiles: ['./test/setup.ts'],
  },
});
