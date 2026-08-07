/**
 * Spinner — CSS-only indeterminate loader (FB-01)
 *
 * Server-safe. Exposes role="status" + aria-live="polite" with a VisuallyHidden
 * default "Loading" label. The spinning ring is decorative and honors
 * prefers-reduced-motion (static fallback). No "use client".
 */
import React from 'react';
import { cx } from '../../utils/cx';
import { VisuallyHidden } from '../../utils/VisuallyHidden/visuallyHidden';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Size scale. Defaults to `md`. */
  size?: SpinnerSize;
  /** Accessible loading label. Defaults to `Loading`. */
  label?: string;
}

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = 'md', label = 'Loading', className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      role="status"
      aria-live="polite"
      className={cx('lucent-spinner', `lucent-spinner--${size}`, className)}
      {...props}
    >
      <span className="lucent-spinner__ring" aria-hidden="true" />
      <VisuallyHidden>{label}</VisuallyHidden>
    </span>
  );
});

Spinner.displayName = 'Spinner';
