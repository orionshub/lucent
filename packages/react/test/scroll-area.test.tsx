/**
 * scroll-area.test.tsx — ScrollArea tests (LAYOUT-03)
 */
import { describe, it, expect, afterEach, beforeAll } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { ScrollArea } from '../src/primitives/ScrollArea/ScrollArea';

// Radix Scroll Area observes size; provide a ResizeObserver stub for happy-dom.
beforeAll(() => {
  if (!('ResizeObserver' in globalThis)) {
    // @ts-expect-error - minimal stub
    globalThis.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
});

afterEach(cleanup);

describe('ScrollArea (LAYOUT-03)', () => {
  it('renders a viewport containing the children', () => {
    render(
      <ScrollArea data-testid="sa" style={{ height: 100 }}>
        <div data-testid="content">scrollable content</div>
      </ScrollArea>,
    );
    const root = screen.getByTestId('sa');
    expect(root.classList.contains('lucent-scroll-area')).toBe(true);
    const viewport = root.querySelector('.lucent-scroll-area__viewport');
    expect(viewport).not.toBeNull();
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('forwards ref to the root', () => {
    let node: HTMLElement | null = null;
    render(
      <ScrollArea ref={(n) => { node = n; }} data-testid="sa">
        <p>content</p>
      </ScrollArea>,
    );
    expect(node).not.toBeNull();
  });

  it('passes axe with no violations', async () => {
    const { container } = render(
      <main>
        <ScrollArea style={{ height: 100 }}>
          <p>content</p>
        </ScrollArea>
      </main>,
    );
    await expect(container).toHaveNoViolations();
  });
});
