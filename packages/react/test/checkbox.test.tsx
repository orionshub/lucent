/**
 * checkbox.test.tsx — Checkbox tests (FORM-04)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { cleanup } from '@testing-library/react';
import { Checkbox } from '../src/primitives/Checkbox/Checkbox';

afterEach(cleanup);

describe('Checkbox (FORM-04)', () => {
  it('renders with role="checkbox"', () => {
    render(<Checkbox aria-label="Accept terms" />);
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeInTheDocument();
  });

  it('is unchecked by default — data-state="unchecked"', () => {
    render(<Checkbox aria-label="Test" />);
    expect(screen.getByRole('checkbox').getAttribute('data-state')).toBe('unchecked');
  });

  it('defaultChecked=true sets data-state="checked"', () => {
    render(<Checkbox aria-label="Test" defaultChecked />);
    expect(screen.getByRole('checkbox').getAttribute('data-state')).toBe('checked');
  });

  it('checked="indeterminate" sets data-state="indeterminate"', () => {
    render(<Checkbox aria-label="Test" checked="indeterminate" />);
    expect(screen.getByRole('checkbox').getAttribute('data-state')).toBe('indeterminate');
  });

  it('clicking toggles checked state', () => {
    render(<Checkbox aria-label="Toggle" />);
    const cb = screen.getByRole('checkbox');
    expect(cb.getAttribute('data-state')).toBe('unchecked');
    fireEvent.click(cb);
    expect(cb.getAttribute('data-state')).toBe('checked');
  });

  it('applies lucent-checkbox class', () => {
    render(<Checkbox aria-label="Test" />);
    expect(screen.getByRole('checkbox').classList.contains('lucent-checkbox')).toBe(true);
  });

  it('Indicator renders inside the root when checked', () => {
    const { container } = render(<Checkbox aria-label="Test" defaultChecked />);
    expect(container.querySelector('.lucent-checkbox__indicator')).not.toBeNull();
  });

  it('passes axe with aria-label', async () => {
    const { container } = render(
      <main><Checkbox aria-label="Accept terms" /></main>,
    );
    await expect(container).toHaveNoViolations();
  });
});
