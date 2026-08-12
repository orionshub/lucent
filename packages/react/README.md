# Lucent

**A complete, beautiful glassmorphic React component library that stays truly lightweight — with runtime-adjustable transparency for accessibility.**

[![npm](https://img.shields.io/npm/v/@orionshub/lucent)](https://www.npmjs.com/package/@orionshub/lucent)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

**[Documentation & live component playground → orionshub.github.io/lucent](https://orionshub.github.io/lucent/)**

---

## Why Lucent

- **Runtime-adjustable transparency.** Glass opacity is a CSS custom property (`--lucent-glass-opacity`), not a fixed style. Dial it at runtime for accessibility with `setGlassOpacity()` — no React re-render.
- **Zero style runtime.** Components emit stable class names and read design tokens from CSS custom properties. All theming ships as a compiled `styles.css`. No CSS-in-JS.
- **Per-component tree-shaking.** Import from the root barrel for DX, or from a subpath (`@orionshub/lucent/button`) for guaranteed pruning. `sideEffects: ["**/*.css"]` keeps CSS intact.
- **Accessible by default.** Interactive components are built on [Radix UI](https://www.radix-ui.com/) primitives, with a WCAG contrast floor, a solid/high-contrast mode, `prefers-reduced-motion` support, and full RTL via CSS logical properties.
- **SSR / Next.js safe.** Preserved `"use client"` boundaries and a server-safe no-flash script.

## Install

```bash
pnpm add @orionshub/lucent
# peers: react, react-dom (18 or 19)
```

## Usage

```tsx
import { Button } from '@orionshub/lucent'
import '@orionshub/lucent/styles.css' // once, at your app root

export function App() {
  return <Button variant="solid">Hello Lucent</Button>
}
```

### Runtime theming

```tsx
import { LucentProvider, ThemePanel } from '@orionshub/lucent'
import '@orionshub/lucent/styles.css'
import '@orionshub/lucent/theme.css'

export function Settings() {
  return (
    <LucentProvider>
      <ThemePanel />
    </LucentProvider>
  )
}
```

Or drive the axes imperatively (SSR-safe, no re-render):

```ts
import {
  setTheme,       // 'dark' | 'light'
  setAccent,      // 'cyan' | 'violet' | 'teal'
  setDensity,     // 'airy' | 'balanced' | 'compact'
  setGlassOpacity, // 0.60–1.0
  setGlassBlur,   // 0–24px
  setContrast,    // 'default' | 'solid'
} from '@orionshub/lucent/theme'
```

### SSR / Next.js

Import server-safe components via their subpaths in Server Components, and inject the no-flash script from the server-safe entry:

```tsx
// app/layout.tsx
import { noFlashScript } from '@orionshub/lucent/no-flash'
import '@orionshub/lucent/styles.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><script dangerouslySetInnerHTML={{ __html: noFlashScript }} /></head>
      <body>{children}</body>
    </html>
  )
}
```

## Components

45 primitives + utilities across primitives, form controls, layout, data display, overlays, and feedback — each with a live example, an auto-generated prop table, and notes on CSS import, portal theming, transparency, reduced motion, RTL, and SSR. See the [full reference](https://orionshub.github.io/lucent/components/).

## License

[MIT](./LICENSE) © Shashank Sharma ([@geekyorion](https://github.com/geekyorion))
