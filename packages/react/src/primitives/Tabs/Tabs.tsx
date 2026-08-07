"use client";

/**
 * Tabs — Radix Tabs with roving focus, orientation, and RTL (LAYOUT-06)
 *
 * Default activation mode is automatic (follow focus); pass
 * `activationMode="manual"` to require Enter/Space. Carries "use client".
 */
import React from 'react';
import { Tabs as RadixTabs } from 'radix-ui';
import { cx } from '../../utils/cx';

export type TabsRootProps = React.ComponentPropsWithoutRef<typeof RadixTabs.Root>;
const TabsRoot = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Root>,
  TabsRootProps
>(function TabsRoot({ className, ...props }, ref) {
  return <RadixTabs.Root ref={ref} className={cx('lucent-tabs', className)} {...props} />;
});
TabsRoot.displayName = 'Tabs.Root';

export type TabsListProps = React.ComponentPropsWithoutRef<typeof RadixTabs.List>;
const TabsList = React.forwardRef<
  React.ElementRef<typeof RadixTabs.List>,
  TabsListProps
>(function TabsList({ className, ...props }, ref) {
  return <RadixTabs.List ref={ref} className={cx('lucent-tabs__list', className)} {...props} />;
});
TabsList.displayName = 'Tabs.List';

export type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger>;
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Trigger>,
  TabsTriggerProps
>(function TabsTrigger({ className, ...props }, ref) {
  return <RadixTabs.Trigger ref={ref} className={cx('lucent-tabs__trigger', className)} {...props} />;
});
TabsTrigger.displayName = 'Tabs.Trigger';

export type TabsContentProps = React.ComponentPropsWithoutRef<typeof RadixTabs.Content>;
const TabsContent = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Content>,
  TabsContentProps
>(function TabsContent({ className, ...props }, ref) {
  return <RadixTabs.Content ref={ref} className={cx('lucent-tabs__content', className)} {...props} />;
});
TabsContent.displayName = 'Tabs.Content';

export const Tabs = Object.assign(TabsRoot, {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
