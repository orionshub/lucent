---
"@lucent/react": minor
---

Initial public release of Lucent — a complete, lightweight glassmorphic React component set.

- **45 components + 4 utilities** across primitives, form controls, layout, data display, overlays, and feedback, plus the theming system (`LucentProvider`, `useLucent`, `ThemePanel`, imperative setters) and design tokens.
- **Runtime-adjustable glass transparency** via a single CSS custom property (`--lucent-glass-opacity`) — no React re-render — with a WCAG contrast floor and a solid/high-contrast mode.
- **Zero style runtime**: compiled `styles.css`, per-component subpath `exports`, `sideEffects: ["**/*.css"]`, and preserved `"use client"` boundaries.
- **New server-safe `@lucent/react/no-flash` export** so the SSR no-flash theme script can be injected from a Server Component without pulling the client theme barrel.
- Accessible behavior on Radix primitives, CSS-only motion gated by `prefers-reduced-motion`, and full RTL via CSS logical properties.
- Ships a VitePress documentation site with live, runtime-controllable examples and auto-generated prop tables, plus a publish gate (`publint` + `attw` + `size-limit` + production tree-shake fixture + Next.js App Router smoke build).

> Maintainer note: bump this changeset to `major` before release if you intend to publish `1.0.0` rather than `0.1.0`.
