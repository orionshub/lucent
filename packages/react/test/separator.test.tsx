/**
 * separator.test.tsx — Separator role/aria (PRIM-05)
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Separator } from '../src/primitives/Separator/index';

describe('Separator (PRIM-05)', () => {

  it('renders role="separator" with horizontal orientation by default', () => {
    render(<Separator />);
    const sep = screen.getByRole('separator');
    expect(sep).toBeInTheDocument();
    // Per ARIA, horizontal is the implicit default for role=separator, so Radix
    // omits aria-orientation for horizontal (only sets it for vertical).
    expect(sep.getAttribute('aria-orientation')).not.toBe('vertical');
    expect(sep.getAttribute('data-orientation')).toBe('horizontal');
  });

  it('sets aria-orientation="vertical" when orientation="vertical"', () => {
    render(<Separator orientation="vertical" />);
    expect(screen.getByRole('separator').getAttribute('aria-orientation')).toBe('vertical');
  });

  it('renders decorative separator without the separator role', () => {
    const { container } = render(<Separator decorative />);
    // Decorative → no separator role (Radix sets role="none"/presentation)
    expect(screen.queryByRole('separator')).toBeNull();
    expect(container.firstElementChild?.classList.contains('lucent-separator')).toBe(true);
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <main>
        <p>Above</p>
        <Separator />
        <p>Below</p>
      </main>,
    );
    await expect(container).toHaveNoViolations();
  });

});
