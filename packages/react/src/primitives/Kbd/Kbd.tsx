/**
 * Kbd — keyboard keycap primitive (server-safe)
 *
 * Renders a semantic `<kbd>` by default; change via `as`.
 * Primary consumer of the mono font token.
 */
import React from 'react';
import { cx } from '../../utils/cx';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /** The element to render. Defaults to `kbd`. */
  as?: React.ElementType;
  children?: React.ReactNode;
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  function Kbd({ as: Tag = 'kbd', className, children, ...props }, ref) {
    return (
      <Tag ref={ref} className={cx('lucent-kbd', className)} {...props}>
        {children}
      </Tag>
    );
  },
);

Kbd.displayName = 'Kbd';
