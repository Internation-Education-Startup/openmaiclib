import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

const ROOT = path.resolve(__dirname, '../..');

function stripUseClientPlugin() {
  return {
    name: 'strip-use-client',
    transform(code: string, id: string) {
      if (id.endsWith('.tsx') || id.endsWith('.ts')) {
        const stripped = code.replace(/^['"]use client['"];?\s*\n?/m, '');
        if (stripped !== code) return { code: stripped, map: null };
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [
    stripUseClientPlugin(),
    react(),
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
        // Peer deps
        'react', 'react-dom', 'react/jsx-runtime', 'react-dom/client',
        // UI deps (consumers install these)
        /^@radix-ui\//, /^@xyflow\//, /^@base-ui\//,
        /^prosemirror-/, /^echarts/,
        'zustand', 'zustand/middleware', 'immer', 'nanoid',
        'lucide-react', 'sonner', 'motion/react', 'dexie', 'zod',
        'katex', 'temml', 'tinycolor2', 'tokenlens',
        'embla-carousel-react', 'jsonrepair', 'partial-json',
        'lodash', 'mitt', 'cmdk', 'class-variance-authority', 'clsx',
        'tailwind-merge', 'radix-ui', 'shiki', 'use-stick-to-bottom',
        'file-saver', 'pptxgenjs', 'mathml2omml', 'js-yaml', 'jszip',
        'svg-arc-to-cubic-bezier', 'svg-pathdata', 'ai',
        /^@ai-sdk\//, /^@langchain\//,
        // MUST NOT appear in UI bundle
        /^node:/, 'crypto', 'fs', 'path', 'sharp', 'unpdf', 'undici',
      ],
    },
  },
});
