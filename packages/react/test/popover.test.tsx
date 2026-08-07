/**
 * popover.test.tsx — Popover tests (OVL-03)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { Popover } from '../src/primitives/Popover/Popover';

afterEach(cleanup);

function renderPopover(defaultOpen = false) {
  return render(
    <Popover.Root defaultOpen={defaultOpen}>
      <Popover.Trigger>Open</Popover.Trigger>
      <Popover.Content aria-label="Details">
        <p>Popover body</p>
        <Popover.Close>Dismiss</Popover.Close>
      </Popover.Content>
    </Popover.Root>,
  );
}

describe('Popover (OVL-03)', () => {
  it('opens content on trigger click', () => {
    renderPopover();
    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Popover body')).toBeInTheDocument();
  });

  it('renders a glass content surface', () => {
    const { baseElement } = renderPopover(true);
    expect(baseElement.querySelector('.lucent-popover__content')).not.toBeNull();
  });

  it('dismisses via the Close control', () => {
    renderPopover(true);
    expect(screen.getByText('Popover body')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Dismiss'));
    expect(screen.queryByText('Popover body')).toBeNull();
  });

  it('passes axe when open', async () => {
    const { baseElement } = renderPopover(true);
    await expect(baseElement).toHaveNoViolations({ rules: { region: { enabled: false } } });
  });
});
