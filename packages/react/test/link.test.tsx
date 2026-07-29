/**
 * link.test.tsx — Link asChild + external safety (PRIM-04)
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Link } from '../src/primitives/Link/index';

describe('Link (PRIM-04)', () => {

  it('renders an <a> by default with the lucent-link class', () => {
    render(<Link href="/about">About</Link>);
    const link = screen.getByRole('link', { name: 'About' });
    expect(link.tagName.toLowerCase()).toBe('a');
    expect(link.classList.contains('lucent-link')).toBe(true);
  });

  it('asChild renders the consumer element', () => {
    render(
      <Link asChild>
        <button>Nav</button>
      </Link>,
    );
    const el = screen.getByRole('button', { name: 'Nav' });
    expect(el.tagName.toLowerCase()).toBe('button');
    expect(el.classList.contains('lucent-link')).toBe(true);
  });

  it('external link (target=_blank) gets rel="noopener noreferrer" + new-tab cue', () => {
    render(<Link href="https://example.com" target="_blank">External</Link>);
    const link = screen.getByRole('link');
    const rel = link.getAttribute('rel') ?? '';
    expect(rel).toContain('noopener');
    expect(rel).toContain('noreferrer');
    // The screen-reader cue is present in the a11y tree
    expect(screen.getByText(/opens in new tab/i)).toBeInTheDocument();
  });

  it('preserves a consumer-supplied rel while adding safety tokens', () => {
    render(
      <Link href="https://example.com" target="_blank" rel="nofollow">Ext</Link>,
    );
    const rel = screen.getByRole('link').getAttribute('rel') ?? '';
    expect(rel).toContain('nofollow');
    expect(rel).toContain('noopener');
    expect(rel).toContain('noreferrer');
  });

  it('internal links do not get the external cue', () => {
    render(<Link href="/internal">Internal</Link>);
    expect(screen.queryByText(/opens in new tab/i)).toBeNull();
  });

  it('has no axe violations', async () => {
    const { container } = render(<main><Link href="/x">Link</Link></main>);
    await expect(container).toHaveNoViolations();
  });

});
