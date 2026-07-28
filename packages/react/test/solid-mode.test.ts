/**
 * solid-mode.test.ts — FND-04: solid/forced-colors mode collapses glass
 *
 * Tests that data-contrast="solid" and prefers-contrast
 * cause the glass-opacity to collapse to 1 and blur to 0.
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = resolve(__dirname, '..');
const glassCss = readFileSync(resolve(base, 'src/styles/glass.css'), 'utf8');

describe('Solid / high-contrast mode (FND-04)', () => {

  describe('glass.css structure checks', () => {
    it('defines the base .lucent-glass class', () => {
      expect(glassCss).toContain('.lucent-glass');
    });

    it('uses -webkit-backdrop-filter prefix', () => {
      expect(glassCss).toContain('-webkit-backdrop-filter');
    });

    it('uses standard backdrop-filter', () => {
      expect(glassCss).toContain('backdrop-filter');
    });

    it('@supports opaque fallback is present for browsers without backdrop-filter', () => {
      expect(glassCss).toMatch(/@supports not.*backdrop-filter/s);
    });

    it('[data-contrast="solid"] collapses glass opacity to 1', () => {
      expect(glassCss).toContain('[data-contrast="solid"]');
      // Check that the solid block sets opacity to 1
      const solidBlock = glassCss.match(/\[data-contrast="solid"\][^{]*\{[^}]+\}/s)?.[0] ?? '';
      expect(solidBlock).toContain('--lucent-glass-opacity: 1');
    });

    it('[data-contrast="solid"] collapses blur to 0px', () => {
      const solidBlock = glassCss.match(/\[data-contrast="solid"\][^{]*\{[^}]+\}/s)?.[0] ?? '';
      expect(solidBlock).toContain('--lucent-glass-blur: 0px');
    });

    it('@media (prefers-contrast: more) collapses glass', () => {
      expect(glassCss).toContain('prefers-contrast: more');
      const contrastBlock = glassCss.match(/@media\s*\(prefers-contrast:\s*more\)[^{]*\{[^}]+\}/s)?.[0] ?? '';
      expect(contrastBlock).toContain('--lucent-glass-opacity: 1');
    });

    it('@media (forced-colors: active) collapses to system colors', () => {
      expect(glassCss).toContain('forced-colors: active');
      const forcedBlock = glassCss.match(/@media\s*\(forced-colors:\s*active\)[^{]+\{[^}]+\}/s)?.[0] ?? '';
      expect(forcedBlock).toContain('Canvas');
      expect(forcedBlock).toContain('CanvasText');
      expect(forcedBlock).toContain('ButtonBorder');
    });

    it('capped blur uses min() to enforce 24px maximum', () => {
      // Pitfall 2: blur must never exceed 24px
      expect(glassCss).toContain('min(var(--lucent-glass-blur), 24px)');
    });

    it('consumes --lucent-surface and --lucent-glass-opacity (no hardcoded values)', () => {
      // No component may hardcode opacity or blur
      expect(glassCss).toContain('var(--lucent-surface)');
      expect(glassCss).toContain('var(--lucent-glass-opacity)');
    });

    it('luminous edge (--lucent-edge) is in the box-shadow rule', () => {
      expect(glassCss).toContain('var(--lucent-edge)');
    });

    it('focus-visible uses --lucent-focus-ring', () => {
      expect(glassCss).toContain(':focus-visible');
      expect(glassCss).toContain('var(--lucent-focus-ring)');
    });
  });

  // Human check note: @supports visual fallback and live panel repaint
  // are tested via manual browser check (01-05, 01-08 human-check tasks).
  describe('server-safety check', () => {
    it('GlassSurface source does not contain useState, useEffect, or document access', () => {
      const glassSrc = readFileSync(
        resolve(base, 'src/primitives/GlassSurface/GlassSurface.tsx'),
        'utf8',
      );
      expect(glassSrc).not.toMatch(/useState|useEffect|document\./);
    });

    it('GlassSurface source does not use dangerouslySetInnerHTML', () => {
      const glassSrc = readFileSync(
        resolve(base, 'src/primitives/GlassSurface/GlassSurface.tsx'),
        'utf8',
      );
      // Check that dangerouslySetInnerHTML is not used as a JSX prop (not just mentioned)
      expect(glassSrc).not.toMatch(/dangerouslySetInnerHTML\s*=\s*\{/);
    });

    it('GlassSurface source does NOT carry a "use client" directive', () => {
      const glassSrc = readFileSync(
        resolve(base, 'src/primitives/GlassSurface/GlassSurface.tsx'),
        'utf8',
      );
      // Server-safe — must NOT have "use client"
      expect(glassSrc.trimStart()).not.toMatch(/^["']use client["']/);
    });
  });

});
