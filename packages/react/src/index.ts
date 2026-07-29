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

export { Slot, Slottable } from './utils/Slot/slot';
export type { AsChildProps } from './utils/Slot/slot';
export { VisuallyHidden } from './utils/VisuallyHidden/visuallyHidden';
export type { VisuallyHiddenProps } from './utils/VisuallyHidden/visuallyHidden';
export { AccessibleIcon } from './utils/AccessibleIcon/accessibleIcon';
export type { AccessibleIconProps } from './utils/AccessibleIcon/accessibleIcon';
export { Portal } from './utils/Portal/portal';
export type { PortalProps } from './utils/Portal/portal';

// ─── GlassSurface primitive ────────────────────────────────────────────────
export { GlassSurface } from './primitives/GlassSurface/GlassSurface';
export type { GlassSurfaceProps } from './primitives/GlassSurface/GlassSurface';

// ─── Primitives ────────────────────────────────────────────────────────────
export { Button } from './primitives/Button/Button';
export type { ButtonProps } from './primitives/Button/Button';
export { IconButton } from './primitives/IconButton/IconButton';
export type { IconButtonProps } from './primitives/IconButton/IconButton';
export { Text } from './primitives/Text/Text';
export type { TextProps } from './primitives/Text/Text';
export { Heading } from './primitives/Heading/Heading';
export type { HeadingProps } from './primitives/Heading/Heading';
export { Link } from './primitives/Link/Link';
export type { LinkProps } from './primitives/Link/Link';
export { Separator } from './primitives/Separator/Separator';
export type { SeparatorProps } from './primitives/Separator/Separator';
export { Avatar } from './primitives/Avatar/Avatar';
export type { AvatarProps } from './primitives/Avatar/Avatar';
export { AspectRatio } from './primitives/AspectRatio/AspectRatio';
export type { AspectRatioProps } from './primitives/AspectRatio/AspectRatio';
export { Badge } from './primitives/Badge/Badge';
export type { BadgeProps } from './primitives/Badge/Badge';
export { Kbd } from './primitives/Kbd/Kbd';
export type { KbdProps } from './primitives/Kbd/Kbd';

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

