/**
 * dropdown-menu.test.tsx — DropdownMenu tests (OVL-06)
 */
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { DropdownMenu } from '../src/primitives/DropdownMenu/DropdownMenu';

afterEach(cleanup);

function renderMenu(onSelect?: () => void) {
  return render(
    <DropdownMenu.Root defaultOpen>
      <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>Actions</DropdownMenu.Label>
        <DropdownMenu.Item onSelect={onSelect}>Edit</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item variant="destructive">Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>,
  );
}

describe('DropdownMenu (OVL-06)', () => {
  it('renders a menu with menuitems when open', () => {
    renderMenu();
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem').length).toBeGreaterThanOrEqual(2);
  });

  it('applies the destructive item modifier class', () => {
    renderMenu();
    const del = screen.getByText('Delete');
    expect(del.classList.contains('lucent-menu__item--destructive')).toBe(true);
  });

  it('fires onSelect when an item is chosen', () => {
    const onSelect = vi.fn();
    renderMenu(onSelect);
    fireEvent.click(screen.getByText('Edit'));
    expect(onSelect).toHaveBeenCalled();
  });

  it('passes axe when open', async () => {
    const { baseElement } = renderMenu();
    await expect(baseElement).toHaveNoViolations({
      rules: { region: { enabled: false }, 'aria-hidden-focus': { enabled: false } },
    });
  });
});
