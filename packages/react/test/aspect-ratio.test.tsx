/**
 * aspect-ratio.test.tsx — AspectRatio wrapper (PRIM-07)
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { AspectRatio } from '../src/primitives/AspectRatio/index';

describe('AspectRatio (PRIM-07)', () => {

  it('renders children within the ratio wrapper', () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <img data-testid="media" alt="" src="" />
      </AspectRatio>,
    );
    expect(screen.getByTestId('media')).toBeInTheDocument();
  });

  it('applies the lucent-aspect-ratio class', () => {
    const { container } = render(
      <AspectRatio ratio={1}>
        <div>square</div>
      </AspectRatio>,
    );
    // Radix wraps in an outer positioning div; our class is on the Root
    const el = container.querySelector('.lucent-aspect-ratio');
    expect(el).not.toBeNull();
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <AspectRatio ratio={4 / 3} ref={ref}>
        <div>content</div>
      </AspectRatio>,
    );
    expect(ref.current).not.toBeNull();
  });

});
