/**
 * alert-dialog.test.tsx — AlertDialog tests (OVL-02)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { AlertDialog } from '../src/primitives/AlertDialog/AlertDialog';

afterEach(cleanup);

function renderAlert(defaultOpen = false) {
  return render(
    <AlertDialog.Root defaultOpen={defaultOpen}>
      <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Are you sure?</AlertDialog.Title>
        <AlertDialog.Description>This cannot be undone.</AlertDialog.Description>
        <div className="lucent-alert-dialog__actions">
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action>Confirm</AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>,
  );
}

describe('AlertDialog (OVL-02)', () => {
  it('opens as an alertdialog', () => {
    renderAlert();
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  it('focuses the least-destructive action (Cancel) by default', async () => {
    renderAlert(true);
    const cancel = screen.getByText('Cancel');
    await waitFor(() => expect(document.activeElement).toBe(cancel));
  });

  it('renders both Action and Cancel', () => {
    renderAlert(true);
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('closes when Cancel is chosen', () => {
    renderAlert(true);
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByRole('alertdialog')).toBeNull();
  });

  it('passes axe when open', async () => {
    const { baseElement } = renderAlert(true);
    await expect(baseElement).toHaveNoViolations({
      rules: { region: { enabled: false }, 'aria-hidden-focus': { enabled: false } },
    });
  });
});
