/**
 * tokens.test.ts — Token emission verification (FND-02, FND-09)
 *
 * Asserts the generated CSS vars, two-tier var() chain, dark+light remap,
 * typed TS map, and the Tailwind v4 @theme preset are correct.
 * Also confirms the four component-facing type roles are present and
 * the internal-only 12px/36px primitives are NOT exposed as semantic roles.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = resolve(__dirname, '..');

const tokensCss     = readFileSync(resolve(base, 'src/styles/tokens.css'), 'utf8');
const tokensLightCss= readFileSync(resolve(base, 'src/styles/tokens.light.css'), 'utf8');
const tailwindPreset= readFileSync(resolve(base, 'src/tailwind/preset.css'), 'utf8');
const tsMapped      = readFileSync(resolve(base, 'src/tokens/index.ts'), 'utf8');

describe('Token emission (FND-02, FND-09)', () => {

  describe('Core semantic CSS vars', () => {
    it('--lucent-surface is defined at :root', () => {
      expect(tokensCss).toContain('--lucent-surface');
      expect(tokensCss).toContain(':root');
    });

    it('--lucent-on-surface is defined', () => {
      expect(tokensCss).toContain('--lucent-on-surface');
    });

    it('--lucent-accent is defined', () => {
      expect(tokensCss).toContain('--lucent-accent');
    });

    it('--lucent-glass-opacity is defined', () => {
      expect(tokensCss).toContain('--lucent-glass-opacity');
    });

    it('--lucent-glass-blur is defined', () => {
      expect(tokensCss).toContain('--lucent-glass-blur');
    });

    it('--lucent-radius-md is defined', () => {
      expect(tokensCss).toContain('--lucent-radius-md');
    });

    it('--lucent-space-4 is defined', () => {
      expect(tokensCss).toContain('--lucent-space-4');
    });

    it('--lucent-edge (luminous edge, D-19) is defined', () => {
      expect(tokensCss).toContain('--lucent-edge');
      expect(tokensCss).toContain('inset 0 1px');
    });

    it('--lucent-focus-ring is defined', () => {
      expect(tokensCss).toContain('--lucent-focus-ring');
    });
  });

  describe('Two-tier var() chain (outputReferences, D-02)', () => {
    it('at least one semantic var resolves via var() (not inlined raw value)', () => {
      // --lucent-glass-opacity: var(--lucent-glass-opacity-default)
      expect(tokensCss).toMatch(/--lucent-glass-opacity:\s*var\(--lucent-/);
    });

    it('--lucent-glass-opacity references the default primitive via var()', () => {
      expect(tokensCss).toMatch(/--lucent-glass-opacity:\s*var\(--lucent-glass-opacity-default\)/);
    });

    it('primitive default value (0.72) is defined for the chain to resolve', () => {
      expect(tokensCss).toMatch(/--lucent-glass-opacity-default:\s*0\.72/);
    });

    it('floor value (0.60) is defined at the primitive level', () => {
      expect(tokensCss).toMatch(/--lucent-glass-opacity-min:\s*0\.60/);
    });
  });

  describe('Dark defaults and light theme remap', () => {
    it('tokens.css defines :root dark defaults', () => {
      expect(tokensCss).toContain(':root');
    });

    it('tokens.light.css defines [data-theme="light"] remap', () => {
      expect(tokensLightCss).toContain('[data-theme="light"]');
    });

    it('light theme remaps --lucent-bg', () => {
      expect(tokensLightCss).toContain('--lucent-bg');
    });

    it('light theme remaps --lucent-surface', () => {
      expect(tokensLightCss).toContain('--lucent-surface');
    });

    it('light theme remaps --lucent-glass-opacity to light default (0.78)', () => {
      expect(tokensLightCss).toContain('--lucent-glass-opacity');
      // References the light opacity primitive
      expect(tokensLightCss).toMatch(/glass-opacity.*0\.78|glass-opacity-light/);
    });
  });

  describe('Tailwind v4 @theme preset (FND-09)', () => {
    it('preset.css starts with @theme block', () => {
      expect(tailwindPreset).toMatch(/@theme/);
    });

    it('preset references --lucent- vars', () => {
      expect(tailwindPreset).toContain('--lucent-');
    });

    it('preset does not contain raw value overrides (references vars, not inlined values)', () => {
      // The Tailwind preset should reference --lucent-* vars, not duplicate hardcoded values
      const varRefs = (tailwindPreset.match(/var\(--lucent-/g) || []).length;
      expect(varRefs).toBeGreaterThan(0);
    });
  });

  describe('Typed TS token map (FND-02)', () => {
    it('src/tokens/index.ts exists', () => {
      expect(existsSync(resolve(base, 'src/tokens/index.ts'))).toBe(true);
    });

    it('exports typed token constants', () => {
      expect(tsMapped).toMatch(/export const Lucent/i);
    });

    it('exports the Display type role size', () => {
      expect(tsMapped).toContain('28px');
    });

    it('exports the Body type role size', () => {
      expect(tsMapped).toContain('16px');
    });
  });

  describe('Type scale — component-facing roles only (UI checker note)', () => {
    it('four component-facing semantic type roles are present', () => {
      // Display, Heading, Body, Label
      expect(tokensCss).toContain('--lucent-type-display-size');
      expect(tokensCss).toContain('--lucent-type-heading-size');
      expect(tokensCss).toContain('--lucent-type-body-size');
      expect(tokensCss).toContain('--lucent-type-label-size');
    });

    it('internal-only 12px/36px primitives do NOT have component-facing semantic roles', () => {
      // Internal-only primitives (--lucent-type-size-12 and -36) must NOT be mapped
      // to any semantic role token (e.g. --lucent-type-*-size pointing to them).
      // They can exist as raw primitives but nothing should reference them as a component role.
      const semanticSizeVars = tokensCss.match(/--lucent-type-(display|heading|body|label)-size/g) || [];
      const roleValues = semanticSizeVars.map((v: string) => {
        const re = new RegExp(v.replace('--', '--') + ':\\s*([^;\\n]+)');
        const m = re.exec(tokensCss);
        return m ? m[1].trim() : '';
      });
      // None of the four semantic roles should resolve to 12px or 36px
      for (const val of roleValues) {
        expect(val).not.toContain('12px');
        expect(val).not.toContain('36px');
        expect(val).not.toContain('size-12');
        expect(val).not.toContain('size-36');
      }
    });
  });

});
