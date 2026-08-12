/**
 * gen-props.mjs — Auto-generate prop tables from the library's TypeScript source.
 *
 * Uses the TypeScript type checker to resolve every exported `*Props` interface /
 * type alias in packages/react/src to its apparent properties, then keeps only the
 * props whose declaration lives in the library source (inherited DOM/React/Radix
 * props from node_modules are dropped, keeping the table crisp). Because it works
 * off the resolved type, it correctly handles `extends`, `Omit<>`, intersections,
 * and discriminated unions (e.g. IconButton's aria-label/label union).
 *
 * JSDoc comments and `@default` tags become the description and default columns.
 * Output: .vitepress/data/props.json keyed by the component name (interface name
 * minus the trailing "Props"), rendered by the <PropsTable> Vue component.
 *
 * Chosen over react-docgen-typescript because it renders exact union types
 * (`'solid' | 'soft' | …`) instead of `enum`, and reliably captures compound
 * parts (Card.Header, Dialog.Content, …) declared via Object.assign namespaces.
 */
import ts from 'typescript'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve, relative } from 'node:path'
import { readdirSync, statSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const docsRoot = resolve(__dirname, '..')
const libRoot = resolve(docsRoot, '../../packages/react')
const srcRoot = join(libRoot, 'src')
const tsconfigPath = join(libRoot, 'tsconfig.json')
const outFile = join(docsRoot, '.vitepress/data/props.json')

function collect(dir, exts) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) out.push(...collect(full, exts))
    else if (
      exts.some((e) => entry.endsWith(e)) &&
      !entry.endsWith('.test.ts') &&
      !entry.endsWith('.test.tsx') &&
      !entry.includes('.stories.')
    )
      out.push(full)
  }
  return out
}

const files = existsSync(srcRoot) ? collect(srcRoot, ['.ts', '.tsx']) : []

const cfg = ts.readConfigFile(tsconfigPath, ts.sys.readFile).config ?? {}
const parsed = ts.parseJsonConfigFileContent(cfg, ts.sys, libRoot)
const program = ts.createProgram(files, { ...parsed.options, noEmit: true, skipLibCheck: true })
const checker = program.getTypeChecker()
const srcSet = new Set(files.map((f) => resolve(f)))

function clean(s) {
  let t = String(s).replace(/\s+/g, ' ').trim()
  if (t.length > 160) t = t.slice(0, 157) + '…'
  return t
}

function isExported(node) {
  const mods = ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined
  return mods?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) ?? false
}

/** A property symbol → prop row, or null if it's inherited/native (not our source). */
function symToProp(sym) {
  const name = sym.getName()
  if (name === 'key' || name === 'ref') return null
  const decl = sym.declarations?.[0]
  if (!decl) return null
  const file = decl.getSourceFile().fileName
  if (file.includes('node_modules')) return null
  if (!srcSet.has(resolve(file))) return null

  const t = checker.getTypeOfSymbolAtLocation(sym, decl)
  const typeStr = checker.typeToString(
    t,
    decl,
    ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope,
  )
  const optional = Boolean(sym.flags & ts.SymbolFlags.Optional)
  const description = clean(ts.displayPartsToString(sym.getDocumentationComment(checker)))
  let defaultValue = null
  for (const tag of sym.getJsDocTags()) {
    if (tag.name === 'default' || tag.name === 'defaultValue') {
      defaultValue = clean(ts.displayPartsToString(tag.text ?? []))
    }
  }
  return { name, type: clean(typeStr), required: !optional, defaultValue, description }
}

/** Resolve props of a type, unioning across discriminated-union constituents. */
function propsOfType(type) {
  const map = new Map()
  const add = (rows) => {
    for (const r of rows) if (r && !map.has(r.name)) map.set(r.name, r)
  }
  if (type.isUnion?.()) {
    for (const t of type.types) add(propsOfType(t))
  } else {
    add(type.getProperties().map(symToProp))
  }
  return [...map.values()]
}

const result = {}

for (const sf of program.getSourceFiles()) {
  if (!srcSet.has(resolve(sf.fileName))) continue
  ts.forEachChild(sf, (node) => {
    let name = null
    if (ts.isInterfaceDeclaration(node) && isExported(node)) name = node.name.text
    else if (ts.isTypeAliasDeclaration(node) && isExported(node)) name = node.name.text
    if (!name || !name.endsWith('Props')) return

    const sym = node.name && checker.getSymbolAtLocation(node.name)
    if (!sym) return
    const type = checker.getDeclaredTypeOfSymbol(sym)
    const props = propsOfType(type).sort((a, b) => {
      if (a.required !== b.required) return a.required ? -1 : 1
      return a.name.localeCompare(b.name)
    })

    const key = name.replace(/Props$/, '')
    if (!result[key] || result[key].props.length < props.length) {
      result[key] = { displayName: key, description: '', props }
    }
  })
}

mkdirSync(dirname(outFile), { recursive: true })
writeFileSync(outFile, JSON.stringify(result, null, 2) + '\n', 'utf8')
console.log(
  `[gen-props] wrote ${Object.keys(result).length} component prop sets → ${relative(
    docsRoot,
    outFile,
  )}`,
)
