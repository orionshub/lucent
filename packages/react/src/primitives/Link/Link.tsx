/**
 * Link — text anchor with external-link safety (server-safe)
 *
 * asChild renders the consumer element (e.g. a framework Link) via Slot.
 * External links get a screen-reader cue and safe rel="noopener noreferrer"
 * to prevent reverse tabnabbing.
 */
import React from 'react';
import { Slot, Slottable } from '../../utils/Slot/slot';
import { VisuallyHidden } from '../../utils/VisuallyHidden/visuallyHidden';
import { cx } from '../../utils/cx';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Render the single child element instead of an <a> (via Slot). */
  asChild?: boolean;
  /** Force external-link treatment (cue + safe rel). Also inferred from target="_blank". */
  external?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link({ asChild = false, external, className, children, target, rel, ...props }, ref) {
    const isExternal = external === true || target === '_blank';

    // Merge rel — never clobber a consumer-supplied rel; ensure the safety tokens.
    let mergedRel = rel;
    if (isExternal) {
      const tokens = new Set((rel ?? '').split(/\s+/).filter(Boolean));
      tokens.add('noopener');
      tokens.add('noreferrer');
      mergedRel = Array.from(tokens).join(' ');
    }

    const Comp = asChild ? Slot : 'a';

    return (
      <Comp
        ref={ref}
        className={cx('lucent-link', className)}
        target={target}
        rel={mergedRel}
        {...props}
      >
        <Slottable>{children}</Slottable>
        {isExternal ? <VisuallyHidden> (opens in new tab)</VisuallyHidden> : null}
      </Comp>
    );
  },
);

Link.displayName = 'Link';
