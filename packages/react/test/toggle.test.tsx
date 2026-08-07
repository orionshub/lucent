/**
 * toggle.test.tsx — Toggle + ToggleGroup tests (FORM-07)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { cleanup } from '@testing-library/react';
import { Toggle } from '../src/primitives/Toggle/Toggle';
import { ToggleGroup, ToggleGroupItem } from '../src/primitives/ToggleGroup/ToggleGroup';

afterEach(cleanup);

describe('Toggle (FORM-07 — smoke check + full behaviour)', () => {
  it('renders a button element', () => {
    render(<Toggle aria-label="Bold">B</Toggle>);
    expect(screen.getByRole('button', { name: 'Bold' })).toBeInTheDocument();
  });

  it('has lucent-toggle class', () => {
    render(<Toggle aria-label="Bold">B</Toggle>);
    expect(screen.getByRole('button').classList.contains('lucent-toggle')).toBe(true);
  });

  it('passes axe with aria-label', async () => {
    const { container } = render(
      <main><Toggle aria-label="Bold">B</Toggle></main>,
    );
    await expect(container).toHaveNoViolations();
  });

  it('is off by default — data-state="off"', () => {
    render(<Toggle aria-label="Bold">B</Toggle>);
    expect(screen.getByRole('button').getAttribute('data-state')).toBe('off');
  });

  it('clicking toggles data-state to "on"', () => {
    render(<Toggle aria-label="Bold">B</Toggle>);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(btn.getAttribute('data-state')).toBe('on');
  });

  it('defaultPressed=true sets data-state="on"', () => {
    render(<Toggle aria-label="Bold" defaultPressed>B</Toggle>);
    expect(screen.getByRole('button').getAttribute('data-state')).toBe('on');
  });
});

describe('ToggleGroup (FORM-07)', () => {
  it('renders a group with items', () => {
    render(
      <ToggleGroup type="single" aria-label="Text alignment">
        <ToggleGroupItem value="left">L</ToggleGroupItem>
        <ToggleGroupItem value="center">C</ToggleGroupItem>
        <ToggleGroupItem value="right">R</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getAllByRole('radio').length).toBe(3);
  });

  it('items have lucent-toggle class', () => {
    const { container } = render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(container.querySelector('.lucent-toggle')).not.toBeNull();
  });

  it('type="single" allows only one item pressed at a time', () => {
    render(
      <ToggleGroup type="single" aria-label="Align">
        <ToggleGroupItem value="left">L</ToggleGroupItem>
        <ToggleGroupItem value="right">R</ToggleGroupItem>
      </ToggleGroup>,
    );
    const [left, right] = screen.getAllByRole('radio');
    fireEvent.click(left);
    expect(left.getAttribute('data-state')).toBe('on');
    fireEvent.click(right);
    expect(right.getAttribute('data-state')).toBe('on');
    expect(left.getAttribute('data-state')).toBe('off');
  });

  it('passes axe with aria-label on group', async () => {
    const { container } = render(
      <main>
        <ToggleGroup type="single" aria-label="Text alignment">
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
        </ToggleGroup>
      </main>,
    );
    await expect(container).toHaveNoViolations();
  });
});
