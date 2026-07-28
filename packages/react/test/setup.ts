import '@testing-library/jest-dom/vitest';
import { expect } from 'vitest';
import { toHaveNoViolations } from './axe-matcher.js';

expect.extend({ toHaveNoViolations });
