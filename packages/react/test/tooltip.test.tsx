/**
 * tooltip.test.tsx — Tooltip tests (OVL-04)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { Tooltip, TooltipProvider } from '../src/primitives/Tooltip/Tooltip';

afterEach(cleanup);

function renderTooltip() {
  return render(
    <TooltipProvider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger>Hover me</Tooltip.Trigger>
        <Tooltip.Content>Tooltip text</Tooltip.Content>
      </Tooltip.Root>
    </TooltipProvider>,
  );
}

describe('Tooltip (OVL-04)', () => {
  it('opens on focus (hover+focus parity) with role="tooltip"', async () => {
    renderTooltip();
    fireEvent.focus(screen.getByText('Hover me'));
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument());
  });

  it('renders a glass content surface when open', async () => {
    const { baseElement } = renderTooltip();
    fireEvent.focus(screen.getByText('Hover me'));
    await waitFor(() => expect(baseElement.querySelector('.lucent-tooltip__content')).not.toBeNull());
  });

  it('passes axe when open', async () => {
    const { baseElement } = renderTooltip();
    fireEvent.focus(screen.getByText('Hover me'));
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument());
    await expect(baseElement).toHaveNoViolations({ rules: { region: { enabled: false } } });
  });
});
