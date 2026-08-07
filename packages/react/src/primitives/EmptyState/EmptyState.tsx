/**
 * EmptyState — glass placeholder for empty content (FB-03)
 *
 * Server-safe. Composes GlassSurface as a consistent glass placeholder with
 * icon, title, description, and action slots. No "use client".
 */
import React from 'react';
import { cx } from '../../utils/cx';
import { GlassSurface } from '../GlassSurface/GlassSurface';

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Decorative leading icon (rendered aria-hidden). */
  icon?: React.ReactNode;
  /** Title content. */
  title: React.ReactNode;
  /** Optional supporting description. */
  description?: React.ReactNode;
  /** Optional action slot (e.g. a Button). */
  action?: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { icon, title, description, action, className, ...props },
  ref,
) {
  return (
    <GlassSurface ref={ref} className={cx('lucent-empty-state', className)} {...props}>
      {icon != null ? (
        <div className="lucent-empty-state__icon" aria-hidden="true">
          {icon}
        </div>
      ) : null}
      <p className="lucent-empty-state__title">{title}</p>
      {description != null ? (
        <p className="lucent-empty-state__desc">{description}</p>
      ) : null}
      {action != null ? <div className="lucent-empty-state__action">{action}</div> : null}
    </GlassSurface>
  );
});

EmptyState.displayName = 'EmptyState';
