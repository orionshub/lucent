/**
 * empty-state.test.tsx — EmptyState tests (FB-03)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { EmptyState } from '../src/primitives/EmptyState/EmptyState';

afterEach(cleanup);

describe('EmptyState (FB-03)', () => {
  it('renders title, description, and action', () => {
    render(
      <EmptyState
        title="No results"
        description="Try a different search."
        action={<button type="button">Reset</button>}
      />,
    );
    expect(screen.getByText('No results')).toBeInTheDocument();
    expect(screen.getByText('Try a different search.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });

  it('renders a decorative aria-hidden icon', () => {
    const { container } = render(<EmptyState title="Empty" icon={<svg data-testid="ico" />} />);
    const iconWrap = container.querySelector('.lucent-empty-state__icon');
    expect(iconWrap).not.toBeNull();
    expect(iconWrap!.getAttribute('aria-hidden')).toBe('true');
  });

  it('composes the glass surface', () => {
    render(<EmptyState data-testid="es" title="Empty" />);
    const el = screen.getByTestId('es');
    expect(el.classList.contains('lucent-empty-state')).toBe(true);
    expect(el.classList.contains('lucent-glass')).toBe(true);
  });

  it('forwards ref', () => {
    let node: HTMLDivElement | null = null;
    render(<EmptyState ref={(n) => { node = n; }} title="Empty" />);
    expect(node).not.toBeNull();
  });

  it('passes axe with no violations', async () => {
    const { container } = render(<main><EmptyState title="Empty" description="Nothing here." /></main>);
    await expect(container).toHaveNoViolations();
  });
});
