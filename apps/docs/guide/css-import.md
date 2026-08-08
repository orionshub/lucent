# CSS Import

Lucent has **zero style runtime**. Components emit stable class names and read design tokens from CSS
custom properties. All styling ships as compiled CSS you import once.

## The one-time import

At your app root (e.g. `main.tsx`, `_app.tsx`, or the root layout), import the aggregated stylesheet
**once**:

```ts
import '@lucent/react/styles.css'
```

This single file includes the design tokens (`:root` custom properties), the glass layer, motion
tokens, and every component's styles. Because it is imported once and cached, adding more components
never adds more style code to parse at runtime.

## Available stylesheets

| Import | Contents | When to use |
| --- | --- | --- |
| `@lucent/react/styles.css` | Tokens + glass + motion + **all component styles** | Always — the one-time import |
| `@lucent/react/glass.css` | The glass surface layer only | Advanced: composing your own build |
| `@lucent/react/fonts.css` | Opt-in Space Grotesk `@font-face` | Only if you want the bundled display font |
| `@lucent/react/theme.css` | `ThemePanel` component styles | Only if you render `<ThemePanel>` |
| `@lucent/react/tailwind` | Tailwind v4 `@theme` preset | Optional: consuming tokens in Tailwind |

## Tree-shaking

`@lucent/react` sets `sideEffects: ["**/*.css"]`. That tells your bundler every `.js` module is
prunable, while never dropping the CSS side-effect import. Combined with per-component subpath
exports, you only ship the JavaScript for the components you actually import:

```ts
// Root barrel — tree-shaken by modern bundlers
import { Button } from '@lucent/react'

// Subpath — guarantees pruning, also great for non-bundler/Node consumers
import { Button } from '@lucent/react/button'
```

The CSS is global regardless of which import style you use — that is intentional and keeps the
runtime cost flat.

## No flash on SSR

If you server-render with a persisted theme, inject the no-flash script to set `:root` attributes
before first paint. See [SSR & Next.js](/guide/ssr).
