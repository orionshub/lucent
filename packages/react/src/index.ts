/**
 * @lucent/react — public root barrel
 *
 * Side-effect-free: no CSS imports in JS.
 * CSS ships via the *.css subpath exports in package.json:
 *   import '@lucent/react/styles.css'   — aggregated tokens + glass + motion
 *   import '@lucent/react/glass.css'    — glass surface only
 *   import '@lucent/react/fonts.css'    — opt-in Space Grotesk font-face
 *   import '@lucent/react/theme.css'    — ThemePanel styles
 *   import '@lucent/react/tailwind'     — Tailwind v4 @theme preset
 */

// ─── Utilities ─────────────────────────────────────────────────────────────
export { cx } from './utils/cx';

// ─── GlassSurface primitive ────────────────────────────────────────────────
export { GlassSurface } from './primitives/GlassSurface/GlassSurface';
export type { GlassSurfaceProps } from './primitives/GlassSurface/GlassSurface';

// ─── Theming system ────────────────────────────────────────────────────────
export { LucentProvider, LucentContext } from './theme/LucentProvider';
export type { LucentProviderProps, LucentContextValue } from './theme/LucentProvider';

export { useLucent } from './theme/useLucent';

export { ThemePanel } from './theme/ThemePanel';
export type { ThemePanelProps } from './theme/ThemePanel';

export {
  setTheme, setAccent, setDensity, setGlassOpacity, setGlassBlur, setContrast,
  GLASS_OPACITY_DEFAULT, GLASS_OPACITY_MIN, GLASS_OPACITY_MAX, GLASS_BLUR_MAX,
} from './theme/setters';
export type { Theme, Accent, Density, Contrast } from './theme/setters';

export { noFlashScript } from './theme/no-flash-script';

// ─── Design tokens (typed TS map) ─────────────────────────────────────────
// Re-exported via the ./tokens subpath; also available here for convenience.
// import type { LucentBg } from '@lucent/react' (from the generated TS map)
export * from './tokens/index';

