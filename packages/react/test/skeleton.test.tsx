/**
 * skeleton.test.tsx — Skeleton tests (FB-02)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { Skeleton } from '../src/primitives/Skeleton/Skeleton';

afterEach(cleanup);

describe('Skeleton (FB-02)', () => {
  it('applies the variant modifier class', () => {
    render(<Skeleton data-testid="sk" variant="circle" />);
    expect(screen.getByTestId('sk').classList.contains('lucent-skeleton--circle')).toBe(true);
  });

  it('applies width/height as logical inline styles', () => {
    render(<Skeleton data-testid="sk" width={200} height="2rem" />);
    const el = screen.getByTestId('sk');
    expect(el.style.inlineSize).toBe('200px');
    expect(el.style.blockSize).toBe('2rem');
  });

  it('is decorative (aria-hidden)', () => {
    render(<Skeleton data-testid="sk" />);
    expect(screen.getByTestId('sk').getAttribute('aria-hidden')).toBe('true');
  });

  it('forwards ref', () => {
    let node: HTMLDivElement | null = null;
    render(<Skeleton ref={(n) => { node = n; }} data-testid="sk" />);
    expect(node).not.toBeNull();
  });

  it('passes axe with no violations', async () => {
    const { container } = render(<main><Skeleton width={200} height={16} /></main>);
    await expect(container).toHaveNoViolations();
  });
});
