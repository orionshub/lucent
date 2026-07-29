/**
 * badge.test.tsx — Badge tone/variant primitive (PRIM-08)
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../src/primitives/Badge/index';

describe('Badge (PRIM-08)', () => {

  it('renders a <span> by default with default neutral/soft tone', () => {
    const { container } = render(<Badge>New</Badge>);
    const el = container.firstElementChild;
    expect(el?.tagName.toLowerCase()).toBe('span');
    expect(el?.classList.contains('lucent-badge')).toBe(true);
    expect(el?.classList.contains('lucent-badge--neutral')).toBe(true);
    expect(el?.classList.contains('lucent-badge--soft')).toBe(true);
  });

  it('applies tone and variant classes', () => {
    const { container } = render(<Badge tone="accent" variant="solid">Pro</Badge>);
    const el = container.firstElementChild;
    expect(el?.classList.contains('lucent-badge--accent')).toBe(true);
    expect(el?.classList.contains('lucent-badge--solid')).toBe(true);
  });

  it('renders as a different element via as prop', () => {
    const { container } = render(<Badge as="div">Div badge</Badge>);
    expect(container.firstElementChild?.tagName.toLowerCase()).toBe('div');
  });

  it('renders content', () => {
    render(<Badge>Beta</Badge>);
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <main><Badge tone="danger">Error</Badge></main>,
    );
    await expect(container).toHaveNoViolations();
  });

});
