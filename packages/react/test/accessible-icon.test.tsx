/**
 * accessible-icon.test.tsx — AccessibleIcon enforces + announces a label (UTIL-04)
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AccessibleIcon } from '../src/utils/AccessibleIcon/index';

describe('AccessibleIcon (UTIL-04)', () => {

  it('announces the label while the icon is aria-hidden', () => {
    render(
      <button>
        <AccessibleIcon label="Notifications">
          <svg data-testid="icon" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" /></svg>
        </AccessibleIcon>
      </button>,
    );
    // The accessible name is present (VisuallyHidden text appended by Radix)
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    // The button exposes the accessible name
    expect(screen.getByRole('button', { name: 'Notifications' })).toBeInTheDocument();
    // The icon itself is aria-hidden
    expect(screen.getByTestId('icon').getAttribute('aria-hidden')).toBe('true');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <main>
        <button>
          <AccessibleIcon label="Settings">
            <svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" /></svg>
          </AccessibleIcon>
        </button>
      </main>,
    );
    await expect(container).toHaveNoViolations();
  });

  it('requires a label at the type level', () => {
    // @ts-expect-error — label is a required prop; omitting it must fail to compile.
    const missingLabel = <AccessibleIcon><svg /></AccessibleIcon>;
    expect(missingLabel).toBeTruthy();
  });

});
