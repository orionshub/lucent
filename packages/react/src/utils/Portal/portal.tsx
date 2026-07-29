"use client";

/**
 * Portal — mount children outside the parent DOM subtree
 *
 * The load-bearing dependency for every later overlay (Dialog, Popover,
 * Tooltip, Toast). Wraps the unified Radix Portal.Root, mounting into
 * document.body by default and honoring a `container` override.
 *
 * Carries "use client" — Radix Portal uses mount hooks.
 * Does NOT touch `document` at module top level (SSR import-safe).
 */
import React from 'react';
import { Portal as RadixPortal } from 'radix-ui';

export interface PortalProps {
  /** The content to render into the portal. */
  children?: React.ReactNode;
  /**
   * The DOM node to mount into. Defaults to document.body (Radix default).
   */
  container?: Element | DocumentFragment | null;
}

export const Portal = React.forwardRef<HTMLDivElement, PortalProps>(
  function Portal({ container, children, ...props }, ref) {
    return (
      <RadixPortal.Root ref={ref} container={container} {...props}>
        {children}
      </RadixPortal.Root>
    );
  },
);

Portal.displayName = 'Portal';
