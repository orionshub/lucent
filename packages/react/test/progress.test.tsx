/**
 * progress.test.tsx — Progress tests (DATA-03)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { Progress } from '../src/primitives/Progress/Progress';

afterEach(cleanup);

describe('Progress (DATA-03)', () => {
  it('linear determinate exposes progressbar with aria-valuenow', () => {
    render(<Progress aria-label="Upload" value={40} />);
    const bar = screen.getByRole('progressbar', { name: 'Upload' });
    expect(bar.getAttribute('aria-valuenow')).toBe('40');
    expect(bar.getAttribute('aria-valuemax')).toBe('100');
    expect(bar.classList.contains('lucent-progress--linear')).toBe(true);
  });

  it('linear indeterminate omits aria-valuenow', () => {
    render(<Progress aria-label="Loading" value={null} />);
    const bar = screen.getByRole('progressbar', { name: 'Loading' });
    expect(bar.getAttribute('aria-valuenow')).toBeNull();
  });

  it('circular determinate exposes aria-valuenow/min/max', () => {
    render(<Progress aria-label="Sync" variant="circular" value={75} max={100} />);
    const bar = screen.getByRole('progressbar', { name: 'Sync' });
    expect(bar.getAttribute('aria-valuenow')).toBe('75');
    expect(bar.getAttribute('aria-valuemin')).toBe('0');
    expect(bar.getAttribute('aria-valuemax')).toBe('100');
    expect(bar.classList.contains('lucent-progress--circular')).toBe(true);
  });

  it('circular indeterminate omits aria-valuenow', () => {
    render(<Progress aria-label="Working" variant="circular" />);
    const bar = screen.getByRole('progressbar', { name: 'Working' });
    expect(bar.getAttribute('aria-valuenow')).toBeNull();
  });

  it('clamps values above max', () => {
    render(<Progress aria-label="Over" value={150} max={100} />);
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('100');
  });

  it('passes axe for linear and circular', async () => {
    const { container } = render(
      <main>
        <Progress aria-label="Linear" value={50} />
        <Progress aria-label="Circular" variant="circular" value={50} />
      </main>,
    );
    await expect(container).toHaveNoViolations();
  });
});
