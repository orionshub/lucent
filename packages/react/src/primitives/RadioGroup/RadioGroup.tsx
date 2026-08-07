"use client";

/**
 * RadioGroup — Radix RadioGroup.Root + RadioGroup.Item + RadioGroup.Indicator (FORM-05)
 *
 * Roving focus managed by Radix internally.
 * value/onValueChange for controlled usage.
 */
import React from 'react';
import { RadioGroup as RadixRadioGroup } from 'radix-ui';
import { cx } from '../../utils/cx';

export type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Root> & {
  className?: string;
};

export type RadioGroupItemProps = React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Item> & {
  className?: string;
  /** Optional label rendered beside the radio button. */
  label?: React.ReactNode;
};

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Root>,
  RadioGroupProps
>(function RadioGroup({ className, ...props }, ref) {
  return (
    <RadixRadioGroup.Root
      ref={ref}
      className={cx('lucent-radio-group', className)}
      {...props}
    />
  );
});

RadioGroup.displayName = 'RadioGroup';

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Item>,
  RadioGroupItemProps
>(function RadioGroupItem({ className, label, children, ...props }, ref) {
  return (
    <div className="lucent-radio-group__item-wrap">
      <RadixRadioGroup.Item
        ref={ref}
        className={cx('lucent-radio', className)}
        {...props}
      >
        <RadixRadioGroup.Indicator className="lucent-radio__indicator" />
      </RadixRadioGroup.Item>
      {label && <label className="lucent-radio__label">{label}</label>}
      {children}
    </div>
  );
});

RadioGroupItem.displayName = 'RadioGroupItem';
