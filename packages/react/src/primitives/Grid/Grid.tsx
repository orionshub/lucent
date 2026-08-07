/**
 * Grid — token-driven CSS grid layout primitive (LAYOUT-01)
 *
 * Server-safe. Polymorphic via `as` / `asChild`. A numeric `columns`/`rows`
 * expands to `repeat(n, minmax(0, 1fr))`; a raw string passes through as a
 * grid template. Gap props map to spacing tokens.
 */
import React from 'react';
import { cx } from '../../utils/cx';
import { Slot } from '../../utils/Slot/slot';
import { resolveSpace, setVar } from '../../utils/space';

type SpaceProp = number | string;

function resolveTracks(v: number | string | undefined): string | undefined {
  if (v === undefined) return undefined;
  if (typeof v === 'number') return `repeat(${v}, minmax(0, 1fr))`;
  if (/^\d+$/.test(v)) return `repeat(${v}, minmax(0, 1fr))`;
  return v;
}

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  asChild?: boolean;
  /** Number of equal columns, or a raw grid-template-columns string. */
  columns?: number | string;
  /** Number of equal rows, or a raw grid-template-rows string. */
  rows?: number | string;
  /** Gap between cells. */
  gap?: SpaceProp;
  /** Column gap override. */
  columnGap?: SpaceProp;
  /** Row gap override. */
  rowGap?: SpaceProp;
  /** grid-auto-flow. */
  flow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense';
  /** align-items. */
  align?: React.CSSProperties['alignItems'];
  /** justify-items. */
  justify?: React.CSSProperties['justifyItems'];
  /** Padding (all sides). */
  p?: SpaceProp;
  /** Padding inline. */
  px?: SpaceProp;
  /** Padding block. */
  py?: SpaceProp;
}

export const Grid = React.forwardRef<HTMLElement, GridProps>(function Grid(
  { as: Tag = 'div', asChild, columns, rows, gap, columnGap, rowGap, flow, align, justify, p, px, py, className, style, ...props },
  ref,
) {
  const vars: Record<string, string | number> = {};
  setVar(vars, '--lucent-grid-cols', resolveTracks(columns));
  setVar(vars, '--lucent-grid-rows', resolveTracks(rows));
  setVar(vars, '--lucent-grid-gap', resolveSpace(gap));
  setVar(vars, '--lucent-grid-col-gap', resolveSpace(columnGap));
  setVar(vars, '--lucent-grid-row-gap', resolveSpace(rowGap));
  setVar(vars, '--lucent-grid-flow', flow);
  setVar(vars, '--lucent-grid-align', align as string | undefined);
  setVar(vars, '--lucent-grid-justify', justify as string | undefined);
  setVar(vars, '--lucent-box-p', resolveSpace(p));
  setVar(vars, '--lucent-box-px', resolveSpace(px));
  setVar(vars, '--lucent-box-py', resolveSpace(py));

  const Comp = asChild ? Slot : Tag;
  return (
    <Comp
      ref={ref}
      className={cx('lucent-grid', className)}
      style={{ ...vars, ...style }}
      {...props}
    />
  );
});

Grid.displayName = 'Grid';
