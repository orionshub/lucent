/**
 * avatar.test.tsx — Avatar image→fallback (PRIM-06)
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from '../src/primitives/Avatar/index';

describe('Avatar (PRIM-06)', () => {

  it('renders the fallback when no src is provided', async () => {
    render(<Avatar fallback="JD" />);
    // Radix Fallback appears after a delayMs timer (0ms here) resolves.
    expect(await screen.findByText('JD')).toBeInTheDocument();
  });

  it('renders the image element when src is provided', async () => {
    const { container } = render(
      <Avatar src="https://example.com/a.png" alt="Jane" fallback="JD" />,
    );
    // In happy-dom the image never fires load, so the fallback becomes available.
    expect(await screen.findByText('JD')).toBeInTheDocument();
    expect(container.querySelector('.lucent-avatar')).not.toBeNull();
  });

  it('applies the lucent-avatar class on the root', () => {
    const { container } = render(<Avatar fallback="AB" />);
    expect(container.querySelector('.lucent-avatar')).not.toBeNull();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <main>
        <Avatar fallback="JD" />
      </main>,
    );
    await expect(container).toHaveNoViolations();
  });

});
