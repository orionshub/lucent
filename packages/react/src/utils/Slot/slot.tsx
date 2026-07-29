/**
 * Slot — polymorphism primitive for `asChild`
 *
 * Re-exports the unified Radix Slot. When a component renders `<Slot>` with
 * `asChild`, the consumer's single child element receives the merged props/ref.
 *
 * Server-safe — NO "use client" (Slot has no hooks).
 */
import React from 'react';
import { Slot as RadixSlot } from 'radix-ui';

/** The Slot component — merges props/ref onto a single child element. */
export const Slot = RadixSlot.Root;

/**
 * Slottable — marks the child that should receive slotted props in multi-child scenarios.
 * Explicitly typed to avoid emitting an unnameable Radix-internal type in the .d.ts.
 */
export const Slottable: React.FC<{ children: React.ReactNode }> = RadixSlot.Slottable;

/**
 * Shared polymorphism typing helper for interaction primitives.
 * Components that support `asChild` intersect their props with this.
 */
export interface AsChildProps {
  /**
   * When true, render the single child element (merging props/ref onto it)
   * instead of the component's default element. Powered by Radix Slot.
   */
  asChild?: boolean;
}
