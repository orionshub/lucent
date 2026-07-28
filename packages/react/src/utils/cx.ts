/**
 * cx — class-name join utility
 * Zero-dependency, native. Filters falsy values.
 *
 * @example
 *   cx('lucent-btn', variant && `lucent-btn--${variant}`, className)
 */
export function cx(...classes: Array<string | undefined | null | false>): string {
  return classes.filter(Boolean).join(' ');
}
