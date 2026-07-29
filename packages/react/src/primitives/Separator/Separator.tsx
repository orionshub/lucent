/**
 * Separator — hairline divider (server-safe)
 *
 * Wraps radix-ui Separator.Root. Correct role/aria for orientation and
 * decorative vs semantic.
 */
import React from 'react';
import { Separator as RadixSeparator } from 'radix-ui';
import { cx } from '../../utils/cx';

export type SeparatorProps = React.ComponentPropsWithoutRef<
  typeof RadixSeparator.Root
>;

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  function Separator({ className, orientation = 'horizontal', ...props }, ref) {
    return (
      <RadixSeparator.Root
        ref={ref}
        orientation={orientation}
        className={cx('lucent-separator', className)}
        {...props}
      />
    );
  },
);

Separator.displayName = 'Separator';
