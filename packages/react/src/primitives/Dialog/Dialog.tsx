"use client";

/**
 * Dialog — Radix Dialog modal with a glass backdrop (OVL-01)
 *
 * Focus trap, focus return, scroll lock, ESC, and aria-modal come from Radix.
 * Content renders through Radix's own Portal so it inherits :root tokens.
 * Carries "use client".
 */
import React from 'react';
import { Dialog as RadixDialog } from 'radix-ui';
import { cx } from '../../utils/cx';

const DialogRoot: typeof RadixDialog.Root = RadixDialog.Root;
const DialogTrigger: typeof RadixDialog.Trigger = RadixDialog.Trigger;
const DialogClose: typeof RadixDialog.Close = RadixDialog.Close;
const DialogPortal: typeof RadixDialog.Portal = RadixDialog.Portal;

export type DialogTitleProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Title>;
const DialogTitle = React.forwardRef<React.ElementRef<typeof RadixDialog.Title>, DialogTitleProps>(
  function DialogTitle({ className, ...props }, ref) {
    return <RadixDialog.Title ref={ref} className={cx('lucent-dialog__title', className)} {...props} />;
  },
);
DialogTitle.displayName = 'Dialog.Title';

export type DialogDescriptionProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Description>;
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Description>,
  DialogDescriptionProps
>(function DialogDescription({ className, ...props }, ref) {
  return <RadixDialog.Description ref={ref} className={cx('lucent-dialog__description', className)} {...props} />;
});
DialogDescription.displayName = 'Dialog.Description';

export type DialogContentProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Content> & {
  /** Overlay className passthrough. */
  overlayClassName?: string;
};
const DialogContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  DialogContentProps
>(function DialogContent({ className, overlayClassName, children, ...props }, ref) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className={cx('lucent-dialog__overlay', overlayClassName)} />
      <RadixDialog.Content ref={ref} className={cx('lucent-dialog__content', className)} {...props}>
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
});
DialogContent.displayName = 'Dialog.Content';

export const Dialog = Object.assign(DialogRoot, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Close: DialogClose,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
});
