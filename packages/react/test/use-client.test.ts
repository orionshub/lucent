/**
 * use-client.test.ts — Build-output test for "use client" directive preservation (FND-01, D-03)
 *
 * This is the REAL acceptance gate for the "use client" preservation mechanism.
 * It verifies the post-build script (scripts/post-build.mjs fallback) did its job:
 *   - Interactive dist entries (theme/index.js) carry "use client"
 *   - Server-safe dist entries (GlassSurface/index.js) do NOT carry it
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = resolve(__dirname, '../dist');

describe('Build-output client directive (FND-01, D-03)', () => {

  it('dist/theme/index.js exists', () => {
    expect(existsSync(resolve(dist, 'theme/index.js'))).toBe(true);
  });

  it('dist/theme/index.js starts with "use client" (interactive entry must carry it)', () => {
    const firstLine = readFileSync(resolve(dist, 'theme/index.js'), 'utf8')
      .split('\n')[0]
      .trim();
    expect(firstLine).toMatch(/^["']use client["']/);
  });

  it('dist/primitives/GlassSurface/index.js does NOT have "use client" (server-safe entry)', () => {
    const content = readFileSync(
      resolve(dist, 'primitives/GlassSurface/index.js'),
      'utf8',
    );
    const firstLine = content.split('\n')[0].trim();
    expect(firstLine).not.toMatch(/^["']use client["']/);
  });

  it('dist/tokens/index.js does NOT have "use client" (server-safe entry)', () => {
    const content = readFileSync(resolve(dist, 'tokens/index.js'), 'utf8');
    const firstLine = content.split('\n')[0].trim();
    expect(firstLine).not.toMatch(/^["']use client["']/);
  });

  // ─── Phase 2 client/server split ──────────────────────────────────────────

  function firstLine(rel: string): string {
    return readFileSync(resolve(dist, rel), 'utf8').split('\n')[0].trim();
  }

  describe('Phase 2 — client entries carry "use client"', () => {
    for (const rel of ['utils/Portal/index.js', 'primitives/Avatar/index.js']) {
      it(`dist/${rel} starts with "use client"`, () => {
        expect(firstLine(rel)).toMatch(/^["']use client["']/);
      });
    }
  });

  describe('Phase 2 — server-safe entries do NOT carry "use client"', () => {
    const serverSafe = [
      'primitives/Button/index.js',
      'primitives/IconButton/index.js',
      'primitives/Link/index.js',
      'primitives/Text/index.js',
      'primitives/Heading/index.js',
      'primitives/Badge/index.js',
      'primitives/Kbd/index.js',
      'primitives/Separator/index.js',
      'primitives/AspectRatio/index.js',
      'utils/Slot/index.js',
      'utils/VisuallyHidden/index.js',
      'utils/AccessibleIcon/index.js',
    ];
    for (const rel of serverSafe) {
      it(`dist/${rel} does NOT start with "use client"`, () => {
        expect(firstLine(rel)).not.toMatch(/^["']use client["']/);
      });
    }
  });

  describe('All exported CSS/preset targets exist after build', () => {
    const cssPaths = [
      'styles/index.css',
      'styles/tokens.css',
      'styles/glass.css',
      'styles/fonts.css',
      'tailwind/preset.css',
      'theme/ThemePanel.css',
    ];

    for (const cssPath of cssPaths) {
      it(`dist/${cssPath} exists`, () => {
        expect(existsSync(resolve(dist, cssPath))).toBe(true);
      });
    }
  });

});
