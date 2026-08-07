/**
 * toast.test.tsx — Toast tests (OVL-08)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { Toast } from '../src/primitives/Toast/Toast';

afterEach(cleanup);

function renderToast() {
  return render(
    <Toast.Provider duration={Infinity} swipeDirection="right">
      <Toast.Root defaultOpen tone="success">
        <Toast.Title>Saved</Toast.Title>
        <Toast.Description>Your changes were saved.</Toast.Description>
        <Toast.Close aria-label="Close">×</Toast.Close>
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>,
  );
}

describe('Toast (OVL-08)', () => {
  it('renders the toast content through the viewport', () => {
    renderToast();
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Your changes were saved.')).toBeInTheDocument();
  });

  it('renders a portalled aria-live viewport region', () => {
    const { baseElement } = renderToast();
    expect(baseElement.querySelector('.lucent-toast__viewport')).not.toBeNull();
  });

  it('applies the tone modifier class', () => {
    const { baseElement } = renderToast();
    expect(baseElement.querySelector('.lucent-toast--success')).not.toBeNull();
  });

  it('dismisses when the Close control is chosen', () => {
    renderToast();
    expect(screen.getByText('Saved')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close'));
    expect(screen.queryByText('Saved')).toBeNull();
  });

  it('passes axe when open', async () => {
    const { baseElement } = renderToast();
    await expect(baseElement).toHaveNoViolations({ rules: { region: { enabled: false } } });
  });
});
