#!/usr/bin/env node
/**
 * generate.mjs — Builds the `glassui` alias package.
 *
 * `glassui` is a thin, published mirror of `@orionshub/lucent`. It ships no real
 * code — every entry re-exports the identically-named subpath of the target so
 * that `import { Button } from 'glassui'` and `import '@orionshub/lucent'` are
 * byte-for-byte the same API. The consumer's bundler dedupes the single real
 * copy of the library.
 *
 * This script reads the target package's `exports` map and generates:
 *   • dist/<name>.js  + dist/<name>.d.ts   for every JS subpath  (re-export stub)
 *   • dist/<name>.css                       for every CSS subpath (@import wrapper)
 * then writes the matching `exports` map back into this package's package.json.
 *
 * Run it whenever @orionshub/lucent's exports change:  pnpm --filter glassui build
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const GLASSUI_ROOT = join(__dirname, '..');
const TARGET_PKG = join(GLASSUI_ROOT, '..', 'react', 'package.json');
const SELF_PKG = join(GLASSUI_ROOT, 'package.json');
const DIST = join(GLASSUI_ROOT, 'dist');

const TARGET = '@orionshub/lucent';

const target = JSON.parse(readFileSync(TARGET_PKG, 'utf8'));
const self = JSON.parse(readFileSync(SELF_PKG, 'utf8'));

// Fresh dist every run.
rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

/** @type {Record<string, unknown>} */
const exportsMap = {};
let jsCount = 0;
let cssCount = 0;

for (const [key, value] of Object.entries(target.exports)) {
  if (key === './package.json') {
    exportsMap[key] = './package.json';
    continue;
  }

  // Specifier on the target that this alias entry forwards to.
  const targetSpecifier = key === '.' ? TARGET : `${TARGET}${key.slice(1)}`;
  // Flat base filename (all target subpaths are single-segment).
  const base = key === '.' ? 'index' : key.slice(2);

  if (value && typeof value === 'object' && 'import' in value) {
    // JS entry — re-export every named binding (library is named-export only).
    const jsFile = `${base}.js`;
    const dtsFile = `${base}.d.ts`;
    const body = `export * from '${targetSpecifier}';\n`;
    writeFileSync(join(DIST, jsFile), body);
    writeFileSync(join(DIST, dtsFile), body);
    exportsMap[key] = {
      types: `./dist/${dtsFile}`,
      import: `./dist/${jsFile}`,
    };
    jsCount++;
  } else if (typeof value === 'string') {
    // CSS / preset entry — forward via a bare-specifier @import.
    const cssFile = base.endsWith('.css') ? base : `${base}.css`;
    writeFileSync(join(DIST, cssFile), `@import '${targetSpecifier}';\n`);
    exportsMap[key] = `./dist/${cssFile}`;
    cssCount++;
  }
}

self.exports = exportsMap;
writeFileSync(SELF_PKG, `${JSON.stringify(self, null, 2)}\n`);

console.log(
  `glassui: generated ${jsCount} JS + ${cssCount} CSS entries (${Object.keys(exportsMap).length} total) mirroring ${TARGET}`,
);
