"use client";

/**
 * Tooltip — Radix Tooltip with hover+focus parity (OVL-04)
 *
 * Requires a TooltipProvider ancestor (exported here) to configure delays.
 * Opens on hover AND keyboard focus. Content renders through Radix's own
 * Portal, inheriting :root tokens. Carries "use client".
 */
import React from 'react';
import { Tooltip as RadixTooltip } from 'radix-ui';
import { cx } from '../../utils/cx';

const TooltipProvider: typeof RadixTooltip.Provider = RadixTooltip.Provider;
const TooltipRoot: typeof RadixTooltip.Root = RadixTooltip.Root;
const TooltipTrigger: typeof RadixTooltip.Trigger = RadixTooltip.Trigger;

export type TooltipContentProps = React.ComponentPropsWithoutRef<typeof RadixTooltip.Content> & {
  arrow?: boolean;
};
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof RadixTooltip.Content>,
  TooltipContentProps
>(function TooltipContent({ className, children, arrow = true, sideOffset = 6, ...props }, ref) {
  return (
    <RadixTooltip.Portal>
      <RadixTooltip.Content
        ref={ref}
        className={cx('lucent-tooltip__content', className)}
        sideOffset={sideOffset}
        {...props}
      >
        {children}
        {arrow ? <RadixTooltip.Arrow className="lucent-tooltip__arrow" /> : null}
      </RadixTooltip.Content>
    </RadixTooltip.Portal>
  );
});
TooltipContent.displayName = 'Tooltip.Content';

export const Tooltip = Object.assign(TooltipRoot, {
  Provider: TooltipProvider,
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
});

export { TooltipProvider };
