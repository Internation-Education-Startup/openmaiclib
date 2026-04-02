import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

// Strip 'use client' directives (Next.js specific, not needed in Vite library output)
function stripUseClientPlugin() {
  return {
    name: 'strip-use-client',
    transform(code: string, id: string) {
      if (id.endsWith('.tsx') || id.endsWith('.ts')) {
        const stripped = code.replace(/^['"]use client['"];?\s*\n?/m, '');
        if (stripped !== code) {
          return { code: stripped, map: null };
        }
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [
    stripUseClientPlugin(),
    react(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.json',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      // Shim next/navigation for components that import useRouter
      'next/navigation': path.resolve(__dirname, 'shims/next-navigation.ts'),
      // Shim next/server for server-side code (type-only in most cases)
      'next/server': path.resolve(__dirname, 'shims/next-server.ts'),
    },
  },
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, 'index.ts'),
        server: path.resolve(__dirname, 'server.ts'),
      },
      formats: ['es'],
    },
    outDir: 'dist',
    sourcemap: true,
    // Emit individual modules for optimal tree-shaking
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: '.',
        entryFileNames: '[name].js',
      },
      external: [
        // Peer dependencies
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-dom/client',
        // Heavy dependencies that consumers should install
        /^@ai-sdk\//,
        /^@langchain\//,
        /^@radix-ui\//,
        /^@xyflow\//,
        /^@base-ui\//,
        /^prosemirror-/,
        /^echarts/,
        'ai',
        'zustand',
        'zustand/middleware',
        'immer',
        'nanoid',
        'lucide-react',
        'sonner',
        'motion/react',
        'dexie',
        'zod',
        'katex',
        'temml',
        'tinycolor2',
        'tokenlens',
        'embla-carousel-react',
        'jsonrepair',
        'partial-json',
        'lodash',
        'mitt',
        'cmdk',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        'radix-ui',
        'shiki',
        'use-stick-to-bottom',
        'file-saver',
        'pptxgenjs',
        'mathml2omml',
        'js-yaml',
        'jszip',
        'svg-arc-to-cubic-bezier',
        'svg-pathdata',
        // Node.js built-ins (server entry only)
        /^node:/,
        'crypto',
        'fs',
        'path',
        // Native / binary / wasm deps — must be installed by consumer
        'sharp',
        'unpdf',
      ],
    },
  },
});
