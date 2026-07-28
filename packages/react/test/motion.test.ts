/**
 * motion.test.ts — Motion token and reduced-motion policy verification (FND-07)
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = resolve(__dirname, '..');
const motionCss = readFileSync(resolve(base, 'src/styles/motion.css'), 'utf8');

describe('Motion tokens and reduced-motion policy (FND-07, D-12)', () => {

  describe('Token declarations', () => {
    it('defines --lucent-duration-fast (120ms)', () => {
      expect(motionCss).toMatch(/--lucent-duration-fast:\s*120ms/);
    });

    it('defines --lucent-duration-base (200ms)', () => {
      expect(motionCss).toMatch(/--lucent-duration-base:\s*200ms/);
    });

    it('defines --lucent-duration-slow (320ms)', () => {
      expect(motionCss).toMatch(/--lucent-duration-slow:\s*320ms/);
    });

    it('defines --lucent-ease-standard', () => {
      expect(motionCss).toContain('--lucent-ease-standard');
      expect(motionCss).toContain('cubic-bezier');
    });

    it('defines --lucent-ease-exit', () => {
      expect(motionCss).toContain('--lucent-ease-exit');
    });
  });

  describe('Reduced-motion policy (Pitfall 9 — reduce, not blanket-kill)', () => {
    it('has a @media (prefers-reduced-motion: reduce) block', () => {
      expect(motionCss).toContain('prefers-reduced-motion: reduce');
    });

    it('zeroes duration tokens inside the reduced-motion block', () => {
      const reducedBlock = motionCss.match(
        /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?(?=@media|$)/,
      )?.[0] ?? '';
      expect(reducedBlock).toMatch(/--lucent-duration-fast:\s*1ms/);
      expect(reducedBlock).toMatch(/--lucent-duration-base:\s*1ms/);
      expect(reducedBlock).toMatch(/--lucent-duration-slow:\s*1ms/);
    });

    it('neutralizes large transforms (transform: none) in reduced-motion block', () => {
      const reducedBlock = motionCss.match(
        /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?(?=@media|$)/,
      )?.[0] ?? '';
      expect(reducedBlock).toContain('transform: none');
    });

    it('does NOT blanket-disable all animations/transitions', () => {
      // Policy: reduce large transforms, not kill all feedback.
      // We should NOT have `animation: none` in a universal rule like `* { animation: none }`.
      // Allowed: animation: none scoped to specific lucent utility classes.
      const hasUniversalKill = /\*\s*\{[^}]*animation:\s*none/i.test(motionCss);
      expect(hasUniversalKill).toBe(false);
    });
  });

  describe('CSS-only (no JS gate)', () => {
    it('motion.css is pure CSS (no JS/TS syntax)', () => {
      // Motion policy must be correct on first SSR paint — no JS gate.
      // This checks there's no JavaScript in the CSS file.
      expect(motionCss).not.toMatch(/const |let |var |function |import |export /);
    });

    it('uses logical properties only (no physical padding-left etc.)', () => {
      // Stylelint enforces this; here we double-check the motion file.
      expect(motionCss).not.toMatch(/\bmargin-left\b|\bmargin-right\b|\bpadding-left\b|\bpadding-right\b/);
    });
  });

});
