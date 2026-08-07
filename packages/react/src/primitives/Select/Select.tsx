"use client";

/**
 * Select — full Radix Select namespace wrapped with glass styling (FORM-08)
 *
 * Exposes all necessary members as named Lucent-styled exports.
 * The glass effect goes directly on the Trigger <button> (not a wrapper div)
 * because <button> is NOT a replaced form element, so backdrop-filter works.
 *
 * Select.Portal is Radix's own portal — do NOT use Lucent Portal utility here.
 * Portalled dropdown inherits :root tokens automatically.
 */
import React from 'react';
import { Select as RadixSelect } from 'radix-ui';
import { cx } from '../../utils/cx';

// ─── Root (stateless orchestration — typed to avoid dts issues) ──────────
export const SelectRoot: typeof RadixSelect.Root = RadixSelect.Root;

// ─── Trigger (glass surface directly on the button element) ──────────────
export type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger> & {
  className?: string;
};
export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Trigger>,
  SelectTriggerProps
>(function SelectTrigger({ className, children, ...props }, ref) {
  return (
    <RadixSelect.Trigger
      ref={ref}
      className={cx('lucent-select__trigger', className)}
      {...props}
    >
      {children}
    </RadixSelect.Trigger>
  );
});
SelectTrigger.displayName = 'SelectTrigger';

// ─── Value ────────────────────────────────────────────────────────────────
export type SelectValueProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Value>;
export const SelectValue = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Value>,
  SelectValueProps
>(function SelectValue({ ...props }, ref) {
  return <RadixSelect.Value ref={ref} className="lucent-select__value" {...props} />;
});
SelectValue.displayName = 'SelectValue';

// ─── Icon ─────────────────────────────────────────────────────────────────
export type SelectIconProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Icon>;
export const SelectIcon = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Icon>,
  SelectIconProps
>(function SelectIcon({ className, children, ...props }, ref) {
  return (
    <RadixSelect.Icon ref={ref} className={cx('lucent-select__icon', className)} {...props}>
      {children ?? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      )}
    </RadixSelect.Icon>
  );
});
SelectIcon.displayName = 'SelectIcon';

// ─── Content (portalled glass dropdown) ──────────────────────────────────
export type SelectContentProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Content> & {
  className?: string;
};
export const SelectContent = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Content>,
  SelectContentProps
>(function SelectContent({ className, children, ...props }, ref) {
  return (
    <RadixSelect.Portal>
      <RadixSelect.Content
        ref={ref}
        className={cx('lucent-select__content', className)}
        position="popper"
        sideOffset={4}
        {...props}
      >
        <RadixSelect.ScrollUpButton className="lucent-select__scroll-btn">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M18 15l-6-6-6 6" /></svg>
        </RadixSelect.ScrollUpButton>
        <RadixSelect.Viewport className="lucent-select__viewport">
          {children}
        </RadixSelect.Viewport>
        <RadixSelect.ScrollDownButton className="lucent-select__scroll-btn">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
        </RadixSelect.ScrollDownButton>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  );
});
SelectContent.displayName = 'SelectContent';

// ─── Item ─────────────────────────────────────────────────────────────────
export type SelectItemProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Item> & {
  className?: string;
};
export const SelectItem = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  SelectItemProps
>(function SelectItem({ className, children, ...props }, ref) {
  return (
    <RadixSelect.Item
      ref={ref}
      className={cx('lucent-select__item', className)}
      {...props}
    >
      <RadixSelect.ItemIndicator className="lucent-select__item-indicator">
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <polyline points="2,6 5,9 10,3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </RadixSelect.ItemIndicator>
      <RadixSelect.ItemText className="lucent-select__item-text">
        {children}
      </RadixSelect.ItemText>
    </RadixSelect.Item>
  );
});
SelectItem.displayName = 'SelectItem';

// ─── Group / Label / Separator ───────────────────────────────────────────
export type SelectGroupProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Group> & { className?: string };
export const SelectGroup = React.forwardRef<React.ElementRef<typeof RadixSelect.Group>, SelectGroupProps>(
  function SelectGroup({ className, ...props }, ref) {
    return <RadixSelect.Group ref={ref} className={cx('lucent-select__group', className)} {...props} />;
  },
);
SelectGroup.displayName = 'SelectGroup';

export type SelectLabelProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Label> & { className?: string };
export const SelectLabel = React.forwardRef<React.ElementRef<typeof RadixSelect.Label>, SelectLabelProps>(
  function SelectLabel({ className, ...props }, ref) {
    return <RadixSelect.Label ref={ref} className={cx('lucent-select__label', className)} {...props} />;
  },
);
SelectLabel.displayName = 'SelectLabel';

export type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Separator> & { className?: string };
export const SelectSeparator = React.forwardRef<React.ElementRef<typeof RadixSelect.Separator>, SelectSeparatorProps>(
  function SelectSeparator({ className, ...props }, ref) {
    return <RadixSelect.Separator ref={ref} className={cx('lucent-select__separator', className)} {...props} />;
  },
);
SelectSeparator.displayName = 'SelectSeparator';
