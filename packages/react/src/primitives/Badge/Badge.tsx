/**
 * Badge — small status/label chip (server-safe)
 *
 * Renders a `<span>` by default; change via `as`.
 * tone: neutral | accent | danger; variant: soft | solid | outline.
 */
import React from 'react';
import { cx } from '../../utils/cx';

export interface BadgeProps extends React.HTMLAttributes<HTMLElement> {
  /** The element to render. Defaults to `span`. */
  as?: React.ElementType;
  /** Colour tone. Defaults to `neutral`. */
  tone?: 'neutral' | 'accent' | 'danger';
  /** Fill style. Defaults to `soft`. */
  variant?: 'soft' | 'solid' | 'outline';
  children?: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLElement, BadgeProps>(
  function Badge({ as: Tag = 'span', tone = 'neutral', variant = 'soft', className, children, ...props }, ref) {
    return (
      <Tag
        ref={ref}
        className={cx('lucent-badge', `lucent-badge--${tone}`, `lucent-badge--${variant}`, className)}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

Badge.displayName = 'Badge';
