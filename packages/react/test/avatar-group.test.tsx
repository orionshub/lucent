/**
 * avatar-group.test.tsx — Avatar Group tests (DATA-04)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { AvatarGroup } from '../src/primitives/AvatarGroup/AvatarGroup';
import { Avatar } from '../src/primitives/Avatar/Avatar';

afterEach(cleanup);

function people(n: number) {
  return Array.from({ length: n }, (_, i) => (
    <Avatar key={i} fallback={`U${i + 1}`} alt={`User ${i + 1}`} />
  ));
}

describe('AvatarGroup (DATA-04)', () => {
  it('renders all avatars when under the max', () => {
    render(<AvatarGroup max={5}>{people(3)}</AvatarGroup>);
    expect(screen.queryByText(/^\+/)).toBeNull();
  });

  it('shows a "+N" overflow chip beyond max', () => {
    render(<AvatarGroup max={3}>{people(5)}</AvatarGroup>);
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('overflow chip has an accessible label', () => {
    render(<AvatarGroup max={3}>{people(5)}</AvatarGroup>);
    expect(screen.getByLabelText('2 more')).toBeInTheDocument();
  });

  it('renders exactly `max` items plus the overflow chip', () => {
    const { container } = render(<AvatarGroup max={2}>{people(6)}</AvatarGroup>);
    const items = container.querySelectorAll('.lucent-avatar-group__item');
    // 2 visible + 1 overflow chip
    expect(items.length).toBe(3);
  });

  it('forwards ref', () => {
    let node: HTMLDivElement | null = null;
    render(<AvatarGroup ref={(n) => { node = n; }}>{people(2)}</AvatarGroup>);
    expect(node).not.toBeNull();
  });

  it('passes axe with no violations', async () => {
    const { container } = render(<main><AvatarGroup max={3}>{people(5)}</AvatarGroup></main>);
    await expect(container).toHaveNoViolations();
  });
});
