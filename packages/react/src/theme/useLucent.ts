"use client";

/**
 * useLucent — Access the Lucent theming context from any component.
 *
 * Exposes the current axis values and imperative setters for building
 * custom theming controls (sliders, toggle buttons, selects, etc.).
 *
 * Must be used inside a <LucentProvider>.
 *
 * @throws if called outside of a <LucentProvider>
 */
import { useContext } from 'react';
import { LucentContext, type LucentContextValue } from './LucentProvider';

export function useLucent(): LucentContextValue {
  const ctx = useContext(LucentContext);
  if (!ctx) {
    throw new Error(
      'useLucent() must be used inside a <LucentProvider>. ' +
      'Wrap your application (or the relevant subtree) with <LucentProvider>.',
    );
  }
  return ctx;
}
