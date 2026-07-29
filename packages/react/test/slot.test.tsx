/**
 * slot.test.tsx — Slot merges props/ref onto a single child (UTIL-02)
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Slot, Slottable } from '../src/utils/Slot/index';

describe('Slot (UTIL-02)', () => {

  it('renders the single child element (child element wins)', () => {
    const { container } = render(
      <Slot className="from-slot">
        <a href="#link">Link text</a>
      </Slot>,
    );
    const el = container.firstElementChild;
    expect(el?.tagName.toLowerCase()).toBe('a');
    expect(el?.getAttribute('href')).toBe('#link');
  });

  it('merges className passed to the Slot onto the child', () => {
    const { container } = render(
      <Slot className="from-slot">
        <a href="#" className="from-child">Link</a>
      </Slot>,
    );
    const el = container.firstElementChild;
    expect(el?.classList.contains('from-slot')).toBe(true);
    expect(el?.classList.contains('from-child')).toBe(true);
  });

  it('forwards a ref to the child DOM node', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <Slot ref={ref}>
        <a href="#">Link</a>
      </Slot>,
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName.toLowerCase()).toBe('a');
  });

  it('exports Slottable', () => {
    expect(Slottable).toBeTruthy();
  });

});
