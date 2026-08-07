/**
 * context-menu.test.tsx — ContextMenu tests (OVL-07)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { ContextMenu } from '../src/primitives/ContextMenu/ContextMenu';

afterEach(cleanup);

function renderMenu() {
  return render(
    <ContextMenu.Root>
      <ContextMenu.Trigger>Right-click area</ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item>Copy</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item variant="destructive">Delete</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>,
  );
}

describe('ContextMenu (OVL-07)', () => {
  it('opens on right-click (contextmenu event)', () => {
    renderMenu();
    fireEvent.contextMenu(screen.getByText('Right-click area'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem').length).toBeGreaterThanOrEqual(2);
  });

  it('applies the destructive item modifier class', () => {
    renderMenu();
    fireEvent.contextMenu(screen.getByText('Right-click area'));
    expect(screen.getByText('Delete').classList.contains('lucent-menu__item--destructive')).toBe(true);
  });

  it('passes axe when open', async () => {
    const { baseElement } = renderMenu();
    fireEvent.contextMenu(screen.getByText('Right-click area'));
    await expect(baseElement).toHaveNoViolations({
      rules: { region: { enabled: false }, 'aria-hidden-focus': { enabled: false } },
    });
  });
});
