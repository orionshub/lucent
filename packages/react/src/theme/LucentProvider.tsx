"use client";

/**
 * LucentProvider — the runtime theming spine for @orionshub/lucent
 *
 * The SINGLE module allowed to touch `document` (D-09).
 * All four axis VALUES are held in React context for control UIs + persistence.
 * All four axis PROPAGATIONS happen via pure CSS cascade (zero React re-render
 * on glass surfaces — only the control's own displayed value updates).
 *
 * Wires Radix DirectionProvider for RTL keyboard + focus direction (D-13/FND-05).
 * Uses a pre-hydration no-flash inline script for SSR theme consistency (D-14).
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { Direction } from 'radix-ui';
const DirectionProvider = Direction.DirectionProvider;
import {
  setTheme, setAccent, setDensity, setGlassOpacity, setGlassBlur, setContrast,
  GLASS_OPACITY_DEFAULT, GLASS_OPACITY_MIN, GLASS_OPACITY_MAX, GLASS_BLUR_MAX,
  type Theme, type Accent, type Density, type Contrast,
} from './setters';

// ─── Context shape ─────────────────────────────────────────────────────────

export interface LucentContextValue {
  theme:          Theme;
  accent:         Accent;
  density:        Density;
  contrast:       Contrast;
  glassOpacity:   number;
  glassBlur:      number;
  /** Switch dark/light theme */
  setTheme:       (t: Theme) => void;
  /** Switch accent colour preset */
  setAccent:      (a: Accent) => void;
  /** Switch spacing density */
  setDensity:     (d: Density) => void;
  /** Toggle solid/default contrast mode */
  setContrast:    (c: Contrast) => void;
  /** Adjust glass opacity (0.60–1.0) */
  setGlassOpacity: (v: number) => void;
  /** Adjust backdrop blur (0–24px) */
  setGlassBlur:   (px: number) => void;
}

export const LucentContext = createContext<LucentContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────

export interface LucentProviderProps {
  children: ReactNode;
  /** Default colour theme (default: "dark") */
  defaultTheme?:        Theme;
  /** Default accent preset (default: "cyan") */
  defaultAccent?:       Accent;
  /** Default density (default: "airy") */
  defaultDensity?:      Density;
  /** Default glass opacity (default: 0.72) */
  defaultGlassOpacity?: number;
  /** Default backdrop blur in px (default: 12) */
  defaultGlassBlur?:    number;
  /** Text directionality for Radix DirectionProvider (default: "ltr") */
  dir?:                 'ltr' | 'rtl';
  /** Persist axis values to localStorage (default: true) */
  persist?:             boolean;
}

export function LucentProvider({
  children,
  defaultTheme        = 'dark',
  defaultAccent       = 'cyan',
  defaultDensity      = 'airy',
  defaultGlassOpacity = GLASS_OPACITY_DEFAULT,
  defaultGlassBlur    = 12,
  dir                 = 'ltr',
  persist             = true,
}: LucentProviderProps) {
  // SSR-stable defaults during render; effects run only after mount.
  const [theme,        setThemeState]   = useState<Theme>(defaultTheme);
  const [accent,       setAccentState]  = useState<Accent>(defaultAccent);
  const [density,      setDensityState] = useState<Density>(defaultDensity);
  const [contrast,     setContrastState]= useState<Contrast>('default');
  const [glassOpacity, setOpacityState] = useState<number>(defaultGlassOpacity);
  const [glassBlur,    setBlurState]    = useState<number>(defaultGlassBlur);

  // After mount — read persisted values and apply to DOM + state.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (persist) {
      const pTheme   = localStorage.getItem('lucent-theme')   as Theme | null;
      const pAccent  = localStorage.getItem('lucent-accent')  as Accent | null;
      const pDensity = localStorage.getItem('lucent-density') as Density | null;
      const pOp      = parseFloat(localStorage.getItem('lucent-glass-opacity') ?? '');
      const pBlur    = parseFloat(localStorage.getItem('lucent-glass-blur')    ?? '');

      if (pTheme  === 'dark'  || pTheme  === 'light')                     { setThemeState(pTheme); setTheme(pTheme); }
      if (pAccent === 'cyan'  || pAccent === 'violet' || pAccent === 'teal') { setAccentState(pAccent); setAccent(pAccent); }
      if (pDensity === 'airy' || pDensity === 'balanced' || pDensity === 'compact') { setDensityState(pDensity); setDensity(pDensity); }
      if (!isNaN(pOp)) { const v = Math.min(GLASS_OPACITY_MAX, Math.max(GLASS_OPACITY_MIN, pOp)); setOpacityState(v); setGlassOpacity(v); }
      if (!isNaN(pBlur)) { const v = Math.min(GLASS_BLUR_MAX, Math.max(0, pBlur)); setBlurState(v); setGlassBlur(v); }
    } else {
      // Apply defaults to DOM even when not persisting
      setTheme(defaultTheme);
      setAccent(defaultAccent);
      setDensity(defaultDensity);
      setGlassOpacity(defaultGlassOpacity);
      setGlassBlur(defaultGlassBlur);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist to localStorage after mount whenever values change.
  useEffect(() => {
    if (!persist || typeof window === 'undefined') return;
    localStorage.setItem('lucent-theme', theme);
    localStorage.setItem('lucent-accent', accent);
    localStorage.setItem('lucent-density', density);
    localStorage.setItem('lucent-glass-opacity', String(glassOpacity));
    localStorage.setItem('lucent-glass-blur', String(glassBlur));
  }, [theme, accent, density, glassOpacity, glassBlur, persist]);

  // Setters: update CSS cascade (via setters.ts) + React state
  const handleSetTheme = useCallback((t: Theme) => {
    setTheme(t); setThemeState(t);
  }, []);

  const handleSetAccent = useCallback((a: Accent) => {
    setAccent(a); setAccentState(a);
  }, []);

  const handleSetDensity = useCallback((d: Density) => {
    setDensity(d); setDensityState(d);
  }, []);

  const handleSetContrast = useCallback((c: Contrast) => {
    setContrast(c); setContrastState(c);
  }, []);

  const handleSetGlassOpacity = useCallback((v: number) => {
    setGlassOpacity(v);
    setOpacityState(Math.min(GLASS_OPACITY_MAX, Math.max(GLASS_OPACITY_MIN, v)));
  }, []);

  const handleSetGlassBlur = useCallback((px: number) => {
    setGlassBlur(px);
    setBlurState(Math.min(GLASS_BLUR_MAX, Math.max(0, px)));
  }, []);

  const value: LucentContextValue = {
    theme, accent, density, contrast, glassOpacity, glassBlur,
    setTheme:        handleSetTheme,
    setAccent:       handleSetAccent,
    setDensity:      handleSetDensity,
    setContrast:     handleSetContrast,
    setGlassOpacity: handleSetGlassOpacity,
    setGlassBlur:    handleSetGlassBlur,
  };

  return (
    <LucentContext.Provider value={value}>
      <DirectionProvider dir={dir}>
        {children}
      </DirectionProvider>
    </LucentContext.Provider>
  );
}
