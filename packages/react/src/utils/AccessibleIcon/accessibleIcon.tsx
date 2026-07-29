/**
 * AccessibleIcon — wrap a decorative icon with a required accessible label
 *
 * Radix's AccessibleIcon applies aria-hidden to the icon child and appends a
 * VisuallyHidden label. The `label` prop is REQUIRED (not optional) so an
 * icon-only usage can never be silently unlabeled.
 *
 * Server-safe — NO "use client".
 */
import React from 'react';
import { AccessibleIcon as RadixAccessibleIcon } from 'radix-ui';

export interface AccessibleIconProps {
  /** The accessible name announced to assistive tech. REQUIRED. */
  label: string;
  /** The decorative icon (rendered aria-hidden by Radix). */
  children: React.ReactNode;
}

export function AccessibleIcon({ label, children }: AccessibleIconProps) {
  return (
    <RadixAccessibleIcon.Root label={label}>
      {children}
    </RadixAccessibleIcon.Root>
  );
}

AccessibleIcon.displayName = 'AccessibleIcon';
