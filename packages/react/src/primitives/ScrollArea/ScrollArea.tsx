"use client";

/**
 * ScrollArea — Radix Scroll Area with custom glass scrollbars (LAYOUT-03)
 *
 * Preserves native scrolling; the visible scrollbars are styled glass.
 * Carries "use client" — Radix Scroll Area uses hooks/observers.
 */
import React from 'react';
import { ScrollArea as RadixScrollArea } from 'radix-ui';
import { cx } from '../../utils/cx';

export type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both';

export interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof RadixScrollArea.Root> {
  /** Which scrollbars to show. Defaults to `vertical`. */
  orientation?: ScrollAreaOrientation;
  /** Viewport className passthrough. */
  viewportClassName?: string;
  children?: React.ReactNode;
}

function Scrollbar({ orientation }: { orientation: 'vertical' | 'horizontal' }) {
  return (
    <RadixScrollArea.Scrollbar
      className={cx('lucent-scroll-area__scrollbar', `lucent-scroll-area__scrollbar--${orientation}`)}
      orientation={orientation}
    >
      <RadixScrollArea.Thumb className="lucent-scroll-area__thumb" />
    </RadixScrollArea.Scrollbar>
  );
}

export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof RadixScrollArea.Root>,
  ScrollAreaProps
>(function ScrollArea(
  { orientation = 'vertical', className, viewportClassName, children, ...props },
  ref,
) {
  const showVertical = orientation === 'vertical' || orientation === 'both';
  const showHorizontal = orientation === 'horizontal' || orientation === 'both';
  return (
    <RadixScrollArea.Root ref={ref} className={cx('lucent-scroll-area', className)} {...props}>
      <RadixScrollArea.Viewport className={cx('lucent-scroll-area__viewport', viewportClassName)}>
        {children}
      </RadixScrollArea.Viewport>
      {showVertical ? <Scrollbar orientation="vertical" /> : null}
      {showHorizontal ? <Scrollbar orientation="horizontal" /> : null}
      {orientation === 'both' ? <RadixScrollArea.Corner className="lucent-scroll-area__corner" /> : null}
    </RadixScrollArea.Root>
  );
});

ScrollArea.displayName = 'ScrollArea';
