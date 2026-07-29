/**
 * Text — polymorphic text primitive (server-safe)
 *
 * Renders a `<p>` by default; change the element via `as`.
 * Consumes the body/label type-role tokens.
 */
import React from 'react';
import { cx } from '../../utils/cx';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** The element to render. Defaults to `p`. */
  as?: React.ElementType;
  /** Type-role size. Defaults to `body`. */
  size?: 'body' | 'label';
  /** Muted (secondary) colour. */
  muted?: boolean;
  children?: React.ReactNode;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  function Text({ as: Tag = 'p', size = 'body', muted = false, className, children, ...props }, ref) {
    return (
      <Tag
        ref={ref}
        className={cx('lucent-text', `lucent-text--${size}`, muted && 'lucent-text--muted', className)}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

Text.displayName = 'Text';
