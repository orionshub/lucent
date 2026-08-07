/**
 * collapsible.test.tsx — Collapsible tests (LAYOUT-05)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { Collapsible } from '../src/primitives/Collapsible/Collapsible';

afterEach(cleanup);

describe('Collapsible (LAYOUT-05)', () => {
  it('toggles content visibility via the trigger', () => {
    render(
      <Collapsible.Root>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Hidden content</Collapsible.Content>
      </Collapsible.Root>,
    );
    const trigger = screen.getByRole('button', { name: 'Toggle' });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(trigger.getAttribute('data-state')).toBe('open');
  });

  it('respects defaultOpen', () => {
    render(
      <Collapsible.Root defaultOpen>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Visible content</Collapsible.Content>
      </Collapsible.Root>,
    );
    expect(screen.getByText('Visible content')).toBeInTheDocument();
  });

  it('passes axe with no violations', async () => {
    const { container } = render(
      <main>
        <Collapsible.Root>
          <Collapsible.Trigger>Toggle</Collapsible.Trigger>
          <Collapsible.Content>Content</Collapsible.Content>
        </Collapsible.Root>
      </main>,
    );
    await expect(container).toHaveNoViolations();
  });
});
