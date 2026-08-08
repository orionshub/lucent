# Portal Theming

Overlays (Dialog, Popover, Tooltip, Menus, Toast, Select) render their content through a **portal** to
`document.body` — outside your component tree. A naive portal breaks theming, because the content
escapes any themed wrapper. Lucent avoids this by design.

## Why `:root`-scoped tokens matter

Lucent's theme tokens live on `:root`, not on a provider `<div>`. Because portalled content is still a
descendant of `<html>`, it inherits every token automatically — themed glass, correct accent,
current opacity — with no configuration:

```tsx
import { Portal, GlassSurface } from '@lucent/react'

// Rendered into <body>, yet still fully themed from :root
<Portal>
  <GlassSurface>Themed portal content</GlassSurface>
</Portal>
```

<Demo name="portal-basic" title="Themed portal content" />

Every overlay uses its own Radix portal internally, so you get themed portal content for free — you
do **not** need to wrap overlays in the Lucent `Portal` utility.

## The containing-block gotcha

There is one important CSS rule to know when you portal manually. A `backdrop-filter`, `transform`, or
`filter` on an ancestor creates a **containing block** that traps `position: fixed` descendants inside
it. This is the classic reason a fixed-position overlay appears clipped inside a glass card.

**The affected case is `Toast`.** Its `<Toast.Viewport>` is `position: fixed`. If it renders inside a
glass ancestor, the ancestor's `backdrop-filter` traps it. Render the viewport at your app root —
outside any filtered/transformed ancestor:

```tsx
import { createPortal } from 'react-dom'
import { Toast, ToastProvider } from '@lucent/react'

<ToastProvider>
  {/* ...your Toast.Root(s)... */}
  {createPortal(<Toast.Viewport />, document.body)}
</ToastProvider>
```

Other overlays (Dialog, Popover, Menus, etc.) portal to `<body>` themselves, so they are unaffected.

## Summary

- Portalled overlay content is themed automatically — tokens come from `:root`.
- Don't wrap overlays in the `Portal` utility; they portal internally.
- For `Toast`, mount the `Viewport` at the app root to avoid the `backdrop-filter` containing-block
  trap.
