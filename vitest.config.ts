/// <reference types="vitest" />
import react from '@vitejs/plugin-react'; // Vitest uses Vite under the hood
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    react(), // This will use your project's Babel config for React, including React 19 specifics if set up
  ],
  test: {
    globals: true, // Makes things like `describe`, `it`, `expect` available globally
    environment: 'happy-dom', // Simulate a browser environment
    setupFiles: './vitest.setup.ts', // A file for global test setup (e.g., jest-dom matchers)
    include: ['app/**/*.test.{ts,tsx}', 'src/**/*.test.{ts,tsx}'], // Where to find test files
    css: false, // If you have CSS imports in components, set to true or use a CSS mock
    pool: 'forks', // Explicitly set the pool to 'forks'
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'json', 'html'],
      include: ['app/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}'],
      exclude: [
        'app/**/*.test.{ts,tsx}', 
        'src/**/*.test.{ts,tsx}',
        'vitest.setup.ts',
        'app/entry.client.tsx',
        'app/entry.server.tsx',
        'app/root.tsx', // Often has a lot of boilerplate, consider testing specific parts
        'src/server/**/*', // Exclude server-side code from client-side test coverage for now
        '**/*.d.ts'
      ],
    },
  },
  resolve: {
    alias: {
      '@': new URL('.', import.meta.url).pathname, // Adjust if your @ alias points elsewhere
      '~': new URL('./app', import.meta.url).pathname,
    },
  },
});
