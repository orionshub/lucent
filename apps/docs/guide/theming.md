# Theming & Runtime Controls

Lucent's theming is pure CSS cascade. Values live in React context (via `LucentProvider`), but
**propagation** is a set of `:root` attributes and CSS custom properties — so changing a theme axis
repaints every surface instantly with **no React re-render**.

## The four runtime axes

| Axis | Values | Mechanism |
| --- | --- | --- |
| Theme | `dark` (default), `light` | `data-theme` on `:root` |
| Accent | `cyan` (default), `violet`, `teal` | `data-accent` on `:root` |
| Density | `airy` (default), `balanced`, `compact` | `data-density` on `:root` |
| Glass | opacity `0.60–1.0`, blur `0–24px` | `--lucent-glass-opacity` / `--lucent-glass-blur` |

Plus a **contrast** axis (`default` / `solid`) for a fully opaque, high-contrast rendering — see
[Transparency & Solid Mode](/guide/transparency).

## The prebuilt panel

`<ThemePanel>` exposes every axis with no wiring. Import its styles and drop it in:

```tsx
import { LucentProvider, ThemePanel } from '@lucent/react'
import '@lucent/react/styles.css'
import '@lucent/react/theme.css'

export function Settings() {
  return (
    <LucentProvider>
      <ThemePanel />
    </LucentProvider>
  )
}
```

<Demo name="theme-panel-basic" title="Live ThemePanel" />

## Imperative setters

Build your own controls with the guarded setters. They are SSR-safe (no-op without `document`),
clamp/validate their input, and write a single CSS var or attribute — never triggering a re-render:

```ts
import {
  setTheme,
  setAccent,
  setDensity,
  setGlassOpacity,
  setGlassBlur,
  setContrast,
} from '@lucent/react/theme'

setTheme('light')          // 'dark' | 'light'
setAccent('violet')        // 'cyan' | 'violet' | 'teal'
setDensity('compact')      // 'airy' | 'balanced' | 'compact'
setGlassOpacity(0.85)      // clamped to 0.60–1.0
setGlassBlur(8)            // clamped to 0–24 px
setContrast('solid')       // 'default' | 'solid'
```

> Unknown enum values are silently rejected — a mitigation against `localStorage` injection when you
> persist and replay a stored theme.

## Reading the current axes

Inside a `LucentProvider`, `useLucent()` returns the current axis values:

```tsx
import { useLucent } from '@lucent/react'

function Readout() {
  const { theme, accent, density, glassOpacity, glassBlur, contrast } = useLucent()
  return <pre>{JSON.stringify({ theme, accent, glassOpacity }, null, 2)}</pre>
}
```

<Demo name="lucent-provider-basic" title="useLucent readout" />

## Token overrides

Tokens are two-tier: **primitive** (raw palette) → **semantic** (role-based). Override either tier
with your own CSS custom properties scoped to `:root` or a subtree:

```css
:root {
  --lucent-accent: 265 90% 66%; /* your brand accent (HSL channels) */
}
```
