import { resolve } from 'path';

import replace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    replace({
      __DEV__: 'import.meta.env.DEV',
      preventAssignment: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@changeme/validator': resolve(
        __dirname,
        '../../packages/validator/src'
      ),
    },
  },
  esbuild: {
    legalComments: 'none',
  },
});
