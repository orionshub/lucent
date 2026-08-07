import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Use the library's dist output (not src) so the demo is a real consumer
    conditions: ['import', 'module', 'browser', 'default'],
  },
});
