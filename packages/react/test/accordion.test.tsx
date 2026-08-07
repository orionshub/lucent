/**
 * accordion.test.tsx — Accordion tests (LAYOUT-04)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { Accordion } from '../src/primitives/Accordion/Accordion';

afterEach(cleanup);

function renderAccordion(props: React.ComponentProps<typeof Accordion.Root>) {
  return render(
    <Accordion.Root {...props}>
      <Accordion.Item value="a">
        <Accordion.Trigger>First</Accordion.Trigger>
        <Accordion.Content>First content</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="b">
        <Accordion.Trigger>Second</Accordion.Trigger>
        <Accordion.Content>Second content</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>,
  );
}

describe('Accordion (LAYOUT-04)', () => {
  it('renders triggers as buttons with aria-expanded', () => {
    renderAccordion({ type: 'single', collapsible: true });
    const first = screen.getByRole('button', { name: 'First' });
    expect(first.getAttribute('aria-expanded')).toBe('false');
  });

  it('expands an item when its trigger is clicked (single)', () => {
    renderAccordion({ type: 'single', collapsible: true });
    const first = screen.getByRole('button', { name: 'First' });
    fireEvent.click(first);
    expect(first.getAttribute('aria-expanded')).toBe('true');
    expect(first.getAttribute('data-state')).toBe('open');
  });

  it('single mode collapses other items', () => {
    renderAccordion({ type: 'single', collapsible: true });
    const first = screen.getByRole('button', { name: 'First' });
    const second = screen.getByRole('button', { name: 'Second' });
    fireEvent.click(first);
    fireEvent.click(second);
    expect(first.getAttribute('aria-expanded')).toBe('false');
    expect(second.getAttribute('aria-expanded')).toBe('true');
  });

  it('multiple mode allows two open items', () => {
    renderAccordion({ type: 'multiple' });
    const first = screen.getByRole('button', { name: 'First' });
    const second = screen.getByRole('button', { name: 'Second' });
    fireEvent.click(first);
    fireEvent.click(second);
    expect(first.getAttribute('aria-expanded')).toBe('true');
    expect(second.getAttribute('aria-expanded')).toBe('true');
  });

  it('passes axe with no violations', async () => {
    const { container } = renderAccordion({ type: 'single', collapsible: true });
    await expect(container).toHaveNoViolations();
  });
});
