/**
 * callout.test.tsx — Callout / Alert tests (DATA-02)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { toHaveNoViolations } from './axe-matcher';
import { Callout } from '../src/primitives/Callout/Callout';

afterEach(cleanup);

describe('Callout (DATA-02)', () => {
  it('renders role="alert" when urgent', () => {
    render(<Callout urgent>Something happened</Callout>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('is a static note (no alert role) by default', () => {
    render(<Callout data-testid="c">Just a note</Callout>);
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByTestId('c')).toBeInTheDocument();
  });

  it('applies the tone modifier class', () => {
    render(<Callout data-testid="c" tone="danger">Danger</Callout>);
    expect(screen.getByTestId('c').classList.contains('lucent-callout--danger')).toBe(true);
  });

  it('renders a decorative icon as aria-hidden', () => {
    const { container } = render(<Callout icon={<svg data-testid="ico" />}>With icon</Callout>);
    const iconWrap = container.querySelector('.lucent-callout__icon');
    expect(iconWrap).not.toBeNull();
    expect(iconWrap!.getAttribute('aria-hidden')).toBe('true');
  });

  it('forwards ref', () => {
    let node: HTMLDivElement | null = null;
    render(<Callout ref={(n) => { node = n; }}>Ref</Callout>);
    expect(node).not.toBeNull();
  });

  it('passes axe for both urgent and static variants', async () => {
    const { container } = render(
      <main>
        <Callout>Static note</Callout>
        <Callout urgent tone="danger">Urgent alert</Callout>
      </main>,
    );
    await expect(container).toHaveNoViolations();
  });
});
