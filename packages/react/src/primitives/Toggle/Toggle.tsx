"use client";

/**
 * Toggle — Radix Toggle.Root with accent tint on pressed state (FORM-07)
 *
 * data-state="on" → accent soft tint
 * data-state="off" → ghost appearance
 */
import React from 'react';
import { Toggle as RadixToggle } from 'radix-ui';
import { cx } from '../../utils/cx';

export const ToggleRoot: typeof RadixToggle.Root = RadixToggle.Root;

export type ToggleProps = React.ComponentPropsWithoutRef<typeof RadixToggle.Root> & {
  className?: string;
};

export const Toggle = React.forwardRef<
  React.ElementRef<typeof RadixToggle.Root>,
  ToggleProps
>(function Toggle({ className, ...props }, ref) {
  return (
    <RadixToggle.Root
      ref={ref}
      className={cx('lucent-toggle', className)}
      {...props}
    />
  );
});

Toggle.displayName = 'Toggle';
