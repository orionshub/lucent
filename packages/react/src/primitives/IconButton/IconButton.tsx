/**
 * IconButton — square icon-only button with type-enforced accessible name
 *
 * The discriminated union makes it a COMPILE-TIME error to render an
 * IconButton without either `aria-label` or `label`.
 *
 * Server-safe (Slot has no hooks).
 */
import React from 'react';
import { Slot, Slottable } from '../../utils/Slot/slot';
import { VisuallyHidden } from '../../utils/VisuallyHidden/visuallyHidden';
import { cx } from '../../utils/cx';

interface IconButtonBaseProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  /** The icon to render. */
  icon: React.ReactNode;
  /** Visual style. Defaults to `ghost`. */
  variant?: 'solid' | 'soft' | 'ghost' | 'outline';
  /** Size. Defaults to `md`. */
  size?: 'sm' | 'md' | 'lg';
  /** Render the single child element instead of a <button> (via Slot). */
  asChild?: boolean;
}

/** Provide the accessible name via aria-label… */
type WithAriaLabel = IconButtonBaseProps & {
  'aria-label': string;
  label?: never;
};
/** …or via a visually-hidden label. Exactly one is required. */
type WithLabel = IconButtonBaseProps & {
  label: string;
  'aria-label'?: never;
};

export type IconButtonProps = WithAriaLabel | WithLabel;

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(props, ref) {
    const {
      icon,
      variant = 'ghost',
      size = 'md',
      asChild = false,
      className,
      ...rest
    } = props as IconButtonBaseProps & { label?: string; 'aria-label'?: string };

    const label = (rest as { label?: string }).label;
    // Remove `label` from the DOM-forwarded props (it's not a valid button attr)
    const { label: _omitLabel, ...domProps } = rest as { label?: string } & Record<string, unknown>;

    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={cx(
          'lucent-icon-btn',
          `lucent-icon-btn--${variant}`,
          `lucent-icon-btn--${size}`,
          className,
        )}
        {...(domProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        <Slottable>
          <span className="lucent-icon-btn__icon" aria-hidden={label ? 'true' : undefined}>
            {icon}
          </span>
        </Slottable>
        {label ? <VisuallyHidden>{label}</VisuallyHidden> : null}
      </Comp>
    );
  },
);

IconButton.displayName = 'IconButton';
