"use client";

/**
 * Collapsible — Radix Collapsible with CSS-only height animation (LAYOUT-05)
 *
 * Content height animates via the Radix `--radix-collapsible-content-height`
 * custom property. Carries "use client".
 */
import React from 'react';
import { Collapsible as RadixCollapsible } from 'radix-ui';
import { cx } from '../../utils/cx';

export type CollapsibleRootProps = React.ComponentPropsWithoutRef<typeof RadixCollapsible.Root>;
const CollapsibleRoot = React.forwardRef<
  React.ElementRef<typeof RadixCollapsible.Root>,
  CollapsibleRootProps
>(function CollapsibleRoot({ className, ...props }, ref) {
  return <RadixCollapsible.Root ref={ref} className={cx('lucent-collapsible', className)} {...props} />;
});
CollapsibleRoot.displayName = 'Collapsible.Root';

export type CollapsibleTriggerProps = React.ComponentPropsWithoutRef<typeof RadixCollapsible.Trigger>;
const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof RadixCollapsible.Trigger>,
  CollapsibleTriggerProps
>(function CollapsibleTrigger({ className, ...props }, ref) {
  return <RadixCollapsible.Trigger ref={ref} className={cx('lucent-collapsible__trigger', className)} {...props} />;
});
CollapsibleTrigger.displayName = 'Collapsible.Trigger';

export type CollapsibleContentProps = React.ComponentPropsWithoutRef<typeof RadixCollapsible.Content>;
const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof RadixCollapsible.Content>,
  CollapsibleContentProps
>(function CollapsibleContent({ className, children, ...props }, ref) {
  return (
    <RadixCollapsible.Content ref={ref} className={cx('lucent-collapsible__content', className)} {...props}>
      <div className="lucent-collapsible__content-inner">{children}</div>
    </RadixCollapsible.Content>
  );
});
CollapsibleContent.displayName = 'Collapsible.Content';

export const Collapsible = Object.assign(CollapsibleRoot, {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
});
