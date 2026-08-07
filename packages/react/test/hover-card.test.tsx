/**
 * hover-card.test.tsx — HoverCard tests (OVL-05)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { HoverCard } from '../src/primitives/HoverCard/HoverCard';

afterEach(cleanup);

function renderHoverCard(defaultOpen = true) {
  return render(
    <HoverCard.Root defaultOpen={defaultOpen} openDelay={0} closeDelay={0}>
      <HoverCard.Trigger href="#">@lucent</HoverCard.Trigger>
      <HoverCard.Content>
        <p>Profile preview</p>
      </HoverCard.Content>
    </HoverCard.Root>,
  );
}

describe('HoverCard (OVL-05)', () => {
  it('renders content when open', () => {
    renderHoverCard();
    expect(screen.getByText('Profile preview')).toBeInTheDocument();
  });

  it('renders a glass content surface', () => {
    const { baseElement } = renderHoverCard();
    expect(baseElement.querySelector('.lucent-hover-card__content')).not.toBeNull();
  });

  it('passes axe when open', async () => {
    const { baseElement } = renderHoverCard();
    await expect(baseElement).toHaveNoViolations({ rules: { region: { enabled: false } } });
  });
});
