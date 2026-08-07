/**
 * slider.test.tsx — Slider tests (FORM-09)
 */
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { cleanup } from '@testing-library/react';
import { Slider } from '../src/primitives/Slider/Slider';

afterEach(cleanup);

describe('Slider (FORM-09)', () => {
  it('renders with role="slider"', () => {
    render(<Slider aria-label="Volume" defaultValue={[50]} min={0} max={100} />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('applies lucent-slider class on the root', () => {
    const { container } = render(
      <Slider aria-label="Volume" defaultValue={[50]} />,
    );
    expect(container.querySelector('.lucent-slider')).not.toBeNull();
  });

  it('renders a track element', () => {
    const { container } = render(
      <Slider aria-label="Volume" defaultValue={[50]} />,
    );
    expect(container.querySelector('.lucent-slider__track')).not.toBeNull();
  });

  it('renders a range fill element', () => {
    const { container } = render(
      <Slider aria-label="Volume" defaultValue={[50]} />,
    );
    expect(container.querySelector('.lucent-slider__range')).not.toBeNull();
  });

  it('renders a thumb element with lucent-slider__thumb', () => {
    const { container } = render(
      <Slider aria-label="Volume" defaultValue={[50]} />,
    );
    expect(container.querySelector('.lucent-slider__thumb')).not.toBeNull();
  });

  it('renders two thumbs for multi-thumb slider', () => {
    const { container } = render(
      <Slider aria-label="Range" defaultValue={[20, 80]} />,
    );
    expect(container.querySelectorAll('.lucent-slider__thumb').length).toBe(2);
  });

  it('exposes aria-valuenow on the thumb (Radix sets this)', () => {
    render(<Slider aria-label="Volume" defaultValue={[50]} min={0} max={100} />);
    expect(screen.getByRole('slider').getAttribute('aria-valuenow')).toBe('50');
  });

  it('getValueLabel sets aria-valuetext via DOM attribute', () => {
    render(
      <Slider
        aria-label="Volume"
        defaultValue={[75]}
        min={0}
        max={100}
        getValueLabel={(v) => `${v}%`}
      />,
    );
    expect(screen.getByRole('slider').getAttribute('aria-valuetext')).toBe('75%');
  });

  it('passes axe', async () => {
    const { container } = render(
      <main>
        <Slider aria-label="Volume" defaultValue={[50]} min={0} max={100} />
      </main>,
    );
    await expect(container).toHaveNoViolations();
  });
});
