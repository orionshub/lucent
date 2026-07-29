/**
 * text.test.tsx — Text + Heading polymorphic primitives (PRIM-03)
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Text } from '../src/primitives/Text/index';
import { Heading } from '../src/primitives/Heading/index';

describe('Text (PRIM-03)', () => {
  it('renders a <p> by default', () => {
    const { container } = render(<Text>Body</Text>);
    expect(container.firstElementChild?.tagName.toLowerCase()).toBe('p');
  });

  it('renders as <span> when as="span"', () => {
    const { container } = render(<Text as="span">Inline</Text>);
    expect(container.firstElementChild?.tagName.toLowerCase()).toBe('span');
  });

  it('applies base + size classes', () => {
    const { container } = render(<Text size="label" muted>Small</Text>);
    const el = container.firstElementChild;
    expect(el?.classList.contains('lucent-text')).toBe(true);
    expect(el?.classList.contains('lucent-text--label')).toBe(true);
    expect(el?.classList.contains('lucent-text--muted')).toBe(true);
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLElement>();
    render(<Text ref={ref}>Body</Text>);
    expect(ref.current?.tagName.toLowerCase()).toBe('p');
  });
});

describe('Heading (PRIM-03)', () => {
  it('renders an <h2> by default', () => {
    const { container } = render(<Heading>Title</Heading>);
    expect(container.firstElementChild?.tagName.toLowerCase()).toBe('h2');
  });

  it('renders as <h1> when as="h1"', () => {
    const { container } = render(<Heading as="h1">Title</Heading>);
    expect(container.firstElementChild?.tagName.toLowerCase()).toBe('h1');
  });

  it('applies base + size classes', () => {
    const { container } = render(<Heading size="display">Big</Heading>);
    const el = container.firstElementChild;
    expect(el?.classList.contains('lucent-heading')).toBe(true);
    expect(el?.classList.contains('lucent-heading--display')).toBe(true);
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLHeadingElement>();
    render(<Heading ref={ref}>Title</Heading>);
    expect(ref.current?.tagName.toLowerCase()).toBe('h2');
  });
});
