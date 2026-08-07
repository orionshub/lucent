/**
 * switch.test.tsx — Switch tests (FORM-06)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { cleanup } from '@testing-library/react';
import { Switch } from '../src/primitives/Switch/Switch';

afterEach(cleanup);

describe('Switch (FORM-06)', () => {
  it('renders with role="switch"', () => {
    render(<Switch aria-label="Enable notifications" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('is unchecked by default — data-state="unchecked"', () => {
    render(<Switch aria-label="Test" />);
    expect(screen.getByRole('switch').getAttribute('data-state')).toBe('unchecked');
  });

  it('defaultChecked sets data-state="checked"', () => {
    render(<Switch aria-label="Test" defaultChecked />);
    expect(screen.getByRole('switch').getAttribute('data-state')).toBe('checked');
  });

  it('clicking toggles checked state', () => {
    render(<Switch aria-label="Toggle" />);
    const sw = screen.getByRole('switch');
    fireEvent.click(sw);
    expect(sw.getAttribute('data-state')).toBe('checked');
  });

  it('applies lucent-switch class', () => {
    render(<Switch aria-label="Test" />);
    expect(screen.getByRole('switch').classList.contains('lucent-switch')).toBe(true);
  });

  it('renders a thumb element with lucent-switch__thumb', () => {
    const { container } = render(<Switch aria-label="Test" />);
    expect(container.querySelector('.lucent-switch__thumb')).not.toBeNull();
  });

  it('passes axe with aria-label', async () => {
    const { container } = render(
      <main><Switch aria-label="Enable dark mode" /></main>,
    );
    await expect(container).toHaveNoViolations();
  });
});
