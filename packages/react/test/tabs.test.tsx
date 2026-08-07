/**
 * tabs.test.tsx — Tabs tests (LAYOUT-06)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { Tabs } from '../src/primitives/Tabs/Tabs';

afterEach(cleanup);

function renderTabs(props?: Partial<React.ComponentProps<typeof Tabs.Root>>) {
  return render(
    <Tabs.Root defaultValue="one" {...props}>
      <Tabs.List aria-label="Sections">
        <Tabs.Trigger value="one">One</Tabs.Trigger>
        <Tabs.Trigger value="two">Two</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="one">Panel one</Tabs.Content>
      <Tabs.Content value="two">Panel two</Tabs.Content>
    </Tabs.Root>,
  );
}

describe('Tabs (LAYOUT-06)', () => {
  it('renders tabs with the correct roles and initial selection', () => {
    renderTabs();
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(2);
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(screen.getByText('Panel one')).toBeInTheDocument();
  });

  it('switches panel when a trigger is activated', () => {
    renderTabs();
    // Radix Tabs selects on mousedown (primary button), not click.
    fireEvent.mouseDown(screen.getByRole('tab', { name: 'Two' }), { button: 0 });
    expect(screen.getByRole('tab', { name: 'Two' }).getAttribute('aria-selected')).toBe('true');
    expect(screen.getByText('Panel two')).toBeInTheDocument();
  });

  it('exposes aria-orientation for vertical tabs', () => {
    renderTabs({ orientation: 'vertical' });
    expect(screen.getByRole('tablist').getAttribute('aria-orientation')).toBe('vertical');
  });

  it('selects on focus (automatic activation)', () => {
    renderTabs();
    fireEvent.focus(screen.getByRole('tab', { name: 'Two' }));
    expect(screen.getByRole('tab', { name: 'Two' }).getAttribute('aria-selected')).toBe('true');
  });

  it('does not select on focus in manual activation mode', () => {
    renderTabs({ activationMode: 'manual' });
    fireEvent.focus(screen.getByRole('tab', { name: 'Two' }));
    expect(screen.getByRole('tab', { name: 'Two' }).getAttribute('aria-selected')).toBe('false');
  });

  it('passes axe with no violations', async () => {
    const { container } = renderTabs();
    await expect(container).toHaveNoViolations();
  });
});
