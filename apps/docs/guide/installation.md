# Installation

Lucent ships as ESM. React 18 or 19 is a peer dependency; [Radix UI](https://www.radix-ui.com/) is a
regular dependency kept external so your app dedupes a single copy.

::: tip Two names, one library
Lucent is published under two npm names — pick whichever you like:

- [`@orionshub/lucent`](https://www.npmjs.com/package/@orionshub/lucent) — the scoped package
- [`glassui`](https://www.npmjs.com/package/glassui) — a shorter, unscoped mirror

They share the same version and API. Every example below works with either — just swap the package
name in the import. This guide uses `@orionshub/lucent`.
:::

## Install

::: code-group

```bash [pnpm]
pnpm add @orionshub/lucent
# or the short name:
pnpm add glassui
```

```bash [npm]
npm install @orionshub/lucent
# or the short name:
npm install glassui
```

```bash [yarn]
yarn add @orionshub/lucent
# or the short name:
yarn add glassui
```

:::

Peer dependencies (you almost certainly already have these):

```bash
pnpm add react react-dom
```

## Import the stylesheet once

Components are unstyled until you import the compiled CSS **once** at your app root:

```ts
import '@orionshub/lucent/styles.css'
```

See [CSS Import](/guide/css-import) for the full list of optional stylesheets (glass-only, fonts,
theme panel, Tailwind preset).

## Use a component

```tsx
import { Button } from '@orionshub/lucent'
import '@orionshub/lucent/styles.css'

export function App() {
  return <Button variant="solid">Hello Lucent</Button>
}
```

## Optional: the theming provider

`LucentProvider` seeds the initial theme axes and enables `useLucent()`, but it is **optional** —
components read their defaults straight from `:root`. Add it when you want SSR no-flash, a persisted
theme, or the `useLucent` hook.

```tsx
import { LucentProvider } from '@orionshub/lucent'

export function App({ children }) {
  return <LucentProvider>{children}</LucentProvider>
}
```

Continue to [Theming & Runtime Controls](/guide/theming).
