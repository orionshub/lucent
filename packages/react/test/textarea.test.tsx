/**
 * textarea.test.tsx — Textarea component tests (FORM-03)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { cleanup } from '@testing-library/react';
import { createRef } from 'react';
import { Textarea } from '../src/primitives/Textarea/Textarea';

afterEach(cleanup);

describe('Textarea (FORM-03)', () => {

  it('renders a textarea inside a wrapper div', () => {
    const { container } = render(<Textarea />);
    expect(container.querySelector('.lucent-textarea-wrapper')).not.toBeNull();
    expect(container.querySelector('.lucent-textarea')).not.toBeNull();
  });

  it('inner element is a native textarea', () => {
    const { container } = render(<Textarea />);
    expect(container.querySelector('textarea')).not.toBeNull();
  });

  it('sets aria-invalid on BOTH wrapper div AND inner textarea when isInvalid is set', () => {
    const { container } = render(<Textarea isInvalid />);
    const wrapper = container.querySelector('.lucent-textarea-wrapper');
    const textarea = container.querySelector('.lucent-textarea');
    expect(wrapper?.getAttribute('aria-invalid')).toBe('true');
    expect(textarea?.getAttribute('aria-invalid')).toBe('true');
  });

  it('applies invalid modifier class when isInvalid', () => {
    const { container } = render(<Textarea isInvalid />);
    expect(container.querySelector('.lucent-textarea-wrapper--invalid')).not.toBeNull();
  });

  it('forwards ref to the native textarea element', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current?.tagName.toLowerCase()).toBe('textarea');
  });

  it('passes axe when paired with a label', async () => {
    const { container } = render(
      <main>
        <label htmlFor="test-bio">Bio</label>
        <Textarea id="test-bio" />
      </main>,
    );
    await expect(container).toHaveNoViolations();
  });

});
