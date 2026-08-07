"use client";

/**
 * Toast — Radix Toast system with a portalled aria-live viewport (OVL-08)
 *
 * Provider + Viewport + Root, with swipe-to-dismiss and pause-on-hover from
 * Radix. Declarative primitives (no bundled imperative store — compose your
 * own). Carries "use client".
 */
import React from 'react';
import { Toast as RadixToast } from 'radix-ui';
import { cx } from '../../utils/cx';

const ToastProvider: typeof RadixToast.Provider = RadixToast.Provider;
const ToastAction: typeof RadixToast.Action = RadixToast.Action;
const ToastClose: typeof RadixToast.Close = RadixToast.Close;

export type ToastViewportProps = React.ComponentPropsWithoutRef<typeof RadixToast.Viewport>;
const ToastViewport = React.forwardRef<
  React.ElementRef<typeof RadixToast.Viewport>,
  ToastViewportProps
>(function ToastViewport({ className, ...props }, ref) {
  return <RadixToast.Viewport ref={ref} className={cx('lucent-toast__viewport', className)} {...props} />;
});
ToastViewport.displayName = 'Toast.Viewport';

export type ToastTone = 'info' | 'success' | 'warning' | 'danger';
export type ToastRootProps = React.ComponentPropsWithoutRef<typeof RadixToast.Root> & {
  /** Semantic tone. Defaults to `info`. */
  tone?: ToastTone;
};
const ToastRoot = React.forwardRef<React.ElementRef<typeof RadixToast.Root>, ToastRootProps>(
  function ToastRoot({ className, tone = 'info', ...props }, ref) {
    return (
      <RadixToast.Root
        ref={ref}
        className={cx('lucent-toast', `lucent-toast--${tone}`, className)}
        {...props}
      />
    );
  },
);
ToastRoot.displayName = 'Toast.Root';

export type ToastTitleProps = React.ComponentPropsWithoutRef<typeof RadixToast.Title>;
const ToastTitle = React.forwardRef<React.ElementRef<typeof RadixToast.Title>, ToastTitleProps>(
  function ToastTitle({ className, ...props }, ref) {
    return <RadixToast.Title ref={ref} className={cx('lucent-toast__title', className)} {...props} />;
  },
);
ToastTitle.displayName = 'Toast.Title';

export type ToastDescriptionProps = React.ComponentPropsWithoutRef<typeof RadixToast.Description>;
const ToastDescription = React.forwardRef<
  React.ElementRef<typeof RadixToast.Description>,
  ToastDescriptionProps
>(function ToastDescription({ className, ...props }, ref) {
  return <RadixToast.Description ref={ref} className={cx('lucent-toast__description', className)} {...props} />;
});
ToastDescription.displayName = 'Toast.Description';

export const Toast = Object.assign(ToastRoot, {
  Provider: ToastProvider,
  Viewport: ToastViewport,
  Root: ToastRoot,
  Title: ToastTitle,
  Description: ToastDescription,
  Action: ToastAction,
  Close: ToastClose,
});

export { ToastProvider };
