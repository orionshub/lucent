/**
 * Button — the foundational interaction primitive (server-safe)
 *
 * variant: solid | soft | ghost | outline (default solid)
 * size: sm | md | lg (default md, mapped to --lucent-control-h density token)
 * loading: sets aria-busy + spinner + disables interaction
 * asChild: renders the consumer element via Slot (server-safe, no hooks)
 */
import React from 'react';
import { Slot, Slottable } from '../../utils/Slot/slot';
import { cx } from '../../utils/cx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Defaults to `solid`. */
  variant?: 'solid' | 'soft' | 'ghost' | 'outline';
  /** Size. Defaults to `md`. */
  size?: 'sm' | 'md' | 'lg';
  /** Loading state — sets aria-busy, renders a spinner, disables interaction. */
  loading?: boolean;
  /** Icon rendered before the label (aria-hidden). */
  startIcon?: React.ReactNode;
  /** Icon rendered after the label (aria-hidden). */
  endIcon?: React.ReactNode;
  /** Render the single child element instead of a <button> (via Slot). */
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'solid',
      size = 'md',
      loading = false,
      startIcon,
      endIcon,
      asChild = false,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cx(
          'lucent-btn',
          `lucent-btn--${variant}`,
          `lucent-btn--${size}`,
          className,
        )}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        disabled={asChild ? undefined : disabled || loading}
        {...props}
      >
        {startIcon ? (
          <span className="lucent-btn__icon" aria-hidden="true">{startIcon}</span>
        ) : null}
        <Slottable>{children}</Slottable>
        {endIcon ? (
          <span className="lucent-btn__icon" aria-hidden="true">{endIcon}</span>
        ) : null}
        {loading ? <span className="lucent-btn__spinner" aria-hidden="true" /> : null}
      </Comp>
    );
  },
);

Button.displayName = 'Button';
