# RTL Support

Lucent is authored with **CSS logical properties** — `margin-inline`, `inset-inline-start`,
`padding-block`, and friends — instead of physical `left`/`right`. That means right-to-left layouts
work with **zero JavaScript**: set the document (or a subtree) direction and everything mirrors.

## Enabling RTL

```html
<html dir="rtl">
```

Or scope it to a subtree:

```tsx
<div dir="rtl">
  {/* Lucent components here mirror automatically */}
</div>
```

Try it now: open the **Glass controls** panel (bottom-right) and toggle **RTL direction** — the live
examples flip in place.

## With LucentProvider

`LucentProvider` wires a Radix `DirectionProvider` so behavior-level direction (roving focus, slider
orientation, menu placement) matches the visual direction:

```tsx
import { LucentProvider } from '@lucent/react'

<LucentProvider dir="rtl">
  {children}
</LucentProvider>
```

## What's guaranteed

- **Layout** mirrors via logical properties — a stylelint guard bans physical properties in the
  library source, so no component can regress.
- **Directional components** (Slider, Tabs, Radio Group, Menus) respect `dir` for keyboard navigation
  and positioning.
- **Icons/cues** that imply direction (e.g. the external-link cue) use logical placement.

## Testing

Set `dir="rtl"` on `<html>` (or use the docs RTL toggle) and verify:

- Spacing and alignment mirror correctly.
- Slider min/max and arrow-key direction invert.
- Menu and popover placement flips to the correct side.
