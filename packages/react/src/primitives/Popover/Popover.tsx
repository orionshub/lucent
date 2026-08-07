"use client";

/**
 * Popover — Radix Popover positioned glass surface (OVL-03)
 *
 * Collision-aware popper content with focus management and dismissal; the
 * gateway pattern for later composites. Content renders through Radix's own
 * Portal, inheriting :root tokens. Carries "use client".
 */
import React from 'react';
import { Popover as RadixPopover } from 'radix-ui';
import { cx } from '../../utils/cx';

const PopoverRoot: typeof RadixPopover.Root = RadixPopover.Root;
const PopoverTrigger: typeof RadixPopover.Trigger = RadixPopover.Trigger;
const PopoverAnchor: typeof RadixPopover.Anchor = RadixPopover.Anchor;
const PopoverClose: typeof RadixPopover.Close = RadixPopover.Close;

export type PopoverContentProps = React.ComponentPropsWithoutRef<typeof RadixPopover.Content> & {
  /** Show the pointer arrow. Defaults to true. */
  arrow?: boolean;
};
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Content>,
  PopoverContentProps
>(function PopoverContent({ className, children, arrow = true, sideOffset = 6, ...props }, ref) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        ref={ref}
        className={cx('lucent-popover__content', className)}
        sideOffset={sideOffset}
        {...props}
      >
        {children}
        {arrow ? <RadixPopover.Arrow className="lucent-popover__arrow" /> : null}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );
});
PopoverContent.displayName = 'Popover.Content';

export const Popover = Object.assign(PopoverRoot, {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Anchor: PopoverAnchor,
  Close: PopoverClose,
  Content: PopoverContent,
});
