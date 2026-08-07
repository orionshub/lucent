/**
 * spinner.test.tsx — Spinner tests (FB-01)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { Spinner } from '../src/primitives/Spinner/Spinner';

afterEach(cleanup);

describe('Spinner (FB-01)', () => {
  it('exposes role="status" with aria-live="polite"', () => {
    render(<Spinner />);
    const status = screen.getByRole('status');
    expect(status.getAttribute('aria-live')).toBe('polite');
  });

  it('renders the default "Loading" label', () => {
    render(<Spinner />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('supports a custom label', () => {
    render(<Spinner label="Fetching data" />);
    expect(screen.getByText('Fetching data')).toBeInTheDocument();
  });

  it('applies the size modifier class', () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole('status').classList.contains('lucent-spinner--lg')).toBe(true);
  });

  it('renders a decorative aria-hidden ring', () => {
    const { container } = render(<Spinner />);
    const ring = container.querySelector('.lucent-spinner__ring');
    expect(ring).not.toBeNull();
    expect(ring!.getAttribute('aria-hidden')).toBe('true');
  });

  it('forwards ref', () => {
    let node: HTMLElement | null = null;
    render(<Spinner ref={(n) => { node = n; }} />);
    expect(node).not.toBeNull();
  });

  it('passes axe with no violations', async () => {
    const { container } = render(<main><Spinner /></main>);
    await expect(container).toHaveNoViolations();
  });
});
