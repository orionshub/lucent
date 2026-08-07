/**
 * select.test.tsx — Select glass dropdown tests (FORM-08)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { cleanup } from '@testing-library/react';
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectContent,
  SelectItem,
} from '../src/primitives/Select/Select';

afterEach(cleanup);

// Helper: compose a simple select
function TestSelect({ defaultValue, onValueChange }: { defaultValue?: string; onValueChange?: (v: string) => void }) {
  return (
    <SelectRoot defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger aria-label="Fruit">
        <SelectValue placeholder="Pick a fruit" />
        <SelectIcon />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </SelectRoot>
  );
}

describe('Select (FORM-08)', () => {

  it('trigger renders with lucent-select__trigger class', () => {
    render(<TestSelect />);
    const trigger = document.querySelector('.lucent-select__trigger');
    expect(trigger).not.toBeNull();
  });

  it('trigger renders with role="combobox"', () => {
    render(<TestSelect />);
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toBeInTheDocument();
  });

  it('trigger is closed by default — data-state="closed"', () => {
    render(<TestSelect />);
    expect(screen.getByRole('combobox').getAttribute('data-state')).toBe('closed');
  });

  it('clicking trigger opens the dropdown — data-state="open"', () => {
    render(<TestSelect />);
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);
    expect(trigger.getAttribute('data-state')).toBe('open');
  });

  it('items render inside document.body portal when open', () => {
    render(<TestSelect />);
    fireEvent.click(screen.getByRole('combobox'));
    const apple = document.body.querySelector('.lucent-select__item');
    expect(apple).not.toBeNull();
  });

  it('items have lucent-select__item class', () => {
    render(<TestSelect />);
    fireEvent.click(screen.getByRole('combobox'));
    const items = document.body.querySelectorAll('.lucent-select__item');
    expect(items.length).toBeGreaterThan(0);
  });

  it('passes axe in closed state', async () => {
    const { container } = render(
      <main><TestSelect /></main>,
    );
    await expect(container).toHaveNoViolations();
  });

});
