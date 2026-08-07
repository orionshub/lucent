/**
 * grid.test.tsx — Grid layout primitive tests (LAYOUT-01)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { Grid } from '../src/primitives/Grid/Grid';

afterEach(cleanup);

describe('Grid (LAYOUT-01)', () => {
  it('expands a numeric columns prop to repeat()', () => {
    render(<Grid data-testid="grid" columns={3} />);
    expect(screen.getByTestId('grid').style.getPropertyValue('--lucent-grid-cols')).toBe('repeat(3, minmax(0, 1fr))');
  });

  it('passes a raw template string through unchanged', () => {
    render(<Grid data-testid="grid" columns="200px 1fr" />);
    expect(screen.getByTestId('grid').style.getPropertyValue('--lucent-grid-cols')).toBe('200px 1fr');
  });

  it('maps a numeric gap to a spacing token', () => {
    render(<Grid data-testid="grid" gap={4} />);
    expect(screen.getByTestId('grid').style.getPropertyValue('--lucent-grid-gap')).toBe('var(--lucent-space-4)');
  });

  it('applies lucent-grid class and merges className', () => {
    render(<Grid data-testid="grid" className="layout" />);
    const el = screen.getByTestId('grid');
    expect(el.classList.contains('lucent-grid')).toBe(true);
    expect(el.classList.contains('layout')).toBe(true);
  });

  it('forwards ref', () => {
    let node: HTMLElement | null = null;
    render(<Grid ref={(n) => { node = n; }} data-testid="grid" />);
    expect(node).not.toBeNull();
  });

  it('passes axe with no violations', async () => {
    const { container } = render(<main><Grid columns={2} gap={4}><span>a</span><span>b</span></Grid></main>);
    await expect(container).toHaveNoViolations();
  });
});
