/**
 * space.ts — internal spacing-token resolver for layout primitives
 *
 * Not exported from the public barrel. Maps a numeric token step to a
 * `--lucent-space-*` custom property reference; passes any raw string
 * (e.g. "auto", "2rem", "10%") through unchanged.
 */

/** Resolve a spacing prop value to a token var reference or raw CSS value. */
export function resolveSpace(v: number | string | undefined): string | undefined {
  if (v === undefined) return undefined;
  if (typeof v === 'number') return `var(--lucent-space-${v})`;
  // Numeric-looking strings map to the token scale too (e.g. "4").
  if (/^\d+$/.test(v)) return `var(--lucent-space-${v})`;
  return v;
}

/** Assign a CSS custom property to a style record only when the value is defined. */
export function setVar(
  style: Record<string, string | number>,
  name: string,
  value: string | number | undefined,
): void {
  if (value !== undefined && value !== null && value !== '') {
    style[name] = value;
  }
}
