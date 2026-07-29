/**
 * visually-hidden.test.tsx — VisuallyHidden keeps content in a11y tree (UTIL-03)
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VisuallyHidden } from '../src/utils/VisuallyHidden/index';

describe('VisuallyHidden (UTIL-03)', () => {

  it('keeps text content in the DOM / a11y tree', () => {
    render(<VisuallyHidden>Hidden but announced</VisuallyHidden>);
    expect(screen.getByText('Hidden but announced')).toBeInTheDocument();
  });

  it('applies the lucent-visually-hidden class', () => {
    const { container } = render(<VisuallyHidden>Label</VisuallyHidden>);
    expect(container.firstElementChild?.classList.contains('lucent-visually-hidden')).toBe(true);
  });

  it('merges a consumer className', () => {
    const { container } = render(
      <VisuallyHidden className="my-hidden">Label</VisuallyHidden>,
    );
    const el = container.firstElementChild;
    expect(el?.classList.contains('lucent-visually-hidden')).toBe(true);
    expect(el?.classList.contains('my-hidden')).toBe(true);
  });

  it('has no axe violations when labeling a control', async () => {
    const { container } = render(
      <main>
        <button>
          <span aria-hidden="true">×</span>
          <VisuallyHidden>Close dialog</VisuallyHidden>
        </button>
      </main>,
    );
    await expect(container).toHaveNoViolations();
  });

});
