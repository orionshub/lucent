/**
 * Callout — inline note / alert (DATA-02)
 *
 * Server-safe. When `urgent` is set the callout takes role="alert" so assistive
 * tech announces it live; otherwise it renders as a static note with no live
 * role. Tone variants tint the surface via a per-tone custom property.
 */
import React from 'react';
import { cx } from '../../utils/cx';

export type CalloutTone = 'info' | 'success' | 'warning' | 'danger';

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Semantic tone. Defaults to `info`. */
  tone?: CalloutTone;
  /** When true, announce live via role="alert". */
  urgent?: boolean;
  /** Optional leading icon (decorative — rendered aria-hidden). */
  icon?: React.ReactNode;
}

export const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(function Callout(
  { tone = 'info', urgent = false, icon, className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx('lucent-callout', `lucent-callout--${tone}`, className)}
      role={urgent ? 'alert' : undefined}
      {...props}
    >
      {icon != null ? (
        <span className="lucent-callout__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <div className="lucent-callout__content">{children}</div>
    </div>
  );
});

Callout.displayName = 'Callout';
