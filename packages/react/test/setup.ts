import '@testing-library/jest-dom/vitest';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';

// Ensure DOM is cleaned up after every component test.
afterEach(() => {
  cleanup();
});

expect.extend({ toHaveNoViolations });
