/**
 * Table — semantic, static data table (DATA-01)
 *
 * Server-safe compound components rendering real <table> markup with
 * <caption> and column/row header `scope`. No sort/select/paginate — that
 * behavior belongs to the v2 Data Table which composes on top of this.
 */
import React from 'react';
import { cx } from '../../utils/cx';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}
const TableRoot = React.forwardRef<HTMLTableElement, TableProps>(function Table(
  { className, ...props },
  ref,
) {
  return <table ref={ref} className={cx('lucent-table', className)} {...props} />;
});
TableRoot.displayName = 'Table';

export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {}
const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  function TableCaption({ className, ...props }, ref) {
    return <caption ref={ref} className={cx('lucent-table__caption', className)} {...props} />;
  },
);
TableCaption.displayName = 'Table.Caption';

export interface TableSectionProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
const TableHeader = React.forwardRef<HTMLTableSectionElement, TableSectionProps>(
  function TableHeader({ className, ...props }, ref) {
    return <thead ref={ref} className={cx('lucent-table__header', className)} {...props} />;
  },
);
TableHeader.displayName = 'Table.Header';

const TableBody = React.forwardRef<HTMLTableSectionElement, TableSectionProps>(
  function TableBody({ className, ...props }, ref) {
    return <tbody ref={ref} className={cx('lucent-table__body', className)} {...props} />;
  },
);
TableBody.displayName = 'Table.Body';

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableSectionProps>(
  function TableFooter({ className, ...props }, ref) {
    return <tfoot ref={ref} className={cx('lucent-table__footer', className)} {...props} />;
  },
);
TableFooter.displayName = 'Table.Footer';

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}
const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { className, ...props },
  ref,
) {
  return <tr ref={ref} className={cx('lucent-table__row', className)} {...props} />;
});
TableRow.displayName = 'Table.Row';

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}
const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { className, scope = 'col', ...props },
  ref,
) {
  return <th ref={ref} scope={scope} className={cx('lucent-table__head', className)} {...props} />;
});
TableHead.displayName = 'Table.Head';

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}
const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { className, ...props },
  ref,
) {
  return <td ref={ref} className={cx('lucent-table__cell', className)} {...props} />;
});
TableCell.displayName = 'Table.Cell';

export const Table = Object.assign(TableRoot, {
  Caption: TableCaption,
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
});
