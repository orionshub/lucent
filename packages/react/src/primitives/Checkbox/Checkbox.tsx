"use client";

/**
 * Checkbox — Radix Checkbox.Root + Checkbox.Indicator (FORM-04)
 *
 * Supports: checked, unchecked, and indeterminate states.
 * All state styling is data-state driven (no JS className toggling).
 */
import React from 'react';
import { Checkbox as RadixCheckbox } from 'radix-ui';
import { cx } from '../../utils/cx';

export type CheckboxProps = React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root> & {
  className?: string;
};

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  CheckboxProps
>(function Checkbox({ className, ...props }, ref) {
  return (
    <RadixCheckbox.Root
      ref={ref}
      className={cx('lucent-checkbox', className)}
      {...props}
    >
      <RadixCheckbox.Indicator className="lucent-checkbox__indicator">
        {/* Check mark SVG — visible when data-state="checked" via CSS */}
        <svg
          className="lucent-checkbox__check"
          viewBox="0 0 12 12"
          width="12"
          height="12"
          aria-hidden="true"
        >
          <polyline
            points="2,6 5,9 10,3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* Dash — visible when data-state="indeterminate" via CSS */}
        <span className="lucent-checkbox__dash" aria-hidden="true" />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
});

Checkbox.displayName = 'Checkbox';
