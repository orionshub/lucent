"use client";

/**
 * DropdownMenu — Radix Dropdown Menu with a glass surface (OVL-06)
 *
 * Typeahead, roving focus, collision handling, and submenus from Radix.
 * Full menu surface (items, checkbox/radio items, labels, separators, submenus).
 * Content renders through Radix's own Portal, inheriting :root tokens.
 * Consumes the shared .lucent-menu recipe. Carries "use client".
 */
import React from 'react';
import { DropdownMenu as RadixDropdownMenu } from 'radix-ui';
import { cx } from '../../utils/cx';

const Root: typeof RadixDropdownMenu.Root = RadixDropdownMenu.Root;
const Trigger: typeof RadixDropdownMenu.Trigger = RadixDropdownMenu.Trigger;
const Group: typeof RadixDropdownMenu.Group = RadixDropdownMenu.Group;
const RadioGroup: typeof RadixDropdownMenu.RadioGroup = RadixDropdownMenu.RadioGroup;
const ItemIndicator: typeof RadixDropdownMenu.ItemIndicator = RadixDropdownMenu.ItemIndicator;
const Sub: typeof RadixDropdownMenu.Sub = RadixDropdownMenu.Sub;

export type DropdownMenuContentProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Content
>;
const Content = React.forwardRef<
  React.ElementRef<typeof RadixDropdownMenu.Content>,
  DropdownMenuContentProps
>(function DropdownMenuContent({ className, sideOffset = 4, ...props }, ref) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        ref={ref}
        className={cx('lucent-menu', className)}
        sideOffset={sideOffset}
        {...props}
      />
    </RadixDropdownMenu.Portal>
  );
});
Content.displayName = 'DropdownMenu.Content';

export type DropdownMenuItemProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Item
> & { variant?: 'default' | 'destructive' };
const Item = React.forwardRef<React.ElementRef<typeof RadixDropdownMenu.Item>, DropdownMenuItemProps>(
  function DropdownMenuItem({ className, variant = 'default', ...props }, ref) {
    return (
      <RadixDropdownMenu.Item
        ref={ref}
        className={cx('lucent-menu__item', variant === 'destructive' && 'lucent-menu__item--destructive', className)}
        {...props}
      />
    );
  },
);
Item.displayName = 'DropdownMenu.Item';

export type DropdownMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.CheckboxItem
>;
const CheckboxItem = React.forwardRef<
  React.ElementRef<typeof RadixDropdownMenu.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(function DropdownMenuCheckboxItem({ className, children, ...props }, ref) {
  return (
    <RadixDropdownMenu.CheckboxItem ref={ref} className={cx('lucent-menu__item', className)} {...props}>
      <RadixDropdownMenu.ItemIndicator className="lucent-menu__indicator">✓</RadixDropdownMenu.ItemIndicator>
      {children}
    </RadixDropdownMenu.CheckboxItem>
  );
});
CheckboxItem.displayName = 'DropdownMenu.CheckboxItem';

export type DropdownMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.RadioItem
>;
const RadioItem = React.forwardRef<
  React.ElementRef<typeof RadixDropdownMenu.RadioItem>,
  DropdownMenuRadioItemProps
>(function DropdownMenuRadioItem({ className, children, ...props }, ref) {
  return (
    <RadixDropdownMenu.RadioItem ref={ref} className={cx('lucent-menu__item', className)} {...props}>
      <RadixDropdownMenu.ItemIndicator className="lucent-menu__indicator">●</RadixDropdownMenu.ItemIndicator>
      {children}
    </RadixDropdownMenu.RadioItem>
  );
});
RadioItem.displayName = 'DropdownMenu.RadioItem';

export type DropdownMenuLabelProps = React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Label>;
const Label = React.forwardRef<React.ElementRef<typeof RadixDropdownMenu.Label>, DropdownMenuLabelProps>(
  function DropdownMenuLabel({ className, ...props }, ref) {
    return <RadixDropdownMenu.Label ref={ref} className={cx('lucent-menu__label', className)} {...props} />;
  },
);
Label.displayName = 'DropdownMenu.Label';

export type DropdownMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Separator
>;
const Separator = React.forwardRef<
  React.ElementRef<typeof RadixDropdownMenu.Separator>,
  DropdownMenuSeparatorProps
>(function DropdownMenuSeparator({ className, ...props }, ref) {
  return <RadixDropdownMenu.Separator ref={ref} className={cx('lucent-menu__separator', className)} {...props} />;
});
Separator.displayName = 'DropdownMenu.Separator';

export type DropdownMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.SubTrigger
>;
const SubTrigger = React.forwardRef<
  React.ElementRef<typeof RadixDropdownMenu.SubTrigger>,
  DropdownMenuSubTriggerProps
>(function DropdownMenuSubTrigger({ className, children, ...props }, ref) {
  return (
    <RadixDropdownMenu.SubTrigger ref={ref} className={cx('lucent-menu__sub-trigger', className)} {...props}>
      {children}
      <span className="lucent-menu__sub-trigger-chevron" aria-hidden="true">›</span>
    </RadixDropdownMenu.SubTrigger>
  );
});
SubTrigger.displayName = 'DropdownMenu.SubTrigger';

export type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.SubContent
>;
const SubContent = React.forwardRef<
  React.ElementRef<typeof RadixDropdownMenu.SubContent>,
  DropdownMenuSubContentProps
>(function DropdownMenuSubContent({ className, ...props }, ref) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.SubContent ref={ref} className={cx('lucent-menu', className)} {...props} />
    </RadixDropdownMenu.Portal>
  );
});
SubContent.displayName = 'DropdownMenu.SubContent';

export const DropdownMenu = Object.assign(Root, {
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
