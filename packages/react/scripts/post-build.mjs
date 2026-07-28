#!/usr/bin/env node
/**
 * post-build.mjs — Zero-dependency post-build step
 *
 * 1. Copies every src/**\/*.css into dist/ preserving relative paths
 *    so all CSS/preset subpath exports in package.json resolve.
 *
 * 2. Prepends the React "use client" directive to interactive dist entries
 *    (theme/index.js, any theme sub-entries) that must carry it, while
 *    leaving server-safe entries (GlassSurface, tokens) untouched.
 *
 * This is the zero-dependency fallback chosen instead of
 * esbuild-plugin-preserve-directives (pre-1.0 plugin).
 * The 01-09 use-client.test.ts build-output grep test is the
 * real acceptance gate — this script just provides the mechanism.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, copyFileSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = join(__dirname, '..');
const SRC_STYLES = join(PKG_ROOT, 'src');
const DIST = join(PKG_ROOT, 'dist');

// ─── 1. Copy all *.css from src/** into dist/** ───────────────────────────────

function copyCss(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      copyCss(full);
    } else if (entry.endsWith('.css')) {
      const rel = relative(SRC_STYLES, full);
      const dest = join(DIST, rel);
      mkdirSync(dirname(dest), { recursive: true });
      copyFileSync(full, dest);
    }
  }
}

copyCss(SRC_STYLES);
console.log('post-build: copied src/**/*.css → dist/');

// ─── 2. Prepend "use client" to interactive theme entries ────────────────────

const CLIENT_DIRECTIVE = '"use client";\n';

/**
 * Entries that MUST carry the client boundary directive.
 * These are interactive (use hooks/React context).
 * Server-safe entries (GlassSurface, tokens) must NOT have it.
 */
const CLIENT_ENTRIES = [
  join(DIST, 'theme', 'index.js'),
];

for (const entry of CLIENT_ENTRIES) {
  if (!existsSync(entry)) {
    console.warn(`post-build: skipping directive — not yet built: ${relative(PKG_ROOT, entry)}`);
    continue;
  }
  const content = readFileSync(entry, 'utf8');
  if (content.startsWith('"use client"') || content.startsWith("'use client'")) {
    // Already present (esbuild preserved it natively) — skip.
    console.log(`post-build: directive already present in ${relative(PKG_ROOT, entry)}`);
  } else {
    writeFileSync(entry, CLIENT_DIRECTIVE + content, 'utf8');
    console.log(`post-build: prepended "use client" → ${relative(PKG_ROOT, entry)}`);
  }
}

console.log('post-build: done');
