"use client";

/**
 * HoverCard — Radix Hover Card with hover+focus parity (OVL-05)
 *
 * Opens on hover AND keyboard focus after a delay. Content renders through
 * Radix's own Portal, inheriting :root tokens. Carries "use client".
 */
import React from 'react';
import { HoverCard as RadixHoverCard } from 'radix-ui';
import { cx } from '../../utils/cx';

const HoverCardRoot: typeof RadixHoverCard.Root = RadixHoverCard.Root;
const HoverCardTrigger: typeof RadixHoverCard.Trigger = RadixHoverCard.Trigger;

export type HoverCardContentProps = React.ComponentPropsWithoutRef<
  typeof RadixHoverCard.Content
> & {
  arrow?: boolean;
};
const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof RadixHoverCard.Content>,
  HoverCardContentProps
>(function HoverCardContent({ className, children, arrow = true, sideOffset = 6, ...props }, ref) {
  return (
    <RadixHoverCard.Portal>
      <RadixHoverCard.Content
        ref={ref}
        className={cx('lucent-hover-card__content', className)}
        sideOffset={sideOffset}
        {...props}
      >
        {children}
        {arrow ? <RadixHoverCard.Arrow className="lucent-hover-card__arrow" /> : null}
      </RadixHoverCard.Content>
    </RadixHoverCard.Portal>
  );
});
HoverCardContent.displayName = 'HoverCard.Content';

export const HoverCard = Object.assign(HoverCardRoot, {
  Root: HoverCardRoot,
  Trigger: HoverCardTrigger,
  Content: HoverCardContent,
});
