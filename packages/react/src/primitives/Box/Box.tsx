/**
 * Box — token-driven spacing/padding layout primitive (LAYOUT-01)
 *
 * Server-safe (no hooks, no "use client"). Polymorphic via `as` / `asChild`.
 * Spacing props map to `--lucent-space-*` tokens applied as inline CSS custom
 * properties consumed by box.css — zero style runtime.
 */
import React from 'react';
import { cx } from '../../utils/cx';
import { Slot } from '../../utils/Slot/slot';
import { resolveSpace, setVar } from '../../utils/space';

type SpaceProp = number | string;

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  /** Element to render. Defaults to `div`. */
  as?: React.ElementType;
  /** Render the single child, merging props/ref onto it (Radix Slot). */
  asChild?: boolean;
  /** Padding (all sides). */
  p?: SpaceProp;
  /** Padding inline (start + end). */
  px?: SpaceProp;
  /** Padding block (start + end). */
  py?: SpaceProp;
  /** Padding block-start. */
  pt?: SpaceProp;
  /** Padding inline-end. */
  pr?: SpaceProp;
  /** Padding block-end. */
  pb?: SpaceProp;
  /** Padding inline-start. */
  pl?: SpaceProp;
  /** Margin (all sides). */
  m?: SpaceProp;
  /** Margin inline (start + end). */
  mx?: SpaceProp;
  /** Margin block (start + end). */
  my?: SpaceProp;
}

export const Box = React.forwardRef<HTMLElement, BoxProps>(function Box(
  { as: Tag = 'div', asChild, p, px, py, pt, pr, pb, pl, m, mx, my, className, style, ...props },
  ref,
) {
  const vars: Record<string, string | number> = {};
  setVar(vars, '--lucent-box-p', resolveSpace(p));
  setVar(vars, '--lucent-box-px', resolveSpace(px));
  setVar(vars, '--lucent-box-py', resolveSpace(py));
  setVar(vars, '--lucent-box-pt', resolveSpace(pt));
  setVar(vars, '--lucent-box-pr', resolveSpace(pr));
  setVar(vars, '--lucent-box-pb', resolveSpace(pb));
  setVar(vars, '--lucent-box-pl', resolveSpace(pl));
  setVar(vars, '--lucent-box-m', resolveSpace(m));
  setVar(vars, '--lucent-box-mx', resolveSpace(mx));
  setVar(vars, '--lucent-box-my', resolveSpace(my));

  const Comp = asChild ? Slot : Tag;
  return (
    <Comp
      ref={ref}
      className={cx('lucent-box', className)}
      style={{ ...vars, ...style }}
      {...props}
    />
  );
});

Box.displayName = 'Box';
