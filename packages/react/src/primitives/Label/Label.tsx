/**
 * Label — native <label> wrapper (server-safe)
 *
 * Uses a native <label> element — not Radix Label.Root — because
 * @radix-ui/react-label carries "use client" in its dist (D3-13 correction).
 * The native element is sufficient and avoids the client boundary obligation.
 */
import React from 'react';
import { cx } from '../../utils/cx';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * When set, renders a required indicator (*) after the label text.
   * Uses data-required attribute driven by CSS.
   */
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  function Label({ className, required, children, ...props }, ref) {
    return (
      <label
        ref={ref}
        className={cx('lucent-label', className)}
        data-required={required ? '' : undefined}
        {...props}
      >
        {children}
      </label>
    );
  },
);

Label.displayName = 'Label';
