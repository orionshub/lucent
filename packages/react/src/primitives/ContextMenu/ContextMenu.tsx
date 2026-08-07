"use client";

/**
 * ContextMenu — Radix Context Menu with a glass surface (OVL-07)
 *
 * Opens on right-click AND the keyboard context-menu key / Shift+F10.
 * Typeahead, roving focus, collision, and submenus from Radix. Reuses the
 * shared .lucent-menu recipe. Content renders through Radix's own Portal,
 * inheriting :root tokens. Carries "use client".
 */
import React from 'react';
import { ContextMenu as RadixContextMenu } from 'radix-ui';
import { cx } from '../../utils/cx';

const Root: typeof RadixContextMenu.Root = RadixContextMenu.Root;
const Trigger: typeof RadixContextMenu.Trigger = RadixContextMenu.Trigger;
const Group: typeof RadixContextMenu.Group = RadixContextMenu.Group;
const RadioGroup: typeof RadixContextMenu.RadioGroup = RadixContextMenu.RadioGroup;
const ItemIndicator: typeof RadixContextMenu.ItemIndicator = RadixContextMenu.ItemIndicator;
const Sub: typeof RadixContextMenu.Sub = RadixContextMenu.Sub;

export type ContextMenuContentProps = React.ComponentPropsWithoutRef<
  typeof RadixContextMenu.Content
>;
const Content = React.forwardRef<
  React.ElementRef<typeof RadixContextMenu.Content>,
  ContextMenuContentProps
>(function ContextMenuContent({ className, ...props }, ref) {
  return (
    <RadixContextMenu.Portal>
      <RadixContextMenu.Content ref={ref} className={cx('lucent-menu', className)} {...props} />
    </RadixContextMenu.Portal>
  );
});
Content.displayName = 'ContextMenu.Content';

export type ContextMenuItemProps = React.ComponentPropsWithoutRef<
  typeof RadixContextMenu.Item
> & { variant?: 'default' | 'destructive' };
const Item = React.forwardRef<React.ElementRef<typeof RadixContextMenu.Item>, ContextMenuItemProps>(
  function ContextMenuItem({ className, variant = 'default', ...props }, ref) {
    return (
      <RadixContextMenu.Item
        ref={ref}
        className={cx('lucent-menu__item', variant === 'destructive' && 'lucent-menu__item--destructive', className)}
        {...props}
      />
    );
  },
);
Item.displayName = 'ContextMenu.Item';

export type ContextMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof RadixContextMenu.CheckboxItem
>;
const CheckboxItem = React.forwardRef<
  React.ElementRef<typeof RadixContextMenu.CheckboxItem>,
  ContextMenuCheckboxItemProps
>(function ContextMenuCheckboxItem({ className, children, ...props }, ref) {
  return (
    <RadixContextMenu.CheckboxItem ref={ref} className={cx('lucent-menu__item', className)} {...props}>
      <RadixContextMenu.ItemIndicator className="lucent-menu__indicator">✓</RadixContextMenu.ItemIndicator>
      {children}
    </RadixContextMenu.CheckboxItem>
  );
});
CheckboxItem.displayName = 'ContextMenu.CheckboxItem';

export type ContextMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof RadixContextMenu.RadioItem
>;
const RadioItem = React.forwardRef<
  React.ElementRef<typeof RadixContextMenu.RadioItem>,
  ContextMenuRadioItemProps
>(function ContextMenuRadioItem({ className, children, ...props }, ref) {
  return (
    <RadixContextMenu.RadioItem ref={ref} className={cx('lucent-menu__item', className)} {...props}>
      <RadixContextMenu.ItemIndicator className="lucent-menu__indicator">●</RadixContextMenu.ItemIndicator>
      {children}
    </RadixContextMenu.RadioItem>
  );
});
RadioItem.displayName = 'ContextMenu.RadioItem';

export type ContextMenuLabelProps = React.ComponentPropsWithoutRef<typeof RadixContextMenu.Label>;
const Label = React.forwardRef<React.ElementRef<typeof RadixContextMenu.Label>, ContextMenuLabelProps>(
  function ContextMenuLabel({ className, ...props }, ref) {
    return <RadixContextMenu.Label ref={ref} className={cx('lucent-menu__label', className)} {...props} />;
  },
);
Label.displayName = 'ContextMenu.Label';

export type ContextMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof RadixContextMenu.Separator
>;
const Separator = React.forwardRef<
  React.ElementRef<typeof RadixContextMenu.Separator>,
  ContextMenuSeparatorProps
>(function ContextMenuSeparator({ className, ...props }, ref) {
  return <RadixContextMenu.Separator ref={ref} className={cx('lucent-menu__separator', className)} {...props} />;
});
Separator.displayName = 'ContextMenu.Separator';

export type ContextMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof RadixContextMenu.SubTrigger
>;
const SubTrigger = React.forwardRef<
  React.ElementRef<typeof RadixContextMenu.SubTrigger>,
  ContextMenuSubTriggerProps
>(function ContextMenuSubTrigger({ className, children, ...props }, ref) {
  return (
    <RadixContextMenu.SubTrigger ref={ref} className={cx('lucent-menu__sub-trigger', className)} {...props}>
      {children}
      <span className="lucent-menu__sub-trigger-chevron" aria-hidden="true">›</span>
    </RadixContextMenu.SubTrigger>
  );
});
SubTrigger.displayName = 'ContextMenu.SubTrigger';

export type ContextMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof RadixContextMenu.SubContent
>;
const SubContent = React.forwardRef<
  React.ElementRef<typeof RadixContextMenu.SubContent>,
  ContextMenuSubContentProps
>(function ContextMenuSubContent({ className, ...props }, ref) {
  return (
    <RadixContextMenu.Portal>
      <RadixContextMenu.SubContent ref={ref} className={cx('lucent-menu', className)} {...props} />
    </RadixContextMenu.Portal>
  );
});
SubContent.displayName = 'ContextMenu.SubContent';

export const ContextMenu = Object.assign(Root, {
  Root,
  Trigger,
  Content,
  Item,
  CheckboxItem,
  RadioGroup,
  RadioItem,
  ItemIndicator,
  Label,
  Separator,
  Group,
  Sub,
  SubTrigger,
  SubContent,
});
