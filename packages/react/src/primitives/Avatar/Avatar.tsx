"use client";

/**
 * Avatar — image with graceful initials fallback
 *
 * Wraps radix-ui Avatar (Root/Image/Fallback). Carries "use client" —
 * Radix Avatar tracks load status via hooks.
 */
import React from 'react';
import { Avatar as RadixAvatar } from 'radix-ui';
import { cx } from '../../utils/cx';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image source. When absent or failed, the fallback renders. */
  src?: string;
  /** Alt text for the image. */
  alt?: string;
  /** Fallback content (initials / icon) shown when the image is unavailable. */
  fallback: React.ReactNode;
  /** Debounce (ms) before showing the fallback, to avoid flash on fast loads. */
  delayMs?: number;
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  function Avatar({ src, alt, fallback, delayMs = 0, className, ...props }, ref) {
    return (
      <RadixAvatar.Root
        ref={ref}
        className={cx('lucent-avatar', className)}
        {...props}
      >
        {src ? (
          <RadixAvatar.Image
            className="lucent-avatar__img"
            src={src}
            alt={alt}
          />
        ) : null}
        <RadixAvatar.Fallback className="lucent-avatar__fallback" delayMs={delayMs}>
          {fallback}
        </RadixAvatar.Fallback>
      </RadixAvatar.Root>
    );
  },
);

Avatar.displayName = 'Avatar';
