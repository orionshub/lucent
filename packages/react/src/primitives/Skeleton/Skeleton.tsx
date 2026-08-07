/**
 * Skeleton — shimmer loading placeholder (FB-02)
 *
 * Server-safe and decorative (aria-hidden). The shimmer sweep degrades to a
 * static muted block under prefers-reduced-motion. No "use client".
 */
import React from 'react';
import { cx } from '../../utils/cx';

export type SkeletonVariant = 'text' | 'rect' | 'circle';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shape. Defaults to `rect`. */
  variant?: SkeletonVariant;
  /** Inline size (number ⇒ px). */
  width?: number | string;
  /** Block size (number ⇒ px). */
  height?: number | string;
}

function dim(v: number | string | undefined): string | undefined {
  if (v === undefined) return undefined;
  return typeof v === 'number' ? `${v}px` : v;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { variant = 'rect', width, height, className, style, ...props },
  ref,
) {
  const sizeStyle: Record<string, string> = {};
  const w = dim(width);
  const h = dim(height);
  if (w) sizeStyle['inlineSize'] = w;
  if (h) sizeStyle['blockSize'] = h;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cx('lucent-skeleton', `lucent-skeleton--${variant}`, className)}
      style={{ ...sizeStyle, ...style }}
      {...props}
    />
  );
});

Skeleton.displayName = 'Skeleton';
