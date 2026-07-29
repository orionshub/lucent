/**
 * VisuallyHidden — hide content visually while keeping it in the a11y tree
 *
 * Thin wrapper over the unified Radix VisuallyHidden. Radix supplies the
 * clip/1px inline styles; the `lucent-visually-hidden` class exists only for
 * consumer targeting.
 *
 * Server-safe — NO "use client".
 */
import React from 'react';
import { VisuallyHidden as RadixVisuallyHidden } from 'radix-ui';
import { cx } from '../cx';

export type VisuallyHiddenProps = React.ComponentPropsWithoutRef<
  typeof RadixVisuallyHidden.Root
>;

export const VisuallyHidden = React.forwardRef<
  HTMLSpanElement,
  VisuallyHiddenProps
>(function VisuallyHidden({ className, ...props }, ref) {
  return (
    <RadixVisuallyHidden.Root
      ref={ref}
      className={cx('lucent-visually-hidden', className)}
      {...props}
    />
  );
});

VisuallyHidden.displayName = 'VisuallyHidden';
