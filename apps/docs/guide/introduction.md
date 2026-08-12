# Introduction

**Lucent** is a React component library with a minimal, glassmorphic, futuristic aesthetic. It ships
a complete set of components — from primitives to complex ones like Select, Table, Portal, Toast, and
overlays — while staying extremely lightweight.

## What makes it different

- **Runtime-adjustable transparency.** Glass opacity is a CSS custom property (`--lucent-glass-opacity`),
  not a fixed style. Dial it at runtime for accessibility with `setGlassOpacity()` — no React re-render.
- **Zero style runtime.** Components emit stable class names and read design tokens from CSS custom
  properties. All theming lives in a compiled `styles.css`. No emotion, no styled-components.
- **Per-component tree-shaking.** Import from the root barrel for DX, or from a subpath
  (`@orionshub/lucent/button`) for guaranteed pruning. `sideEffects: ["**/*.css"]` keeps CSS intact.
- **Accessible behavior.** Interactive components are built on [Radix UI](https://www.radix-ui.com/)
  primitives, kept external so consumers dedupe a single copy.
- **Dark-mode-first**, with a light theme, three accent presets, and three density scales — all
  runtime-swappable via `:root` attributes.
- **SSR / Next.js safe**, with preserved `"use client"` boundaries and RTL via CSS logical properties.

## The runtime controls

This documentation dogfoods the library's own runtime setters. Use the floating **Glass controls**
panel (bottom-right of every page) to change theme, accent, density, glass opacity, blur, RTL, and
solid/high-contrast mode — and watch every live example repaint instantly.

## Next steps

- [Installation](/guide/installation) — add Lucent to your app.
- [CSS Import](/guide/css-import) — the one-time stylesheet import.
- [Theming & Runtime Controls](/guide/theming) — the provider, the setters, and the token axes.
- [Components](/components/) — the full reference with live examples and prop tables.
