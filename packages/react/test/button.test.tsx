/**
 * button.test.tsx — Button variants, sizes, loading, asChild (PRIM-01)
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../src/primitives/Button/index';

describe('Button (PRIM-01)', () => {

  it('renders a <button> with default solid/md classes', () => {
    render(<Button>Click</Button>);
    const btn = screen.getByRole('button', { name: 'Click' });
    expect(btn.tagName.toLowerCase()).toBe('button');
    expect(btn.classList.contains('lucent-btn')).toBe(true);
    expect(btn.classList.contains('lucent-btn--solid')).toBe(true);
    expect(btn.classList.contains('lucent-btn--md')).toBe(true);
  });

  it('applies variant and size modifier classes', () => {
    render(<Button variant="outline" size="lg">X</Button>);
    const btn = screen.getByRole('button');
    expect(btn.classList.contains('lucent-btn--outline')).toBe(true);
    expect(btn.classList.contains('lucent-btn--lg')).toBe(true);
  });

  it('loading sets aria-busy, disables, and renders a spinner', () => {
    const { container } = render(<Button loading>Save</Button>);
    const btn = screen.getByRole('button');
    expect(btn.getAttribute('aria-busy')).toBe('true');
    expect(btn).toBeDisabled();
    expect(container.querySelector('.lucent-btn__spinner')).not.toBeNull();
  });

  it('renders startIcon and endIcon aria-hidden', () => {
    const { container } = render(
      <Button startIcon={<span>S</span>} endIcon={<span>E</span>}>Label</Button>,
    );
    const icons = container.querySelectorAll('.lucent-btn__icon');
    expect(icons.length).toBe(2);
    icons.forEach((i) => expect(i.getAttribute('aria-hidden')).toBe('true'));
  });

  it('asChild renders the consumer element (an <a>)', () => {
    render(
      <Button asChild>
        <a href="#go">Go</a>
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Go' });
    expect(link.tagName.toLowerCase()).toBe('a');
    expect(link.classList.contains('lucent-btn')).toBe(true);
  });

  it('has no axe violations', async () => {
    const { container } = render(<main><Button>Accessible</Button></main>);
    await expect(container).toHaveNoViolations();
  });

});
