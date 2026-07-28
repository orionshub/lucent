<!-- GSD:project-start source:PROJECT.md -->

## Project

**Lucent**

Lucent is a React component library with a minimal, glassmorphic, futuristic aesthetic. It aims to ship a complete set of components — from primitives to complex ones like stepper, table, portal, loader, toast, date picker, and command palette — while staying extremely lightweight. It is built for developers who want a polished, modern, glass-styled UI toolkit that respects accessibility, including a first-class runtime control over glass transparency.

**Core Value:** A complete, beautiful glassmorphic component set that stays truly lightweight and lets users dial transparency at runtime for accessibility — polish without weight.

### Constraints

- **Tech stack**: React + TypeScript — the target consumer framework for this milestone.
- **Behavior/a11y**: Radix UI primitives power interactive/complex components — chosen for accessibility over a fully in-house build.
- **Styling**: CSS custom properties / design tokens as the source of truth; compiled CSS shipped; Tailwind offered only as an optional preset (never a runtime dependency).
- **Transparency**: Glass opacity must be a runtime-adjustable token for accessibility, not a fixed style.
- **Motion**: CSS-only animations/transitions; must honor `prefers-reduced-motion`.
- **Theme**: Dark-mode-first with a light theme; token overrides supported.
- **Packaging**: Tree-shakeable ESM with per-component exports so consumers only pay for what they import.
- **Compatibility**: SSR / Next.js safe; RTL via CSS logical properties.
- **Docs**: VitePress with live interactive examples (not Storybook).
- **Weight**: "Super light" — minimize/avoid runtime dependencies throughout.

<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->

## Technology Stack

## TL;DR (prescriptive picks)

| Concern | Pick | One-line rationale |
|---------|------|--------------------|
| Bundler | **tsdown 0.22.x** (rolldown) — tsup 8.5.x as the mature fallback | Multi-entry per-component ESM + native `.d.ts` + preserves `"use client"`, Vite-team endorsed |
| Token pipeline | **Style Dictionary 5.5** | One source → CSS custom props **+** TS token types **+** Tailwind v4 preset (DRY); plain CSS vars if you want zero build step |
| Behavior primitives | **`radix-ui` 1.6.x** (unified pkg) as a **dependency**, kept **external** | Single version, `sideEffects:false`, tree-shakeable; one shared copy in consumer apps |
| Styling delivery | **Compiled global `styles.css`** referencing CSS custom properties; **no runtime CSS-in-JS** | Zero style runtime; runtime glass opacity = one CSS var set on `:root` |
| Testing | **Vitest 4.1 + Testing Library 16.3 + jest-dom 7 + happy-dom 20** | Vite-native, fast, SSR/node-env test lane for import-safety |
| a11y testing | **axe-core 4.12** via a tiny Vitest matcher (not `vitest-axe`, which is stale) | Current engine; `vitest-axe` last shipped 2022 |
| Packaging QA | **publint 0.3.x + @arethetypeswrong/cli 0.18.x** | Gate exports map / dual-format / types-resolution before publish |
| Release | **Changesets 2.31.x** | Standard for versioned library publishing + changelog |
| Docs | **VitePress 1.6.x** + `@vitejs/plugin-react` **v4** + a Vue→React mount wrapper | Vite-native SSG; React demos mounted client-only (also proves SSR-safety) |
| TypeScript | **5.9.x baseline** (TS 7 native compiler is GA — adopt with dts-plugin verification) | Maximum tooling/dts-plugin compatibility today |
| Package manager | **pnpm 10** | Strict, fast, best for lib + docs workspace |

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| React | **19.2.8** (peer `^18.0 \|\| ^19.0`) | Target consumer runtime | React 19 stabilized `use`/Actions and RSC directives; support 18 too — Radix already spans 16.8→19 |
| TypeScript | **5.9.x** (7.0.2 native is GA) | Types + `.d.ts` authoring | 5.9 has the widest compat with `rollup-plugin-dts`/bundler dts pipelines; TS 7 (`tsgo`) is production-GA but verify your dts plugin before switching |
| tsdown | **0.22.14** | Library bundler (ESM/CJS + dts) | Rolldown-powered successor to tsup: native multi-entry, native `.d.ts`, `publint` hook, **preserves `"use client"`** directives — critical for Next.js. Pre-1.0 but Vite-team stewarded |
| Style Dictionary | **5.5.0** | Design-token compiler | Single token source → CSS custom properties, a typed TS token map, and the optional Tailwind preset — keeps the "one source of truth" promise (Node ≥22) |
| radix-ui | **1.6.7** | Accessible behavior for interactive/complex components | Unified package re-exports every primitive, `sideEffects:false`, tree-shakeable; one version to track instead of ~40 `@radix-ui/react-*` deps |
| Vitest | **4.1.10** | Unit/interaction test runner | Shares Vite transform pipeline (peer Vite `^6\|^7\|^8`), fast, first-class ESM + TS + jsdom/happy-dom |
| VitePress | **1.6.4** | Docs + marketing site (SSG) | Vite-native, light, doubles as public site; runs on Vite 5.4 (see compat note) |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@vitejs/plugin-react` | **6.0.4** (lib/tests) / **^4.3.x** (VitePress) | React transform / Fast Refresh | v6 needs Vite 8 (library + Vitest). VitePress is on Vite 5 → use **v4** there. Do not mix |
| `@testing-library/react` | **16.3.2** | Render + query components in tests | All component tests |
| `@testing-library/jest-dom` | **7.0.0** | DOM matchers (`toBeVisible`, etc.) | Import `/vitest` entry in test setup |
| happy-dom | **20.11.1** | Fast DOM env for Vitest | Default browser-like env; use jsdom only if a specific API is missing |
| axe-core | **4.12.x** | Accessibility rule engine | Wrap in a 10-line `toHaveNoViolations` Vitest matcher (see a11y note) |
| Tailwind CSS | **v4.x** (optional peer) | Optional consumer preset | Only for the opt-in preset — never a runtime/build dep of Lucent itself |
| `@types/react` / `@types/react-dom` | **19.2.x** | React types | Dev + peer-optional |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| **publint** 0.3.22 | Validate package publish correctness | Run in CI + `prepublishOnly`; catches broken `exports`/`sideEffects` |
| **@arethetypeswrong/cli** 0.18.5 (`attw`) | Verify types resolve under every `exports` condition | Gate on `--pack`; prevents "types not found" for ESM/CJS/`node16` consumers |
| **Changesets** 2.31.1 | Versioning + changelog + publish | Standard release flow; supports single-package repos |
| **pnpm** 10.x | Package manager | Strict node_modules, fast, ideal for lib+docs workspace |
| **ESLint 9 (flat) + typescript-eslint** | Linting | Keep config minimal; Biome is a lighter all-in-one alternative if you prefer speed |
| **size-limit** (optional) | Per-entry bundle budgets | Enforce the "super light" constraint in CI per component export |

## Installation

# Package manager

# Peer deps (consumers provide React; keep them as devDeps here)

# Runtime dependency (kept EXTERNAL in the bundle, shared by consumers)

# Build + tokens

# Testing

# Packaging QA + release

# Docs (separate workspace — Vite 5 world)

## How to configure per-component tree-shaking (the core mechanic)

- `sideEffects: ["**/*.css"]` is the single most important line: it tells consumer bundlers every `.js` is prunable **but** never drop CSS side-effect imports. (If you ship **one** global stylesheet the consumer imports manually, you may even use `"sideEffects": false` and document the `import '@lucent/react/styles.css'` step.)
- Provide a **root barrel** (`.`) for DX **and** per-component subpath exports for maximal pruning — modern bundlers tree-shake the barrel, but subpaths guarantee it and help non-bundler/Node consumers.
- Keep `require`/CJS only if you must support legacy toolchains; ESM-only is lighter and Next.js/Vite handle it fine.

## How to ship Radix + design-token CSS while staying tiny

- **Radix = `dependency`, kept `external`.** Do **not** inline Radix into your bundle. Mark `radix-ui`/`@radix-ui/*` external so the consumer's app installs and dedupes a single copy. Use the **unified `radix-ui`** package (one version) rather than dozens of `@radix-ui/react-*` deps. Its `sideEffects:false` means unused primitives tree-shake away.
- **Zero style runtime.** No emotion/stitches/CSS-in-JS. Components emit stable class names and consume CSS custom properties. All theming lives in a compiled `styles.css`.
- **Design tokens → CSS custom properties via Style Dictionary.** Author tokens once (JSON), compile to:
- **Runtime-adjustable glass transparency = one CSS variable.** e.g. `--lucent-glass-opacity`. Because it's a CSS custom property, `document.documentElement.style.setProperty('--lucent-glass-opacity', v)` (or a tiny `<GlassProvider>` that sets it) re-skins every surface with **no React re-render and no JS in the style path** — the ideal accessibility knob.
- **Motion:** pure CSS `@keyframes`/transitions gated by `@media (prefers-reduced-motion: reduce)`. No animation runtime dependency.
- **RTL:** author with CSS logical properties (`margin-inline`, `inset-inline-start`, `padding-block`) so `dir="rtl"` works with zero JS.

## How to run live React examples inside VitePress

- If you later need bidirectional Vue↔React interop, `veaury` is the escape hatch — but the manual wrapper keeps dependencies minimal, matching the "super light" ethos.
- **VitePress 2** (Vite 6+/Vue-agnostic direction) is in development; when it ships, the plugin-react version constraint changes — revisit then.

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| **tsdown** (rolldown) | **tsup 8.5.1** (esbuild) | Prefer tsup if you want the most battle-tested option today and don't mind that dts comes from a separate rollup pass and `"use client"` preservation needs manual care. Both are valid; tsup is the "boring, proven" choice |
| **tsdown** | **Vite library mode** | Choose Vite lib mode only if the package is app-adjacent with few entries; it's awkward for many per-component entries + dts (needs `vite-plugin-dts`) — more config for our multi-entry goal |
| **tsdown** | **unbuild 3.6.1** | If you're already in the UnJS ecosystem and like `build.config.ts` + stub mode; solid, but tsdown/rolldown is the more active React-lib path |
| **Style Dictionary** | **Plain hand-authored CSS custom properties** | If the token set stays small and you don't need the TS map or generated Tailwind preset — zero build step is the lightest possible option. Adopt Style Dictionary once tokens multiply or must exist in JS + Tailwind too |
| **Unified `radix-ui`** | **Individual `@radix-ui/react-*`** | Individual packages only if you must pin/patch a single primitive independently; costs you version-drift management across many deps |
| **happy-dom** | **jsdom 27** | Switch to jsdom for a specific API happy-dom hasn't implemented; otherwise happy-dom is faster |
| **axe-core + tiny matcher** | **jest-axe 11 matchers** | You can reuse `jest-axe`'s `toHaveNoViolations` via `expect.extend` under Vitest; fine, just adds a jest-flavored dep |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Runtime CSS-in-JS (emotion, styled-components, stitches) | Ships a style runtime + hurts SSR/streaming; violates "super light" and the compiled-CSS constraint | Compiled `styles.css` + CSS custom properties |
| Runtime Tailwind as a **dependency** | Forces consumers into Tailwind and adds build coupling | Ship Tailwind only as an **optional preset** (`./tailwind`) |
| `vitest-axe` (0.1.0, 2022) | Stale, pins old `axe-core`/`dom-accessibility-api` | `axe-core@4.12` + a tiny custom matcher (or `jest-axe@11`) |
| Storybook | Heavier tooling; explicitly out of scope | VitePress with live examples |
| A bundled icon set | Bloats every install | Icons-as-props (bring-your-own) |
| Inlining Radix into the bundle | Duplicates Radix in consumer apps, breaks dedupe/context | Keep `radix-ui` external as a dependency |
| esbuild-only dts / stripping directives | Drops `"use client"`, breaks Next.js Server Components | tsdown/rolldown (preserves directives) |
| Babel + Rollup hand-rolled config | Slow, high-maintenance in 2026 | tsdown/tsup zero-config multi-entry |
| Floating-UI/portal/focus-trap hand-rolls | Re-implements what Radix already solves accessibly | Radix primitives |

## Stack Patterns by Variant

- Skip Style Dictionary; hand-author `tokens.css` with CSS custom properties.
- Because a single CSS file with `:root`/`[data-theme]` needs no build step, and the runtime opacity knob is just one variable.
- Use Style Dictionary as the single source.
- Because generating CSS vars + a typed TS map + the Tailwind `@theme` preset from one file keeps them from drifting.
- Use tsup 8.5.1 instead of tsdown, and pin TypeScript 5.9.
- Because tsup is the most widely deployed lib bundler and 5.9 has the broadest dts-plugin support.
- Emit dual ESM+CJS from tsdown and keep `require` conditions in `exports`.
- Otherwise ship ESM-only for a smaller, simpler package.

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| VitePress 1.6.4 | Vite **5.4** | Docs Vite plugins must be Vite-5-compatible → use `@vitejs/plugin-react` **^4.3**, **not** v6 |
| `@vitejs/plugin-react` 6.0.4 | Vite **^8** | Use for the **library build + Vitest** (Vite 8), never inside VitePress |
| Vitest 4.1.10 | Vite `^6 \|\| ^7 \|\| ^8` | Keep the library/test Vite on 8; independent from the docs' Vite 5 |
| `radix-ui` 1.6.7 | React `16.8–19` | Peer spans old→new React; safe for an 18+19 support matrix |
| Style Dictionary 5.5.0 | Node **≥22** | Build-time only; doesn't affect consumer runtime |
| `@testing-library/jest-dom` 7.0.0 | `@testing-library/dom` `>=10 <11` | Import the `/vitest` sub-path in setup |
| TypeScript 7.0.2 (native `tsgo`) | Most tooling | GA, but verify your bundler's dts plugin (`rolldown-plugin-dts`/`rollup-plugin-dts`) before switching from 5.9 |
| React 19 `"use client"` | tsdown/rolldown | Directive preserved automatically; verify in build output |

## Confidence Assessment

| Recommendation | Confidence | Basis |
|----------------|------------|-------|
| All pinned versions | **HIGH** | Verified live against npm registry `latest` on 2026-07-28 |
| Radix unified pkg, external dependency, `sideEffects:["**/*.css"]`, exports map | **HIGH** | Established library-packaging practice; matches Radix/Vitest own `sideEffects:false` |
| Style Dictionary as token pipeline | **HIGH** | Directly serves the CSS-vars + TS + Tailwind-preset trifecta |
| tsdown as primary bundler (over tsup) | **MEDIUM** | tsdown is pre-1.0 (0.22.x); rolldown-backed + Vite-team endorsed, but tsup remains the safe, proven fallback |
| VitePress live-React pattern (Vue wrapper + plugin-react v4) | **MEDIUM** | No first-class official React-in-VitePress; wrapper approach is the common, dependency-light solution |
| axe-core + custom matcher over `vitest-axe` | **MEDIUM–HIGH** | `vitest-axe` is demonstrably stale (2022); axe-core 4.12 is current |
| TS 5.9 baseline vs TS 7 native | **MEDIUM** | TS 7 is GA but dts-plugin compat across the bundler ecosystem should be verified in an early phase |

## Sources

- npm registry `latest` tags (official, HIGH) — verified 2026-07-28: `tsdown@0.22.14`, `tsup@8.5.1`, `unbuild@3.6.1`, `style-dictionary@5.5.0`, `radix-ui@1.6.7`, `react@19.2.8`, `typescript@7.0.2`, `vite@8.1.5`, `@vitejs/plugin-react@6.0.4`, `vitest@4.1.10`, `@testing-library/react@16.3.2`, `@testing-library/jest-dom@7.0.0`, `happy-dom@20.11.1`, `vitepress@1.6.4`, `publint@0.3.22`, `@arethetypeswrong/cli@0.18.5`, `@changesets/cli@2.31.1`, `jest-axe@11.0.0`, `@axe-core/react@4.12.1`, `vitest-axe@0.1.0`.
- Package `dependencies`/`peerDependencies`/`engines`/`exports` fields inspected from the same registry payloads (established the Vite-5-vs-8 VitePress constraint, Radix React peer range, Style Dictionary Node ≥22, Radix `sideEffects:false`).
- Architecture/packaging recommendations: synthesis of current React-library best practice (ESM-first multi-entry, `sideEffects` CSS carve-out, external Radix, `"use client"` preservation) — MEDIUM–HIGH, to be confirmed during the foundation phase via `publint`/`attw`.

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.github/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
