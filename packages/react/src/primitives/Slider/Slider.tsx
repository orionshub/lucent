"use client";

/**
 * Slider — Radix Slider.Root + Track + Range + Thumb (FORM-09)
 *
 * Glass track + accent range fill + accent thumb with luminous edge.
 * Multi-thumb via defaultValue/value array. RTL via Radix direction prop.
 */
import React from 'react';
import { Slider as RadixSlider } from 'radix-ui';
import { cx } from '../../utils/cx';

export type SliderProps = React.ComponentPropsWithoutRef<typeof RadixSlider.Root> & {
  className?: string;
  /** Format function for aria-valuetext on each thumb. */
  getValueLabel?: (value: number, index: number) => string;
};

export const Slider = React.forwardRef<
  React.ElementRef<typeof RadixSlider.Root>,
  SliderProps
>(function Slider({ className, getValueLabel, value, defaultValue, ...props }, ref) {
  const thumbValues = value ?? defaultValue ?? [0];
  return (
    <RadixSlider.Root
      ref={ref}
      className={cx('lucent-slider', className)}
      value={value}
      defaultValue={defaultValue}
      {...props}
    >
      <RadixSlider.Track className="lucent-slider__track">
        <RadixSlider.Range className="lucent-slider__range" />
      </RadixSlider.Track>
      {thumbValues.map((v, i) => (
        <RadixSlider.Thumb
          key={i}
          className="lucent-slider__thumb"
          aria-label={props['aria-label'] ? `${props['aria-label']} ${i + 1}` : undefined}
          aria-valuetext={getValueLabel ? getValueLabel(v, i) : undefined}
        />
      ))}
    </RadixSlider.Root>
  );
});

Slider.displayName = 'Slider';
