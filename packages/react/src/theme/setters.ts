/**
 * setters.ts — Guarded imperative theming setters
 *
 * The ONLY module in @lucent/react that is allowed to touch `document`.
 * (D-09: value storage ≠ propagation — LucentProvider holds values in
 * React context; propagation is pure CSS cascade via :root attributes/vars)
 *
 * Each setter:
 *   - Is SSR-safe (no-op when document is undefined)
 *   - Clamps / validates the value before writing
 *   - Writes a single CSS var or data-* attribute on document.documentElement
 *   - Never triggers a React re-render (surfaces update via CSS cascade)
 *
 * Security: enum-value whitelist prevents localStorage injection.
 * Any non-whitelisted value is silently rejected (no error surface).
 */

// ─── DOM helper (SSR guard) ────────────────────────────────────────────────

function root(): HTMLElement | null {
  if (typeof document === 'undefined') return null;
  return document.documentElement;
}

// ─── Glass opacity + blur ─────────────────────────────────────────────────

/** Hard floor — matches --lucent-glass-opacity-min token (0.60). */
export const GLASS_OPACITY_MIN  = 0.60;
/** Hard cap  — solid mode. */
export const GLASS_OPACITY_MAX  = 1.0;
/** Default dark opacity per UI-SPEC / tokens. */
export const GLASS_OPACITY_DEFAULT = 0.72;

/** Hard cap on blur — matches UI-SPEC / Pitfall 2. */
export const GLASS_BLUR_MAX = 24;

/**
 * Adjust the glass transparency of every Lucent surface at runtime.
 * The value is clamped to [GLASS_OPACITY_MIN, GLASS_OPACITY_MAX].
 *
 * @param opacity — 0.60–1.0 (values outside this range are clamped)
 */
export function setGlassOpacity(opacity: number): void {
  const r = root();
  if (!r) return;
  const clamped = Math.min(GLASS_OPACITY_MAX, Math.max(GLASS_OPACITY_MIN, opacity));
  r.style.setProperty('--lucent-glass-opacity', String(clamped));
}

/**
 * Adjust the backdrop blur of every glass surface at runtime.
 * The value is clamped to [0, GLASS_BLUR_MAX] px.
 *
 * @param px — blur in pixels (values outside 0–24 are clamped)
 */
export function setGlassBlur(px: number): void {
  const r = root();
  if (!r) return;
  const clamped = Math.min(GLASS_BLUR_MAX, Math.max(0, px));
  r.style.setProperty('--lucent-glass-blur', `${clamped}px`);
}

// ─── Theme axis ─────────────────────────────────────────────────────────

export type Theme = 'dark' | 'light';
const VALID_THEMES: ReadonlySet<string> = new Set<Theme>(['dark', 'light']);

/**
 * Switch the colour theme. Unknown values are rejected (localStorage-injection
 * mitigation — only whitelisted enum values are written to the DOM).
 *
 * @param theme — 'dark' | 'light'
 */
export function setTheme(theme: string): void {
  if (!VALID_THEMES.has(theme)) return;
  const r = root();
  if (!r) return;
  r.setAttribute('data-theme', theme);
}

// ─── Accent axis ─────────────────────────────────────────────────────────

export type Accent = 'cyan' | 'violet' | 'teal';
const VALID_ACCENTS: ReadonlySet<string> = new Set<Accent>(['cyan', 'violet', 'teal']);

/**
 * Switch the accent colour preset. Unknown values are rejected.
 *
 * @param accent — 'cyan' | 'violet' | 'teal'
 */
export function setAccent(accent: string): void {
  if (!VALID_ACCENTS.has(accent)) return;
  const r = root();
  if (!r) return;
  r.setAttribute('data-accent', accent);
}

// ─── Density axis ────────────────────────────────────────────────────────

export type Density = 'airy' | 'balanced' | 'compact';
const VALID_DENSITIES: ReadonlySet<string> = new Set<Density>(['airy', 'balanced', 'compact']);

/**
 * Switch the spacing density. Unknown values are rejected.
 *
 * @param density — 'airy' | 'balanced' | 'compact'
 */
export function setDensity(density: string): void {
  if (!VALID_DENSITIES.has(density)) return;
  const r = root();
  if (!r) return;
  r.setAttribute('data-density', density);
}

// ─── Contrast / solid mode ───────────────────────────────────────────────

export type Contrast = 'default' | 'solid';
const VALID_CONTRASTS: ReadonlySet<string> = new Set<Contrast>(['default', 'solid']);

/**
 * Toggle solid/high-contrast mode. 'solid' sets data-contrast="solid" which
 * collapses all glass surfaces to fully opaque via the glass.css rule.
 *
 * @param contrast — 'default' | 'solid'
 */
export function setContrast(contrast: string): void {
  if (!VALID_CONTRASTS.has(contrast)) return;
  const r = root();
  if (!r) return;
  if (contrast === 'solid') {
    r.setAttribute('data-contrast', 'solid');
  } else {
    r.removeAttribute('data-contrast');
  }
}
