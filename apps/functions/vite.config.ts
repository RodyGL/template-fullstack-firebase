import { resolve } from 'path';

import builtinModules from 'builtin-modules';
import { defineConfig } from 'vite';

import globalPkg from '../../package.json';

import localPkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    outDir: 'build',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        ...new Set([
          ...Object.keys(globalPkg.dependencies),
          ...Object.keys(localPkg.dependencies),
          ...builtinModules,
        ]),
      ],
      input: {
        main: resolve(__dirname, 'src/index.ts'),
      },
      output: {
        manualChunks: undefined,
        preserveModules: true,
        exports: 'named',
        format: 'cjs',
        dir: 'build',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
      preserveEntrySignatures: 'strict',
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
