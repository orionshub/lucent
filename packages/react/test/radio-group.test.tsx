/**
 * radio-group.test.tsx — RadioGroup tests (FORM-05)
 */
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { cleanup } from '@testing-library/react';
import { RadioGroup, RadioGroupItem } from '../src/primitives/RadioGroup/RadioGroup';

afterEach(cleanup);

describe('RadioGroup (FORM-05)', () => {
  const TestGroup = ({ value, onValueChange }: { value?: string; onValueChange?: (v: string) => void }) => (
    <RadioGroup aria-label="Fruit" value={value} onValueChange={onValueChange}>
      <RadioGroupItem value="apple" aria-label="Apple" />
      <RadioGroupItem value="banana" aria-label="Banana" />
      <RadioGroupItem value="cherry" aria-label="Cherry" />
    </RadioGroup>
  );

  it('renders with role="radiogroup"', () => {
    render(<TestGroup />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('items have role="radio"', () => {
    render(<TestGroup />);
    expect(screen.getAllByRole('radio').length).toBe(3);
  });

  it('default unchecked item has data-state="unchecked"', () => {
    render(<TestGroup />);
    expect(screen.getByRole('radio', { name: 'Apple' }).getAttribute('data-state')).toBe('unchecked');
  });

  it('controlled value selects the matching item', () => {
    render(<TestGroup value="banana" />);
    expect(screen.getByRole('radio', { name: 'Banana' }).getAttribute('data-state')).toBe('checked');
    expect(screen.getByRole('radio', { name: 'Apple' }).getAttribute('data-state')).toBe('unchecked');
  });

  it('clicking an item fires onValueChange', () => {
    const onValueChange = vi.fn();
    render(<TestGroup onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole('radio', { name: 'Cherry' }));
    expect(onValueChange).toHaveBeenCalledWith('cherry');
  });

  it('lucent-radio class applied to items', () => {
    render(<TestGroup />);
    const radios = screen.getAllByRole('radio');
    radios.forEach((r) => expect(r.classList.contains('lucent-radio')).toBe(true));
  });

  it('passes axe with aria-label on group and items', async () => {
    const { container } = render(
      <main>
        <RadioGroup aria-label="Color">
          <RadioGroupItem value="red" aria-label="Red" />
          <RadioGroupItem value="blue" aria-label="Blue" />
        </RadioGroup>
      </main>,
    );
    await expect(container).toHaveNoViolations();
  });
});
