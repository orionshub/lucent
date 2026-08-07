"use client";

/**
 * ToggleGroup — Radix ToggleGroup.Root + ToggleGroup.Item (FORM-07)
 *
 * ToggleGroup.Item shares the lucent-toggle CSS class with standalone Toggle.
 * Supports type="single" and type="multiple".
 */
import React from 'react';
import { ToggleGroup as RadixToggleGroup } from 'radix-ui';
import { cx } from '../../utils/cx';

export type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof RadixToggleGroup.Root> & {
  className?: string;
};

export type ToggleGroupItemProps = React.ComponentPropsWithoutRef<typeof RadixToggleGroup.Item> & {
  className?: string;
};

export const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof RadixToggleGroup.Root>,
  ToggleGroupProps
>(function ToggleGroup({ className, ...props }, ref) {
  return (
    <RadixToggleGroup.Root
      ref={ref}
      className={cx('lucent-toggle-group', className)}
      {...props}
    />
  );
});

ToggleGroup.displayName = 'ToggleGroup';

export const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof RadixToggleGroup.Item>,
  ToggleGroupItemProps
>(function ToggleGroupItem({ className, ...props }, ref) {
  return (
    <RadixToggleGroup.Item
      ref={ref}
      className={cx('lucent-toggle', 'lucent-toggle-group__item', className)}
      {...props}
    />
  );
});

ToggleGroupItem.displayName = 'ToggleGroupItem';
