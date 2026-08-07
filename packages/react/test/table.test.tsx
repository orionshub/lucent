/**
 * table.test.tsx — Table semantic markup tests (DATA-01)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { Table } from '../src/primitives/Table/Table';

afterEach(cleanup);

function renderTable() {
  return render(
    <Table>
      <Table.Caption>Quarterly results</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>Quarter</Table.Head>
          <Table.Head>Revenue</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Head scope="row">Q1</Table.Head>
          <Table.Cell>$1.2M</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>,
  );
}

describe('Table (DATA-01)', () => {
  it('renders a semantic table with a caption', () => {
    renderTable();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Quarterly results').tagName).toBe('CAPTION');
  });

  it('column headers default to scope="col"', () => {
    renderTable();
    const colHeader = screen.getByRole('columnheader', { name: 'Quarter' });
    expect(colHeader.getAttribute('scope')).toBe('col');
  });

  it('supports scope="row" headers', () => {
    renderTable();
    const rowHeader = screen.getByRole('rowheader', { name: 'Q1' });
    expect(rowHeader.getAttribute('scope')).toBe('row');
  });

  it('applies lucent-table class and forwards ref', () => {
    let node: HTMLTableElement | null = null;
    render(<Table ref={(n) => { node = n; }}><Table.Body><Table.Row><Table.Cell>x</Table.Cell></Table.Row></Table.Body></Table>);
    expect(node).not.toBeNull();
    expect(node!.classList.contains('lucent-table')).toBe(true);
  });

  it('passes axe with no violations', async () => {
    const { container } = renderTable();
    await expect(container).toHaveNoViolations();
  });
});
