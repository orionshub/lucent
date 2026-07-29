/**
 * Heading — polymorphic heading primitive (server-safe)
 *
 * Renders an `<h2>` by default; change the element via `as`.
 * Consumes the display/heading type-role tokens.
 */
import React from 'react';
import { cx } from '../../utils/cx';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** The element to render. Defaults to `h2`. */
  as?: React.ElementType;
  /** Type-role size. Defaults to `heading`. */
  size?: 'display' | 'heading';
  children?: React.ReactNode;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading({ as: Tag = 'h2', size = 'heading', className, children, ...props }, ref) {
    return (
      <Tag
        ref={ref}
        className={cx('lucent-heading', `lucent-heading--${size}`, className)}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

Heading.displayName = 'Heading';
