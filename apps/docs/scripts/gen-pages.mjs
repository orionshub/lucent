/**
 * gen-pages.mjs — Generate the component reference pages, the components index,
 * the generated sidebar, and the runtime example registry from components.data.mjs.
 *
 * Resilient by design: an example is only wired up (live demo + source block +
 * registry entry) when its source file AND its region marker both exist. Missing
 * examples degrade to a note instead of breaking the build — so pages can be
 * authored incrementally.
 *
 * Example wiring convention:
 *   example id "button-variants"  →  group file examples/groups/primitives.tsx
 *                                  →  named export ButtonVariants
 *                                  →  region  // #region button-variants ... // #endregion
 */
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { COMPONENTS, GROUPS } from '../components.data.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const docsRoot = resolve(__dirname, '..')
const groupsDir = join(docsRoot, 'examples/groups')
const outDir = join(docsRoot, 'components')
const registryFile = join(docsRoot, 'examples/registry.ts')
const sidebarFile = join(docsRoot, '.vitepress/components.sidebar.json')

mkdirSync(outDir, { recursive: true })

const groupSlug = (g) => g.toLowerCase().replace(/\s+/g, '-')

const fileCache = new Map()
function readGroup(group) {
  const gs = groupSlug(group)
  if (fileCache.has(gs)) return fileCache.get(gs)
  const p = join(groupsDir, `${gs}.tsx`)
  const content = existsSync(p) ? readFileSync(p, 'utf8') : null
  fileCache.set(gs, content)
  return content
}

function pascal(id) {
  return id
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

/** Extract a `// #region id ... // #endregion` block, dedented. */
function extractRegion(source, id) {
  if (!source) return null
  const lines = source.split(/\r?\n/)
  const startRe = new RegExp(`//\\s*#region\\s+${id}\\b`)
  const endRe = /\/\/\s*#endregion/
  let start = -1
  for (let i = 0; i < lines.length; i++) {
    if (startRe.test(lines[i])) {
      start = i + 1
      break
    }
  }
  if (start === -1) return null
  let end = lines.length
  for (let i = start; i < lines.length; i++) {
    if (endRe.test(lines[i])) {
      end = i
      break
    }
  }
  const block = lines.slice(start, end)
  const indents = block
    .filter((l) => l.trim().length)
    .map((l) => l.match(/^\s*/)[0].length)
  const min = indents.length ? Math.min(...indents) : 0
  return block.map((l) => l.slice(min)).join('\n').trim()
}

const md = (s) => s.replace(/</g, '&lt;').replace(/>/g, '&gt;')

const registryEntries = []
const warnings = []

for (const c of COMPONENTS) {
  const source = readGroup(c.group)
  const examples = []
  for (const ex of c.examples ?? []) {
    const region = extractRegion(source, ex.id)
    if (source && region) {
      examples.push({ ...ex, source: region })
      registryEntries.push(
        `  '${ex.id}': () => import('./groups/${groupSlug(c.group)}').then((m) => ({ default: m.${pascal(
          ex.id,
        )} })),`,
      )
    } else {
      warnings.push(`${c.slug}: example "${ex.id}" has no source/region — degraded to note`)
      examples.push({ ...ex, source: null })
    }
  }
  writeFileSync(join(outDir, `${c.slug}.md`), renderPage(c, examples), 'utf8')
}

// ─── Component page ─────────────────────────────────────────────────────────
function renderPage(c, examples) {
  const ssrLine = c.serverSafe
    ? 'Server-safe — renders on the server without a client bundle.'
    : 'Client component — ships a `"use client"` boundary.'

  const importNames = c.exports
  const lines = []
  lines.push('---')
  lines.push(`title: ${c.title}`)
  lines.push('outline: [2, 3]')
  lines.push('---')
  lines.push('')
  lines.push(`# ${c.title}`)
  lines.push('')
  lines.push(c.blurb)
  lines.push('')
  lines.push(`**Group:** ${c.group} · **Import path:** \`@lucent/react${c.subpath.slice(1)}\` · ${ssrLine}`)
  lines.push('')

  // Import
  lines.push('## Import')
  lines.push('')
  lines.push('```tsx')
  lines.push(`import { ${importNames} } from '@lucent/react'`)
  lines.push("import '@lucent/react/styles.css' // once, at your app root")
  lines.push('```')
  lines.push('')

  // Examples
  if (examples.length) {
    lines.push('## Examples')
    lines.push('')
    for (const ex of examples) {
      lines.push(`### ${ex.title ?? 'Example'}`)
      lines.push('')
      if (ex.source) {
        lines.push(`<Demo name="${ex.id}" title="${ex.title ?? ''}" />`)
        lines.push('')
        lines.push('::: details Show source')
        lines.push('```tsx')
        lines.push(ex.source)
        lines.push('```')
        lines.push(':::')
      } else {
        lines.push('::: info Example pending')
        lines.push('The live example for this component is being finalized.')
        lines.push(':::')
      }
      lines.push('')
    }
  }

  // Props
  lines.push('## Props')
  lines.push('')
  const propNames = c.propNames ?? [c.title.replace(/\s+/g, '')]
  if (propNames.length > 1) {
    for (const p of propNames) {
      lines.push(`### ${p}`)
      lines.push('')
      lines.push(`<PropsTable name="${p}" />`)
      lines.push('')
    }
  } else {
    lines.push(`<PropsTable name="${propNames[0]}" />`)
    lines.push('')
  }

  // Guidance — the six required notes
  lines.push('## Guidance')
  lines.push('')
  lines.push('::: tip One-time CSS import')
  lines.push(
    "Import the compiled stylesheet **once** at your app root: `import '@lucent/react/styles.css'`. " +
      'Components ship stable class names and read design tokens from CSS custom properties — there is no style runtime. ' +
      'See [CSS Import](/guide/css-import).',
  )
  lines.push(':::')
  lines.push('')
  lines.push('::: tip Transparency & solid mode')
  lines.push(
    'Every glass surface reads `--lucent-glass-opacity` (0.60–1.0). Dial it at runtime with `setGlassOpacity()`, ' +
      'or switch to `setContrast(\'solid\')` for a fully opaque, high-contrast rendering. ' +
      'See [Transparency & Solid Mode](/guide/transparency).',
  )
  lines.push(':::')
  lines.push('')
  if (c.portalled) {
    lines.push('::: warning Portal theming')
    lines.push(
      'This component renders through a portal to `document.body`. Because theme tokens are scoped to `:root`, ' +
        'portalled content stays themed automatically — do **not** nest it inside a transformed/`backdrop-filter` ' +
        'ancestor if you portal it manually. See [Portal Theming](/guide/portal-theming).',
    )
    lines.push(':::')
    lines.push('')
  }
  if (c.motion) {
    lines.push('::: info Reduced motion')
    lines.push(
      'Animations are CSS-only and disabled under `@media (prefers-reduced-motion: reduce)`. ' +
        'See [Reduced Motion](/guide/reduced-motion).',
    )
    lines.push(':::')
    lines.push('')
  }
  lines.push('::: info RTL')
  lines.push(
    'Authored with CSS logical properties — set `dir="rtl"` on a parent (or the document) and layout mirrors ' +
      'with no JS. Toggle RTL from the glass-controls panel to preview. See [RTL Support](/guide/rtl).',
  )
  lines.push(':::')
  lines.push('')
  lines.push(`::: info SSR / Next.js`)
  lines.push(
    `${ssrLine} All components are safe to import in a Server Component tree; interactive ones carry their own ` +
      '`"use client"` boundary. See [SSR & Next.js](/guide/ssr).',
  )
  lines.push(':::')
  lines.push('')

  return lines.join('\n')
}

// ─── Registry ───────────────────────────────────────────────────────────────
const registrySource = `/**
 * registry.ts — GENERATED by scripts/gen-pages.mjs. Do not edit by hand.
 *
 * Maps each live-example id to a lazy loader resolving to its React component.
 * Consumed by the <ReactIsland> Vue wrapper to mount examples client-side.
 */
import type { ComponentType } from 'react'

type Loader = () => Promise<{ default: ComponentType }>

export const examples: Record<string, Loader> = {
${registryEntries.join('\n')}
}
`
writeFileSync(registryFile, registrySource, 'utf8')

// ─── Sidebar + index ────────────────────────────────────────────────────────
const sidebar = []
for (const group of GROUPS) {
  const items = COMPONENTS.filter((c) => c.group === group).map((c) => ({
    text: c.title,
    link: `/components/${c.slug}`,
  }))
  if (items.length) sidebar.push({ text: group, collapsed: false, items })
}
writeFileSync(sidebarFile, JSON.stringify(sidebar, null, 2) + '\n', 'utf8')

// components/index.md
const idxLines = ['---', 'title: Components', '---', '', '# Components', '']
idxLines.push(
  `All ${COMPONENTS.length} exported components, grouped by category. Every page ships a live, ` +
    'runtime-controllable example, an auto-generated prop table, and notes on CSS import, portal ' +
    'theming, transparency, reduced motion, RTL, and SSR.',
)
idxLines.push('')
for (const group of GROUPS) {
  const inGroup = COMPONENTS.filter((c) => c.group === group)
  if (!inGroup.length) continue
  idxLines.push(`## ${group}`)
  idxLines.push('')
  for (const c of inGroup) {
    idxLines.push(`- [${c.title}](/components/${c.slug}) — ${md(c.blurb)}`)
  }
  idxLines.push('')
}
writeFileSync(join(outDir, 'index.md'), idxLines.join('\n'), 'utf8')

console.log(
  `[gen-pages] wrote ${COMPONENTS.length} pages, ${registryEntries.length} wired examples, sidebar (${sidebar.length} groups).`,
)
if (warnings.length) {
  console.log(`[gen-pages] ${warnings.length} example(s) pending:`)
  for (const w of warnings) console.log('  - ' + w)
}
