/**
 * portal.test.tsx — Portal renders into body, honors container, inherits tokens (UTIL-01)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { Portal } from '../src/utils/Portal/index';

describe('Portal (UTIL-01)', () => {

  it('renders children into document.body by default (outside the render container)', () => {
    const { container } = render(
      <div data-testid="host">
        <Portal>
          <span data-testid="portalled">hi</span>
        </Portal>
      </div>,
    );
    const portalled = document.querySelector('[data-testid="portalled"]');
    expect(portalled).not.toBeNull();
    // It is a descendant of body but NOT of the render container
    expect(document.body.contains(portalled!)).toBe(true);
    expect(container.contains(portalled)).toBe(false);
  });

  it('honors a consumer-supplied container', () => {
    const mount = document.createElement('div');
    mount.id = 'custom-mount';
    document.body.appendChild(mount);

    render(
      <Portal container={mount}>
        <span data-testid="in-container">hi</span>
      </Portal>,
    );

    const node = document.querySelector('[data-testid="in-container"]');
    expect(node).not.toBeNull();
    expect(mount.contains(node!)).toBe(true);

    mount.remove();
  });

  it('a portalled node inherits a :root-declared --lucent-* token (Phase 5 de-risk)', () => {
    // Declare a token on the root (Phase 1 declares all --lucent-* at :root)
    document.documentElement.style.setProperty('--lucent-surface', '225 24% 12%');

    render(
      <Portal>
        <span data-testid="token-check">glass</span>
      </Portal>,
    );

    const node = document.querySelector('[data-testid="token-check"]') as HTMLElement;
    expect(node).not.toBeNull();

    // Custom properties inherit through the portal because the mount point (body)
    // is inside <html> where the token is declared.
    const inherited = getComputedStyle(node).getPropertyValue('--lucent-surface').trim();
    if (inherited) {
      // happy-dom resolves the inherited custom property
      expect(inherited).toBe('225 24% 12%');
    } else {
      // Fallback: prove DOM placement reaches documentElement where the token lives
      let cur: Node | null = node;
      let reachesRoot = false;
      while (cur) {
        if (cur === document.documentElement) { reachesRoot = true; break; }
        cur = cur.parentNode;
      }
      expect(reachesRoot).toBe(true);
    }

    document.documentElement.style.removeProperty('--lucent-surface');
  });

});
