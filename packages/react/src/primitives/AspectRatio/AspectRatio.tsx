/**
 * AspectRatio — maintain a consumer-supplied ratio (server-safe)
 *
 * Wraps radix-ui AspectRatio.Root.
 */
import React from 'react';
import { AspectRatio as RadixAspectRatio } from 'radix-ui';
import { cx } from '../../utils/cx';

export type AspectRatioProps = React.ComponentPropsWithoutRef<
  typeof RadixAspectRatio.Root
>;

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  function AspectRatio({ className, children, ...props }, ref) {
    return (
      <RadixAspectRatio.Root
        ref={ref}
        className={cx('lucent-aspect-ratio', className)}
        {...props}
      >
        {children}
      </RadixAspectRatio.Root>
    );
  },
);

AspectRatio.displayName = 'AspectRatio';
