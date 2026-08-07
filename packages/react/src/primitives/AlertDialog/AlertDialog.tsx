"use client";

/**
 * AlertDialog — Radix Alert Dialog for forced actions (OVL-02)
 *
 * Radix focuses the Cancel (least-destructive) action by default and requires
 * an explicit choice (no outside-dismiss). Content renders through Radix's own
 * Portal, inheriting :root tokens. Carries "use client".
 */
import React from 'react';
import { AlertDialog as RadixAlertDialog } from 'radix-ui';
import { cx } from '../../utils/cx';

const AlertDialogRoot: typeof RadixAlertDialog.Root = RadixAlertDialog.Root;
const AlertDialogTrigger: typeof RadixAlertDialog.Trigger = RadixAlertDialog.Trigger;
const AlertDialogAction: typeof RadixAlertDialog.Action = RadixAlertDialog.Action;
const AlertDialogCancel: typeof RadixAlertDialog.Cancel = RadixAlertDialog.Cancel;

export type AlertDialogTitleProps = React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Title>;
const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof RadixAlertDialog.Title>,
  AlertDialogTitleProps
>(function AlertDialogTitle({ className, ...props }, ref) {
  return <RadixAlertDialog.Title ref={ref} className={cx('lucent-dialog__title', className)} {...props} />;
});
AlertDialogTitle.displayName = 'AlertDialog.Title';

export type AlertDialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Description
>;
const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof RadixAlertDialog.Description>,
  AlertDialogDescriptionProps
>(function AlertDialogDescription({ className, ...props }, ref) {
  return (
    <RadixAlertDialog.Description
      ref={ref}
      className={cx('lucent-dialog__description', className)}
      {...props}
    />
  );
});
AlertDialogDescription.displayName = 'AlertDialog.Description';

export type AlertDialogContentProps = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Content
> & {
  overlayClassName?: string;
};
const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof RadixAlertDialog.Content>,
  AlertDialogContentProps
>(function AlertDialogContent({ className, overlayClassName, children, ...props }, ref) {
  return (
    <RadixAlertDialog.Portal>
      <RadixAlertDialog.Overlay className={cx('lucent-dialog__overlay', overlayClassName)} />
      <RadixAlertDialog.Content
        ref={ref}
        className={cx('lucent-dialog__content', 'lucent-alert-dialog__content', className)}
        {...props}
      >
        {children}
      </RadixAlertDialog.Content>
    </RadixAlertDialog.Portal>
  );
});
AlertDialogContent.displayName = 'AlertDialog.Content';

export const AlertDialog = Object.assign(AlertDialogRoot, {
  Root: AlertDialogRoot,
  Trigger: AlertDialogTrigger,
  Content: AlertDialogContent,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel,
});
