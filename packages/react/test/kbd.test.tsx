/**
 * kbd.test.tsx — Kbd keycap primitive (PRIM-09)
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Kbd } from '../src/primitives/Kbd/index';

describe('Kbd (PRIM-09)', () => {

  it('renders a semantic <kbd> by default', () => {
    const { container } = render(<Kbd>Esc</Kbd>);
    expect(container.firstElementChild?.tagName.toLowerCase()).toBe('kbd');
  });

  it('applies the lucent-kbd class', () => {
    const { container } = render(<Kbd>Ctrl</Kbd>);
    expect(container.firstElementChild?.classList.contains('lucent-kbd')).toBe(true);
  });

  it('renders the provided key text', () => {
    render(<Kbd>⌘</Kbd>);
    expect(screen.getByText('⌘')).toBeInTheDocument();
  });

  it('renders as a different element via as prop', () => {
    const { container } = render(<Kbd as="span">K</Kbd>);
    expect(container.firstElementChild?.tagName.toLowerCase()).toBe('span');
  });

});
