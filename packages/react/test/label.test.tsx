/**
 * label.test.tsx — Label component tests (FORM-01)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { cleanup } from '@testing-library/react';
import { createRef } from 'react';
import { Label } from '../src/primitives/Label/Label';

afterEach(cleanup);

describe('Label (FORM-01)', () => {

  it('renders a native label element', () => {
    const { container } = render(<Label>Name</Label>);
    expect(container.firstElementChild?.tagName.toLowerCase()).toBe('label');
  });

  it('forwards htmlFor to the native label element', () => {
    render(<Label htmlFor="email-input">Email</Label>);
    const el = screen.getByText('Email');
    expect(el.getAttribute('for')).toBe('email-input');
  });

  it('merges className with lucent-label', () => {
    const { container } = render(<Label className="my-label">Label</Label>);
    const el = container.firstElementChild;
    expect(el?.classList.contains('lucent-label')).toBe(true);
    expect(el?.classList.contains('my-label')).toBe(true);
  });

  it('renders children as text content', () => {
    render(<Label>First Name</Label>);
    expect(screen.getByText('First Name')).toBeInTheDocument();
  });

  it('forwards ref to the DOM node', () => {
    const ref = createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Ref Label</Label>);
    expect(ref.current?.tagName.toLowerCase()).toBe('label');
  });

  it('passes axe with a paired input element', async () => {
    const { container } = render(
      <main>
        <Label htmlFor="test-input">Username</Label>
        <input id="test-input" type="text" />
      </main>,
    );
    await expect(container).toHaveNoViolations();
  });

});
