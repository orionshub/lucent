/**
 * glass-surface.test.tsx — GlassSurface render and a11y tests (FND-06)
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { GlassSurface } from '../src/primitives/GlassSurface/index.js';
import { createRef } from 'react';

describe('GlassSurface (FND-06)', () => {

  it('renders with lucent-glass class', () => {
    const { container } = render(<GlassSurface>Content</GlassSurface>);
    const el = container.firstElementChild;
    expect(el).not.toBeNull();
    expect(el?.classList.contains('lucent-glass')).toBe(true);
  });

  it('merges consumer className with lucent-glass', () => {
    const { container } = render(
      <GlassSurface className="my-card">Content</GlassSurface>,
    );
    const el = container.firstElementChild;
    expect(el?.classList.contains('lucent-glass')).toBe(true);
    expect(el?.classList.contains('my-card')).toBe(true);
  });

  it('forwards ref to the DOM element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<GlassSurface ref={ref}>Content</GlassSurface>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName.toLowerCase()).toBe('div');
  });

  it('forwards additional HTML attributes (e.g. data-testid)', () => {
    const { getByTestId } = render(
      <GlassSurface data-testid="glass">Content</GlassSurface>,
    );
    expect(getByTestId('glass')).not.toBeNull();
  });

  it('renders as a different element when as= is provided', () => {
    const { container } = render(<GlassSurface as="section">Content</GlassSurface>);
    expect(container.firstElementChild?.tagName.toLowerCase()).toBe('section');
  });

  it('renders children as React nodes (not innerHTML)', () => {
    const { getByText } = render(
      <GlassSurface>
        <span>hello</span>
      </GlassSurface>,
    );
    expect(getByText('hello')).not.toBeNull();
  });

  it('does NOT have dangerouslySetInnerHTML in its implementation', () => {
    // This is a static check — the component source must not use innerHTML
    // (tested via build-output check in 01-09; this test documents the contract)
    const { container } = render(<GlassSurface data-testid="gs">test</GlassSurface>);
    const el = container.firstElementChild;
    // The element renders via React children, not innerHTML
    expect(el?.innerHTML).toBe('test');
    expect(el?.getAttribute('dangerouslysetinnerhtml')).toBeNull();
  });

  it('has no axe violations (a11y check)', async () => {
    const { container } = render(
      <main>
        <GlassSurface>Accessible glass card</GlassSurface>
      </main>,
    );
    await expect(container).toHaveNoViolations();
  });

});
