# Installation

Lucent ships as ESM. React 18 or 19 is a peer dependency; [Radix UI](https://www.radix-ui.com/) is a
regular dependency kept external so your app dedupes a single copy.

## Install

::: code-group

```bash [pnpm]
pnpm add @lucent/react
```

```bash [npm]
npm install @lucent/react
```

```bash [yarn]
yarn add @lucent/react
```

:::

Peer dependencies (you almost certainly already have these):

```bash
pnpm add react react-dom
```

## Import the stylesheet once

Components are unstyled until you import the compiled CSS **once** at your app root:

```ts
import '@lucent/react/styles.css'
```

See [CSS Import](/guide/css-import) for the full list of optional stylesheets (glass-only, fonts,
theme panel, Tailwind preset).

## Use a component

```tsx
import { Button } from '@lucent/react'
import '@lucent/react/styles.css'

export function App() {
  return <Button variant="solid">Hello Lucent</Button>
}
```

## Optional: the theming provider

`LucentProvider` seeds the initial theme axes and enables `useLucent()`, but it is **optional** —
components read their defaults straight from `:root`. Add it when you want SSR no-flash, a persisted
theme, or the `useLucent` hook.

```tsx
import { LucentProvider } from '@lucent/react'

export function App({ children }) {
  return <LucentProvider>{children}</LucentProvider>
}
```

Continue to [Theming & Runtime Controls](/guide/theming).
