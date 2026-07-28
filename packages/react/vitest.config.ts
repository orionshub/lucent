import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Native Vite 8 tsconfig path resolution (replaces vite-tsconfig-paths plugin).
    tsconfigPaths: true,
    extensions: ['.mts', '.mjs', '.ts', '.tsx', '.js', '.jsx', '.json'],
  },
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
