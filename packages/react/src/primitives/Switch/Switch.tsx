"use client";

/**
 * Switch — Radix Switch.Root + Switch.Thumb (FORM-06)
 *
 * Pill track + sliding thumb. Accent fill on checked.
 * CSS transition suppressed under prefers-reduced-motion (D3-09).
 */
import React from 'react';
import { Switch as RadixSwitch } from 'radix-ui';
import { cx } from '../../utils/cx';

export type SwitchProps = React.ComponentPropsWithoutRef<typeof RadixSwitch.Root> & {
  className?: string;
};

export const Switch = React.forwardRef<
  React.ElementRef<typeof RadixSwitch.Root>,
  SwitchProps
>(function Switch({ className, ...props }, ref) {
  return (
    <RadixSwitch.Root
      ref={ref}
      className={cx('lucent-switch', className)}
      {...props}
    >
      <RadixSwitch.Thumb className="lucent-switch__thumb" />
    </RadixSwitch.Root>
  );
});

Switch.displayName = 'Switch';
