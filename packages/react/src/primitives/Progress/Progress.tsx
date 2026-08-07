"use client";

/**
 * Progress — determinate/indeterminate, linear + circular (DATA-03)
 *
 * Linear form wraps Radix Progress (correct progressbar semantics). Circular
 * form renders an SVG progressbar. Pass `value={null}` (or omit) for the
 * indeterminate state. Provide an accessible name via `aria-label` /
 * `aria-labelledby`. Carries "use client".
 */
import React from 'react';
import { Progress as RadixProgress } from 'radix-ui';
import { cx } from '../../utils/cx';

export type ProgressVariant = 'linear' | 'circular';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value. `null`/`undefined` renders the indeterminate state. */
  value?: number | null;
  /** Maximum value. Defaults to 100. */
  max?: number;
  /** Visual form. Defaults to `linear`. */
  variant?: ProgressVariant;
  /** Diameter (px) of the circular variant. Defaults to 40. */
  size?: number;
  /** Stroke width (px) of the circular variant. Defaults to 4. */
  thickness?: number;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { value = null, max = 100, variant = 'linear', size = 40, thickness = 4, className, ...props },
  ref,
) {
  const isIndeterminate = value === null || value === undefined;
  const clamped = isIndeterminate ? 0 : Math.min(Math.max(value, 0), max);
  const percent = isIndeterminate ? 0 : (clamped / max) * 100;

  if (variant === 'circular') {
    const radius = (size - thickness) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashoffset = isIndeterminate ? circumference * 0.75 : circumference * (1 - percent / 100);
    return (
      <div
        ref={ref}
        className={cx('lucent-progress', 'lucent-progress--circular', className)}
        data-state={isIndeterminate ? 'indeterminate' : 'loading'}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={isIndeterminate ? undefined : clamped}
        {...props}
      >
        <svg
          className="lucent-progress__svg"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-hidden="true"
        >
          <circle
            className="lucent-progress__track"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={thickness}
          />
          <circle
            className="lucent-progress__indicator"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
          />
        </svg>
      </div>
    );
  }

  return (
    <RadixProgress.Root
      ref={ref}
      className={cx('lucent-progress', 'lucent-progress--linear', className)}
      value={isIndeterminate ? null : clamped}
      max={max}
      {...props}
    >
      <RadixProgress.Indicator
        className="lucent-progress__indicator"
        data-indeterminate={isIndeterminate ? '' : undefined}
        style={isIndeterminate ? undefined : { transform: `translateX(-${100 - percent}%)` }}
      />
    </RadixProgress.Root>
  );
});

Progress.displayName = 'Progress';
