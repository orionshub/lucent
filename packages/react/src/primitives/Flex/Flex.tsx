/**
 * Flex — token-driven flexbox layout primitive (LAYOUT-01)
 *
 * Server-safe. Polymorphic via `as` / `asChild`. Flex props + spacing props
 * map to inline CSS custom properties consumed by flex.css.
 */
import React from 'react';
import { cx } from '../../utils/cx';
import { Slot } from '../../utils/Slot/slot';
import { resolveSpace, setVar } from '../../utils/space';

type SpaceProp = number | string;

export interface FlexProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  asChild?: boolean;
  /** flex-direction. Defaults to `row`. */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /** align-items. */
  align?: React.CSSProperties['alignItems'];
  /** justify-content. */
  justify?: React.CSSProperties['justifyContent'];
  /** flex-wrap. */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  /** Gap between items (spacing token or raw value). */
  gap?: SpaceProp;
  /** Render as inline-flex. */
  inline?: boolean;
  /** Padding (all sides). */
  p?: SpaceProp;
  /** Padding inline. */
  px?: SpaceProp;
  /** Padding block. */
  py?: SpaceProp;
}

export const Flex = React.forwardRef<HTMLElement, FlexProps>(function Flex(
  { as: Tag = 'div', asChild, direction, align, justify, wrap, gap, inline, p, px, py, className, style, ...props },
  ref,
) {
  const vars: Record<string, string | number> = {};
  setVar(vars, '--lucent-flex-direction', direction);
  setVar(vars, '--lucent-flex-align', align as string | undefined);
  setVar(vars, '--lucent-flex-justify', justify as string | undefined);
  setVar(vars, '--lucent-flex-wrap', wrap);
  setVar(vars, '--lucent-flex-gap', resolveSpace(gap));
  setVar(vars, '--lucent-box-p', resolveSpace(p));
  setVar(vars, '--lucent-box-px', resolveSpace(px));
  setVar(vars, '--lucent-box-py', resolveSpace(py));

  const Comp = asChild ? Slot : Tag;
  return (
    <Comp
      ref={ref}
      className={cx('lucent-flex', className)}
      data-inline={inline ? '' : undefined}
      style={{ ...vars, ...style }}
      {...props}
    />
  );
});

Flex.displayName = 'Flex';
