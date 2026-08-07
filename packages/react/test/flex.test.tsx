/**
 * flex.test.tsx — Flex layout primitive tests (LAYOUT-01)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { Flex } from '../src/primitives/Flex/Flex';

afterEach(cleanup);

describe('Flex (LAYOUT-01)', () => {
  it('applies direction/align/justify custom properties', () => {
    render(<Flex data-testid="flex" direction="column" align="center" justify="space-between" />);
    const el = screen.getByTestId('flex');
    expect(el.style.getPropertyValue('--lucent-flex-direction')).toBe('column');
    expect(el.style.getPropertyValue('--lucent-flex-align')).toBe('center');
    expect(el.style.getPropertyValue('--lucent-flex-justify')).toBe('space-between');
  });

  it('maps a numeric gap to a spacing token', () => {
    render(<Flex data-testid="flex" gap={2} />);
    expect(screen.getByTestId('flex').style.getPropertyValue('--lucent-flex-gap')).toBe('var(--lucent-space-2)');
  });

  it('sets data-inline for inline flex', () => {
    render(<Flex data-testid="flex" inline />);
    expect(screen.getByTestId('flex').hasAttribute('data-inline')).toBe(true);
  });

  it('applies lucent-flex class and merges className', () => {
    render(<Flex data-testid="flex" className="row" />);
    const el = screen.getByTestId('flex');
    expect(el.classList.contains('lucent-flex')).toBe(true);
    expect(el.classList.contains('row')).toBe(true);
  });

  it('forwards ref', () => {
    let node: HTMLElement | null = null;
    render(<Flex ref={(n) => { node = n; }} data-testid="flex" />);
    expect(node).not.toBeNull();
  });

  it('passes axe with no violations', async () => {
    const { container } = render(<main><Flex gap={4}><span>a</span><span>b</span></Flex></main>);
    await expect(container).toHaveNoViolations();
  });
});
