"use client";

/**
 * AvatarGroup — overlapping avatars with an overflow count (DATA-04)
 *
 * Renders up to `max` child Avatars; any beyond `max` collapse into a
 * "+N" overflow chip with an accessible label. Composes the Avatar primitive
 * (which carries "use client"). Carries "use client".
 */
import React from 'react';
import { cx } from '../../utils/cx';

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum avatars to show before collapsing into a "+N" chip. */
  max?: number;
  children?: React.ReactNode;
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup({ max, className, children, ...props }, ref) {
    const items = React.Children.toArray(children).filter(React.isValidElement);
    const limit = max != null && max > 0 ? max : items.length;
    const visible = items.slice(0, limit);
    const overflow = items.length - visible.length;

    return (
      <div ref={ref} className={cx('lucent-avatar-group', className)} {...props}>
        {visible.map((child, i) => (
          <span className="lucent-avatar-group__item" key={i}>
            {child}
          </span>
        ))}
        {overflow > 0 ? (
          <span
            className="lucent-avatar-group__item lucent-avatar-group__overflow"
            aria-label={`${overflow} more`}
          >
            +{overflow}
          </span>
        ) : null}
      </div>
    );
  },
);

AvatarGroup.displayName = 'AvatarGroup';
