/**
 * axe-matcher.ts — tiny axe-core wrapper for Vitest
 *
 * Usage:
 *   await expect(container).toHaveNoViolations();
 *
 * Uses axe-core 4.12 directly — NOT the stale vitest-axe (2022).
 */
import axe from 'axe-core';
import { expect } from 'vitest';

type MatcherResult = {
  pass: boolean;
  message: () => string;
};

export async function toHaveNoViolations(
  received: Element | Document,
): Promise<MatcherResult> {
  const container = received instanceof Document ? received.body : received;
  const results = await axe.run(container);
  const violations = results.violations;

  if (violations.length === 0) {
    return {
      pass: true,
      message: () => 'Expected axe violations but found none.',
    };
  }

  const message = [
    `Found ${violations.length} axe violation(s):`,
    ...violations.map((v, i) => [
      `\n  ${i + 1}. [${v.impact}] ${v.description}`,
      `     Rule: ${v.id}`,
      `     Nodes: ${v.nodes.map((n) => n.target.join(', ')).join(' | ')}`,
    ].join('\n')),
  ].join('');

  return {
    pass: false,
    message: () => message,
  };
}

// Extend Vitest's expect with the matcher type
declare module 'vitest' {
  interface Assertion {
    toHaveNoViolations(): Promise<void>;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): Promise<void>;
  }
}
