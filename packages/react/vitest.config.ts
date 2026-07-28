import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Default project: happy-dom browser environment for component tests
    projects: [
      {
        test: {
          name: 'dom',
          environment: 'happy-dom',
          include: ['test/**/*.test.{ts,tsx}'],
          exclude: ['test/ssr-import.test.ts'],
          setupFiles: ['./test/setup.ts'],
        },
      },
      {
        test: {
          name: 'node',
          environment: 'node',
          include: ['test/ssr-import.test.ts'],
          // No setupFiles — pure node env, no DOM globals
        },
      },
    ],
  },
});
