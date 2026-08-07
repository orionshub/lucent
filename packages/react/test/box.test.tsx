/**
 * box.test.tsx — Box layout primitive tests (LAYOUT-01)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { Box } from '../src/primitives/Box/Box';

afterEach(cleanup);

describe('Box (LAYOUT-01)', () => {
  it('renders a div by default', () => {
    render(<Box data-testid="box">content</Box>);
    expect(screen.getByTestId('box').tagName).toBe('DIV');
  });

  it('maps a numeric padding prop to a spacing token custom property', () => {
    render(<Box data-testid="box" p={4} />);
    const el = screen.getByTestId('box');
    expect(el.style.getPropertyValue('--lucent-box-p')).toBe('var(--lucent-space-4)');
  });

  it('passes a raw string spacing value through unchanged', () => {
    render(<Box data-testid="box" px="2rem" />);
    expect(screen.getByTestId('box').style.getPropertyValue('--lucent-box-px')).toBe('2rem');
  });

  it('does not set custom properties for omitted props', () => {
    render(<Box data-testid="box" p={2} />);
    const el = screen.getByTestId('box');
    expect(el.style.getPropertyValue('--lucent-box-m')).toBe('');
  });

  it('renders as a custom element via `as`', () => {
    render(<Box as="section" data-testid="box" />);
    expect(screen.getByTestId('box').tagName).toBe('SECTION');
  });

  it('merges className with lucent-box', () => {
    render(<Box data-testid="box" className="custom" />);
    const el = screen.getByTestId('box');
    expect(el.classList.contains('lucent-box')).toBe(true);
    expect(el.classList.contains('custom')).toBe(true);
  });

  it('asChild renders the single child element', () => {
    render(
      <Box asChild p={2}>
        <article data-testid="child">hi</article>
      </Box>,
    );
    const el = screen.getByTestId('child');
    expect(el.tagName).toBe('ARTICLE');
    expect(el.classList.contains('lucent-box')).toBe(true);
  });

  it('forwards ref to the DOM node', () => {
    let node: HTMLElement | null = null;
    render(<Box ref={(n) => { node = n; }} data-testid="box" />);
    expect(node).not.toBeNull();
  });

  it('passes axe with no violations', async () => {
    const { container } = render(<main><Box p={4}>content</Box></main>);
    await expect(container).toHaveNoViolations();
  });
});
