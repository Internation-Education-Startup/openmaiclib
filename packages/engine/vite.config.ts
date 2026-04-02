import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

const ROOT = path.resolve(__dirname, '../..');

export default defineConfig({
  plugins: [
    dts({ insertTypesEntry: true, tsconfigPath: './tsconfig.json' }),
  ],
  resolve: {
    alias: {
      '@': ROOT,
      'next/navigation': path.resolve(ROOT, 'shims/next-navigation.ts'),
      'next/server': path.resolve(ROOT, 'shims/next-server.ts'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      formats: ['es'],
    },
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
      external: [
        // Node.js built-ins
        /^node:/, 'crypto', 'fs', 'path',
        // Native / binary
        'sharp', 'unpdf',
        // AI SDK (consumers install)
        /^@ai-sdk\//, /^@langchain\//, 'ai',
        // React (only needed if engine re-exports store code)
        'react', 'react/jsx-runtime',
        // Heavy deps consumers install
        'zod', 'nanoid', 'immer', 'zustand', 'zustand/middleware',
      ],
    },
  },
});
