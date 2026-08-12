/**
 * tree-shake.prod.mjs — Production tree-shake fixture for the DOCS-03 publish gate.
 *
 * Unlike the smoke fixture (which only checks a single subpath entry's size), this
 * bundles a real single-component import via the per-component SUBPATH export — the
 * guaranteed-pruning entry point — and proves unrelated components are excluded:
 *
 *   1. Bundle `import { Button } from '@orionshub/lucent/button'` with esbuild.
 *   2. Bundle the whole root barrel (`import * as Lucent`) for comparison.
 *   3. Assert the subpath bundle is a small fraction of the full barrel.
 *   4. Assert unrelated components' class-name strings (which survive minification)
 *      do NOT leak into the subpath bundle.
 *   5. Assert Button's own class string IS present.
 *
 * Note: the root barrel intentionally does NOT prune perfectly under esbuild —
 * compound components use `Object.assign` namespaces (top-level side effects the
 * bundler must keep). This is the documented reason the package ships per-component
 * subpath exports; those are the guaranteed-tree-shakeable path this fixture gates.
 *
 * React / react-dom / radix-ui are marked external (consumer-provided).
 *
 * Run after `pnpm build`:
 *   node test/tree-shake.prod.mjs
 */
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'
import * as esbuild from 'esbuild'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkg = resolve(__dirname, '..')
const external = ['react', 'react-dom', 'react/jsx-runtime', 'react-dom/client', 'radix-ui']

if (!existsSync(resolve(pkg, 'dist/index.js'))) {
  console.error('FAIL: dist/index.js not found. Run `pnpm build` first.')
  process.exit(1)
}

async function bundle(importStmt) {
  const out = await esbuild.build({
    stdin: {
      contents: `${importStmt}\nglobalThis.__keep = __keep\n`,
      resolveDir: pkg,
      loader: 'js',
    },
    bundle: true,
    format: 'esm',
    minify: true,
    write: false,
    external,
    logLevel: 'silent',
  })
  return out.outputFiles[0].text
}

let failed = false
function assert(cond, msg) {
  if (cond) {
    console.log('OK: ' + msg)
  } else {
    console.error('FAIL: ' + msg)
    failed = true
  }
}

const buttonBundle = await bundle(
  `import { Button as __keep } from './dist/primitives/Button/index.js'`,
)
const fullBundle = await bundle(`import * as __keep from './dist/index.js'`)

const btnKB = (buttonBundle.length / 1024).toFixed(1)
const fullKB = (fullBundle.length / 1024).toFixed(1)
const ratio = buttonBundle.length / fullBundle.length

console.log(`Button subpath bundle: ${btnKB} KB · full barrel: ${fullKB} KB · ratio: ${(ratio * 100).toFixed(1)}%`)

assert(ratio < 0.3, `single-component subpath import prunes the barrel (ratio ${(ratio * 100).toFixed(1)}% < 30%)`)
assert(buttonBundle.includes('lucent-btn'), `Button's own styles are present ('lucent-btn')`)

// Unrelated components — assert their class strings do not leak. Self-calibrating:
// only enforced for markers that actually appear in the full barrel.
const markers = ['lucent-dialog', 'lucent-toast', 'lucent-select', 'lucent-accordion', 'lucent-tooltip']
for (const m of markers) {
  if (fullBundle.includes(m)) {
    assert(!buttonBundle.includes(m), `unrelated component pruned ('${m}' absent from Button bundle)`)
  }
}

if (failed) {
  console.error('\nTree-shake production fixture FAILED.')
  process.exit(1)
}
console.log('\nTree-shake production fixture PASSED.')
