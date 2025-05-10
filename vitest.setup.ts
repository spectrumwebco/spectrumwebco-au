// vitest.setup.ts
import '@testing-library/jest-dom/vitest'; // Extends Vitest's expect with jest-dom matchers
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Optional: If you want to run a global cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock any global objects or functions if needed
// Example: Mocking matchMedia (often needed for components using responsive queries)
// Object.defineProperty(window, 'matchMedia', {
//   writable: true,
//   value: vi.fn().mockImplementation(query => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: vi.fn(), // deprecated
//     removeListener: vi.fn(), // deprecated
//     addEventListener: vi.fn(),
//     removeEventListener: vi.fn(),
//     dispatchEvent: vi.fn(),
//   })),
// });
