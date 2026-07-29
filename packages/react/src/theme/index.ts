/**
 * theme/index.ts — Public entry for the ./theme subpath export
 *
 * Re-exports the full public surface of the theming system:
 *   - LucentProvider (the runtime theming spine)
 *   - useLucent (the hook for consuming theming context)
 *   - Imperative setters (for building custom controls outside of React)
 *   - noFlashScript (for SSR no-flash injection)
 *
 * Note: "use client" is on LucentProvider.tsx and useLucent.ts directly;
 * this barrel is not interactive itself.
 */
export { LucentProvider } from './LucentProvider';
export type { LucentProviderProps, LucentContextValue } from './LucentProvider';

export { useLucent } from './useLucent';

export {
  setTheme, setAccent, setDensity, setGlassOpacity, setGlassBlur, setContrast,
  GLASS_OPACITY_DEFAULT, GLASS_OPACITY_MIN, GLASS_OPACITY_MAX, GLASS_BLUR_MAX,
} from './setters';
export type { Theme, Accent, Density, Contrast } from './setters';

export { noFlashScript } from './no-flash-script';
