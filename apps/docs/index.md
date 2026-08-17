---
layout: home

hero:
  name: Lucent
  text: Glassmorphic React components
  tagline: A complete, beautiful component set that stays truly lightweight — with runtime-adjustable transparency for accessibility. Polish without weight.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/introduction
    - theme: alt
      text: Components
      link: /components/
    - theme: alt
      text: Theming
      link: /guide/theming

features:
  - icon: ◈
    title: Runtime transparency
    details: Dial glass opacity and blur at runtime through a single CSS variable — no React re-render. The accessibility knob is a first-class token.
  - icon: ⚡
    title: Truly lightweight
    details: Per-component tree-shakeable ESM, zero style runtime, no bundled icons or fonts. You only pay for what you import.
  - icon: ♿
    title: Accessible by default
    details: Radix-powered behavior, WCAG contrast floor, solid/high-contrast mode, prefers-reduced-motion, and full RTL via CSS logical properties.
  - icon: ▲
    title: SSR & Next.js safe
    details: Preserved "use client" boundaries and a client-only docs island prove Server Component safety end-to-end.
---

<div style="max-width: 760px; margin: 2.5rem auto 0; padding: 0.85rem 1.25rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0.5rem 0.9rem; text-align: center; border: 1px solid var(--vp-c-divider); border-radius: 14px; background: var(--vp-c-bg-soft);">
  <span style="font-size: 0.95rem;">📦 Also available as <code>vitreui</code> on npm — same library, shorter name.</span>
  <span style="opacity: .7;">
    <code>npm i vitreui</code>
    <span style="opacity:.5;"> · </span>
    <code>npm i @orionshub/lucent</code>
  </span>
</div>

<div style="max-width: 720px; margin: 2rem auto 0; text-align: center; opacity: .85;">

Every component page ships a **live example** you can reshape with the floating glass-controls
panel — switch theme, accent, density, drag the opacity/blur, flip RTL, or toggle solid mode — plus
an **auto-generated prop table** and notes on CSS import, portal theming, transparency, reduced
motion, RTL, and SSR.

</div>
