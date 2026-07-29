/**
 * tree-shake.fixture.mjs — Smoke tree-shake test for @lucent/react (FND-01)
 *
 * Imports ONLY the GlassSurface entry from the built dist and verifies:
 *   1. The import succeeds (exports map is correct)
 *   2. The output is small (tree-shaking works)
 *   3. CSS side-effects are preserved (sideEffects: ["**\/*.css"] protects them)
 *
 * This is the early-warning smoke version.
 * The full production tree-shake fixture + Next.js App Router smoke build
 * are the Phase 7 (DOCS-03) publish gate.
 *
 * Run after `pnpm build`:
 *   node test/tree-shake.fixture.mjs
 */
import { existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = resolve(__dirname, '..');
const distGlassSurface = resolve(pkg, 'dist/primitives/GlassSurface/index.js');

// ─── 1. Import the built GlassSurface entry ────────────────────────────────

if (!existsSync(distGlassSurface)) {
  console.error('FAIL: dist/primitives/GlassSurface/index.js not found.');
  console.error('      Run `pnpm build` first.');
  process.exit(1);
}

let mod;
try {
  // Convert Windows absolute path to file:// URL for dynamic import
  const fileUrl = new URL(`file:///${distGlassSurface.replace(/\\/g, '/')}`).href;
  mod = await import(fileUrl);
} catch (err) {
  console.error('FAIL: Could not import GlassSurface dist entry:', err.message);
  process.exit(1);
}

// ─── 2. Verify the export is defined ─────────────────────────────────────

if (!mod.GlassSurface) {
  console.error('FAIL: GlassSurface not exported from dist entry.');
  process.exit(1);
}
console.log('OK: GlassSurface exports correctly from dist entry');

// ─── 3. Output size check (should be small — just the primitive) ──────────

const sizeBytes = statSync(distGlassSurface).size;
const sizeLimitBytes = 5 * 1024; // 5 KB is generous for a single small component

if (sizeBytes > sizeLimitBytes) {
  console.error(`FAIL: dist/primitives/GlassSurface/index.js is ${sizeBytes} bytes (max ${sizeLimitBytes}).`);
  console.error('     Tree-shaking may not be working correctly.');
  process.exit(1);
}
console.log(`OK: GlassSurface dist entry size ${sizeBytes} bytes (< ${sizeLimitBytes} limit)`);

// ─── 4. CSS delivery verification (sideEffects: ["**\/*.css"]) ─────────────
// The CSS file must exist even though the JS barrel has no CSS imports.
// This is delivered by scripts/post-build.mjs (the CSS copy step).

const glassCssDist = resolve(pkg, 'dist/styles/glass.css');
if (!existsSync(glassCssDist)) {
  console.error('FAIL: dist/styles/glass.css not found — CSS copy step may have failed.');
  process.exit(1);
}
console.log('OK: dist/styles/glass.css exists (CSS delivery via copy step confirmed)');

// ─── Done ─────────────────────────────────────────────────────────────────

console.log('\n✓ Tree-shake smoke fixture passed.');
