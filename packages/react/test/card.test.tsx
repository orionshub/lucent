/**
 * card.test.tsx — Card flagship glass surface tests (LAYOUT-02)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { Card } from '../src/primitives/Card/Card';

afterEach(cleanup);

describe('Card (LAYOUT-02)', () => {
  it('renders the glass surface base class', () => {
    render(<Card data-testid="card">body</Card>);
    const el = screen.getByTestId('card');
    expect(el.classList.contains('lucent-card')).toBe(true);
    expect(el.classList.contains('lucent-glass')).toBe(true);
  });

  it('applies the default elevated + md padding modifiers', () => {
    render(<Card data-testid="card" />);
    const el = screen.getByTestId('card');
    expect(el.classList.contains('lucent-card--elevated')).toBe(true);
    expect(el.classList.contains('lucent-card--pad-md')).toBe(true);
  });

  it('applies variant and padding modifiers', () => {
    render(<Card data-testid="card" variant="outline" padding="lg" />);
    const el = screen.getByTestId('card');
    expect(el.classList.contains('lucent-card--outline')).toBe(true);
    expect(el.classList.contains('lucent-card--pad-lg')).toBe(true);
  });

  it('renders Card.Header / Card.Body / Card.Footer parts', () => {
    render(
      <Card>
        <Card.Header data-testid="h">Title</Card.Header>
        <Card.Body data-testid="b">Content</Card.Body>
        <Card.Footer data-testid="f">Actions</Card.Footer>
      </Card>,
    );
    expect(screen.getByTestId('h').classList.contains('lucent-card__header')).toBe(true);
    expect(screen.getByTestId('b').classList.contains('lucent-card__body')).toBe(true);
    expect(screen.getByTestId('f').classList.contains('lucent-card__footer')).toBe(true);
  });

  it('forwards ref to the root element', () => {
    let node: HTMLElement | null = null;
    render(<Card ref={(n) => { node = n; }} data-testid="card" />);
    expect(node).not.toBeNull();
  });

  it('passes axe with no violations', async () => {
    const { container } = render(
      <main>
        <Card>
          <Card.Header>Title</Card.Header>
          <Card.Body>Content</Card.Body>
        </Card>
      </main>,
    );
    await expect(container).toHaveNoViolations();
  });
});
