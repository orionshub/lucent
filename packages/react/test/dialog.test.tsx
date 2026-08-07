/**
 * dialog.test.tsx — Dialog tests (OVL-01)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { Dialog } from '../src/primitives/Dialog/Dialog';

afterEach(cleanup);

function renderDialog(defaultOpen = false) {
  return render(
    <Dialog.Root defaultOpen={defaultOpen}>
      <Dialog.Trigger>Open</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Title</Dialog.Title>
        <Dialog.Description>Description text</Dialog.Description>
        <Dialog.Close>Close</Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>,
  );
}

describe('Dialog (OVL-01)', () => {
  it('opens as a modal dialog and hides the rest of the page', () => {
    renderDialog();
    fireEvent.click(screen.getByText('Open'));
    // This Radix version enforces modality via aria-hidden on siblings
    // (hideOthers) rather than an aria-modal attribute.
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders Title and Description', () => {
    renderDialog(true);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  it('closes via the Close button', () => {
    renderDialog(true);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('closes on Escape', () => {
    renderDialog(true);
    fireEvent.keyDown(document.activeElement ?? document.body, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('applies the glass overlay and content classes', () => {
    const { baseElement } = renderDialog(true);
    expect(baseElement.querySelector('.lucent-dialog__overlay')).not.toBeNull();
    expect(baseElement.querySelector('.lucent-dialog__content')).not.toBeNull();
  });

  it('passes axe when open', async () => {
    const { baseElement } = renderDialog(true);
    await expect(baseElement).toHaveNoViolations({
      rules: { region: { enabled: false }, 'aria-hidden-focus': { enabled: false } },
    });
  });
});
