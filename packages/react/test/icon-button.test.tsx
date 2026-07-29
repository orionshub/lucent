/**
 * icon-button.test.tsx — IconButton type-level + runtime accessible name (PRIM-02)
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IconButton } from '../src/primitives/IconButton/index';

const Icon = () => <svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" /></svg>;

describe('IconButton (PRIM-02)', () => {

  it('exposes an accessible name via aria-label', () => {
    render(<IconButton icon={<Icon />} aria-label="Close" />);
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('exposes an accessible name via label (VisuallyHidden)', () => {
    render(<IconButton icon={<Icon />} label="Settings" />);
    const btn = screen.getByRole('button', { name: 'Settings' });
    expect(btn).toBeInTheDocument();
    // The visible icon is aria-hidden when a VisuallyHidden label is used
    expect(btn.querySelector('.lucent-icon-btn__icon')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('applies square size class from the shared scale', () => {
    render(<IconButton icon={<Icon />} aria-label="Menu" size="sm" />);
    const btn = screen.getByRole('button', { name: 'Menu' });
    expect(btn.classList.contains('lucent-icon-btn--sm')).toBe(true);
  });

  it('requires an accessible name at the type level', () => {
    // @ts-expect-error — omitting both aria-label and label must fail to compile.
    const missing = <IconButton icon={<Icon />} />;
    expect(missing).toBeTruthy();
  });

  it('has no axe violations for both name strategies', async () => {
    const { container } = render(
      <main>
        <IconButton icon={<Icon />} aria-label="Close" />
        <IconButton icon={<Icon />} label="Settings" />
      </main>,
    );
    await expect(container).toHaveNoViolations();
  });

});
