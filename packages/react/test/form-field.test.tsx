/**
 * form-field.test.tsx — FormField layout, ARIA wiring, validate, axe (FORM-10)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { cleanup } from '@testing-library/react';
import { FormField } from '../src/primitives/FormField/FormField';
import { Input } from '../src/primitives/Input/Input';

afterEach(cleanup);

describe('FormField (FORM-10)', () => {

  it('layout=stack (default) renders without inline or floating modifier', () => {
    const { container } = render(
      <FormField label="Name"><Input /></FormField>,
    );
    const el = container.querySelector('.lucent-form-field');
    expect(el?.classList.contains('lucent-form-field--inline')).toBe(false);
    expect(el?.classList.contains('lucent-form-field--floating')).toBe(false);
  });

  it('layout=inline renders lucent-form-field--inline modifier', () => {
    const { container } = render(
      <FormField layout="inline" label="Name"><Input /></FormField>,
    );
    expect(container.querySelector('.lucent-form-field--inline')).not.toBeNull();
  });

  it('layout=floating renders lucent-form-field--floating modifier', () => {
    const { container } = render(
      <FormField layout="floating" label="Name"><Input /></FormField>,
    );
    expect(container.querySelector('.lucent-form-field--floating')).not.toBeNull();
  });

  it('label prop renders a label element with the label text', () => {
    render(<FormField label="Email"><Input /></FormField>);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Email').tagName.toLowerCase()).toBe('label');
  });

  it('when id provided, Label htmlFor matches id and control receives id', () => {
    const { container } = render(
      <FormField label="Email" id="email"><Input /></FormField>,
    );
    const label = container.querySelector('label');
    const input = container.querySelector('input');
    expect(label?.getAttribute('for')).toBe('email');
    expect(input?.getAttribute('id')).toBe('email');
  });

  it('description prop renders with lucent-form-field__description class', () => {
    render(
      <FormField label="Email" id="email" description="We'll never share your email.">
        <Input />
      </FormField>,
    );
    const desc = document.querySelector('.lucent-form-field__description');
    expect(desc?.textContent).toBe("We'll never share your email.");
  });

  it('error prop renders with lucent-form-field__error class', () => {
    render(
      <FormField label="Email" id="email" error="Email is required">
        <Input />
      </FormField>,
    );
    const err = document.querySelector('.lucent-form-field__error');
    expect(err?.textContent).toBe('Email is required');
  });

  it('when error prop present, the control gets aria-invalid', () => {
    const { container } = render(
      <FormField label="Email" id="email" error="Required">
        <Input />
      </FormField>,
    );
    const input = container.querySelector('input');
    expect(input?.getAttribute('aria-invalid')).toBe('true');
  });

  it('validate returning a string renders the returned string as error text', () => {
    render(
      <FormField
        label="Email"
        id="email"
        validate={(v) => (!v ? 'Required' : null)}
      >
        <Input value="" readOnly />
      </FormField>,
    );
    expect(document.querySelector('.lucent-form-field__error')?.textContent).toBe('Required');
  });

  it('validate returning null renders no error', () => {
    render(
      <FormField
        label="Email"
        id="email"
        validate={(v) => (v ? null : 'Required')}
      >
        <Input value="test@example.com" readOnly />
      </FormField>,
    );
    expect(document.querySelector('.lucent-form-field__error')).toBeNull();
  });

  it('passes axe for stack layout', async () => {
    const { container } = render(
      <main>
        <FormField label="Name" id="name">
          <Input />
        </FormField>
      </main>,
    );
    await expect(container).toHaveNoViolations();
  });

  it('passes axe for inline layout', async () => {
    const { container } = render(
      <main>
        <FormField layout="inline" label="Name" id="name-inline">
          <Input />
        </FormField>
      </main>,
    );
    await expect(container).toHaveNoViolations();
  });

});
