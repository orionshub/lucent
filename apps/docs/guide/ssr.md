# SSR & Next.js

Lucent is server-render safe. Presentational components render on the server with no client bundle;
interactive components carry their own `"use client"` boundary so they slot cleanly into React Server
Component trees.

## The `"use client"` boundary

The build **preserves** the `"use client"` directive on interactive modules (verified by a build-output
grep gate). In a Next.js App Router project you can import a server-safe component directly in a Server
Component, and an interactive one drops its own boundary:

```tsx
// app/page.tsx — a Server Component
import { Card } from '@orionshub/lucent/card'
import { Button } from '@orionshub/lucent/button'
import '@orionshub/lucent/styles.css'

export default function Page() {
  return (
    <Card>
      <Card.Body>Rendered on the server.</Card.Body>
      <Card.Footer><Button>Interactive — ships its own "use client"</Button></Card.Footer>
    </Card>
  )
}
```

::: tip Import server-safe components via subpaths in Server Components
The **root barrel** (`@orionshub/lucent`) re-exports the theming provider, which uses React
hooks — so it is intended for client trees. In a **Server Component**, import server-safe
components from their **per-component subpath** (`@orionshub/lucent/card`, `@orionshub/lucent/button`, …).
Interactive components carry their own `"use client"`, so importing them (from a client file, or
as a rendered child) drops a client boundary automatically.
:::

Which components are client vs server-safe is noted on every component page under **Guidance →
SSR / Next.js**.

## No theme flash

If you persist a theme and server-render, set the `:root` attributes **before first paint** to avoid a
flash of the default theme. Inject the no-flash script into `<head>`:

```tsx
import { noFlashScript } from '@orionshub/lucent/no-flash'

// Next.js App Router — app/layout.tsx (a Server Component)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

The script reads the persisted theme from `localStorage` inside a `try/catch` and applies the `:root`
attributes synchronously — no template literals, no `eval`, safe to inline.

## CSS import location

Import `@orionshub/lucent/styles.css` once in the root layout (`app/layout.tsx`) or `_app.tsx`. It is a
side-effect CSS import and is safe during SSR.

## The docs prove it

This site is itself the proof: every live example is a **client-only island**. The pages statically
render (SSR/SSG) without the React runtime, and the examples hydrate on the client — demonstrating
that importing Lucent never forces client-side rendering of a page.

A minimal **Next.js App Router smoke build** (in the repo's `apps/next-smoke`) additionally compiles a
Server Component importing both a server-safe and a client component, gating on `next build` in CI.
