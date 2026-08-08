# Transparency & Solid Mode

The defining feature of Lucent: **glass transparency is a runtime knob, not a fixed style** — and a
first-class accessibility control.

## The single variable

Every glass surface reads one CSS custom property:

```css
--lucent-glass-opacity: 0.72; /* default (dark). Clamped range: 0.60–1.0 */
```

Because it is a CSS variable on `:root`, updating it re-skins **every** surface at once with no JS in
the style path and no React re-render:

```ts
import { setGlassOpacity, setGlassBlur } from '@lucent/react/theme'

setGlassOpacity(0.9) // more opaque → higher text contrast
setGlassBlur(6)      // less backdrop blur
```

Try it now: open the **Glass controls** panel (bottom-right) and drag the opacity slider — every live
example on this site responds instantly.

## Why a floor of 0.60

The minimum opacity (`0.60`) is a **contrast floor**. Below it, translucency can drop text/background
contrast under the WCAG baseline. The setter clamps anything lower, so you cannot accidentally ship an
inaccessible surface.

## Solid / high-contrast mode

For users who need maximum contrast — or environments like `forced-colors` — switch to solid mode:

```ts
import { setContrast } from '@lucent/react/theme'

setContrast('solid')   // fully opaque surfaces, no blur
setContrast('default') // back to glass
```

Solid mode sets `data-contrast="solid"` on `:root`, which flips surfaces to opaque backgrounds and
removes `backdrop-filter`. The library also honors `prefers-contrast` and `forced-colors` media
queries automatically.

## The `@supports` fallback

Where `backdrop-filter` is unavailable, `GlassSurface` falls back to an opaque background via an
`@supports` query — so content never becomes unreadable on unsupported browsers. Both a `-webkit-`
prefixed and standard declaration are emitted.

## Guidance

- Prefer adjusting **opacity** over disabling glass entirely — you keep the aesthetic while improving
  legibility.
- Expose the opacity control (or `ThemePanel`) to end users when your app has dense text over glass.
- Test at the `0.60` floor and in solid mode as part of your accessibility pass.
