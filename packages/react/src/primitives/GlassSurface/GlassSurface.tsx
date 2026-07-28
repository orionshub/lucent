/**
 * GlassSurface — Lucent's foundational glass primitive
 *
 * A presentational container that applies the `.lucent-glass` class.
 * It is deliberately server-safe: NO hooks, NO document access.
 * NO "use client" directive — this file must remain server-safe.
 *
 * Security: accepts children as React nodes only (no dangerouslySetInnerHTML).
 * Consumers may wrap any content in GlassSurface; the glass effect comes
 * from importing `@lucent/react/glass.css`.
 */

import React from 'react';
import { cx } from '../../utils/cx';

export interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Override the rendered element. Defaults to `div`.
   * Accepts any valid HTML tag name.
   */
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
}

export const GlassSurface = React.forwardRef<HTMLDivElement, GlassSurfaceProps>(
  function GlassSurface({ as: Tag = 'div', className, children, ...props }, ref) {
    return (
      <Tag
        ref={ref}
        className={cx('lucent-glass', className)}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

GlassSurface.displayName = 'GlassSurface';
