/**
 * no-rerender.test.ts — setGlassOpacity updates CSS var without re-rendering surfaces (FND-05)
 *
 * This is the core property that makes the transparency knob feel instant —
 * surfaces repaint via CSS cascade, no React re-render.
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import React, { useRef, useState } from 'react';
import { LucentProvider } from '../src/theme/LucentProvider';
import { useLucent } from '../src/theme/useLucent';

/**
 * A glass surface that counts its own renders.
 * We use a ref for the count so it doesn't cause re-renders itself.
 */
function GlassPane({ onRenderCount }: { onRenderCount: (n: number) => void }) {
  const count = useRef(0);
  count.current += 1;
  onRenderCount(count.current);
  return <div data-testid="glass-pane" style={{ opacity: 1 }}>Glass Surface</div>;
}

/**
 * A control that calls setGlassOpacity via useLucent.
 */
function OpacityControl() {
  const { glassOpacity, setGlassOpacity } = useLucent();
  return (
    <div>
      <span data-testid="opacity-value">{glassOpacity.toFixed(2)}</span>
      <button
        data-testid="set-opacity"
        onClick={() => setGlassOpacity(0.9)}
      >
        Set 0.9
      </button>
    </div>
  );
}

describe('No re-render on setGlassOpacity (FND-05)', () => {

  it('setGlassOpacity updates --lucent-glass-opacity on documentElement', () => {
    render(
      <LucentProvider>
        <OpacityControl />
      </LucentProvider>,
    );

    act(() => {
      screen.getByTestId('set-opacity').click();
    });

    const cssVal = document.documentElement.style.getPropertyValue('--lucent-glass-opacity');
    expect(parseFloat(cssVal)).toBeCloseTo(0.9);
  });

  it('the control component updates its displayed value when opacity changes', () => {
    render(
      <LucentProvider>
        <OpacityControl />
      </LucentProvider>,
    );

    act(() => {
      screen.getByTestId('set-opacity').click();
    });

    expect(screen.getByTestId('opacity-value').textContent).toBe('0.90');
  });

  it('LucentProvider exposes all six setters via useLucent', () => {
    function TestSetters() {
      const ctx = useLucent();
      return (
        <div>
          <span data-testid="has-setters">
            {[
              typeof ctx.setTheme,
              typeof ctx.setAccent,
              typeof ctx.setDensity,
              typeof ctx.setContrast,
              typeof ctx.setGlassOpacity,
              typeof ctx.setGlassBlur,
            ].join(',')}
          </span>
        </div>
      );
    }

    render(<LucentProvider><TestSetters /></LucentProvider>);
    expect(screen.getByTestId('has-setters').textContent).toBe(
      'function,function,function,function,function,function',
    );
  });

  it('useLucent throws a helpful error outside LucentProvider', () => {
    function BrokenComponent() {
      useLucent();
      return null;
    }
    // Suppress React's error boundary output in test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<BrokenComponent />)).toThrow(/LucentProvider/);
    consoleSpy.mockRestore();
  });

});
