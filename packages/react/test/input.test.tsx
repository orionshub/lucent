/**
 * input.test.tsx — Input component tests (FORM-02)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { cleanup } from '@testing-library/react';
import { createRef } from 'react';
import { Input } from '../src/primitives/Input/Input';

afterEach(cleanup);

describe('Input (FORM-02)', () => {

  it('renders a wrapper div with lucent-input-wrapper class', () => {
    const { container } = render(<Input />);
    expect(container.querySelector('.lucent-input-wrapper')).not.toBeNull();
  });

  it('inner element has lucent-input class', () => {
    const { container } = render(<Input />);
    expect(container.querySelector('.lucent-input')).not.toBeNull();
  });

  it('sets aria-invalid on BOTH wrapper div AND inner input when isInvalid is set', () => {
    const { container } = render(<Input isInvalid aria-describedby="err" />);
    const wrapper = container.querySelector('.lucent-input-wrapper');
    const input = container.querySelector('.lucent-input');
    expect(wrapper?.getAttribute('aria-invalid')).toBe('true');
    expect(input?.getAttribute('aria-invalid')).toBe('true');
  });

  it('sets data-filled on wrapper when value prop is non-empty', () => {
    const { container } = render(<Input value="hello" readOnly />);
    const wrapper = container.querySelector('.lucent-input-wrapper');
    expect(wrapper?.hasAttribute('data-filled')).toBe(true);
  });

  it('does not set data-filled when value is empty string', () => {
    const { container } = render(<Input value="" readOnly />);
    const wrapper = container.querySelector('.lucent-input-wrapper');
    expect(wrapper?.hasAttribute('data-filled')).toBe(false);
  });

  it('does not set data-filled when value is undefined', () => {
    const { container } = render(<Input />);
    const wrapper = container.querySelector('.lucent-input-wrapper');
    expect(wrapper?.hasAttribute('data-filled')).toBe(false);
  });

  it('forwards aria-describedby to the inner input element', () => {
    const { container } = render(<Input aria-describedby="helper-id" />);
    const input = container.querySelector('.lucent-input');
    expect(input?.getAttribute('aria-describedby')).toBe('helper-id');
  });

  it('renders startIcon with aria-hidden="true"', () => {
    const { container } = render(<Input startIcon={<span>S</span>} />);
    const icon = container.querySelector('.lucent-input__icon--start');
    expect(icon).not.toBeNull();
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders endIcon with aria-hidden="true"', () => {
    const { container } = render(<Input endIcon={<span>E</span>} />);
    const icon = container.querySelector('.lucent-input__icon--end');
    expect(icon).not.toBeNull();
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
  });

  it('forwards ref to the native input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current?.tagName.toLowerCase()).toBe('input');
  });

  it('passes axe when paired with a Label element', async () => {
    const { container } = render(
      <main>
        <label htmlFor="test-name">Name</label>
        <Input id="test-name" />
      </main>,
    );
    await expect(container).toHaveNoViolations();
  });

});
