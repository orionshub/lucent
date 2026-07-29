"use client";

/**
 * ThemePanel — prebuilt drop-in theming/accessibility panel
 *
 * Exposes all four runtime axes plus solid-mode toggle and reset.
 * Drives useLucent() setters so surfaces update via CSS cascade with zero re-render.
 *
 * When transparency slider is at or near the 0.60 floor, a visible warning
 * appears per D-10a policy.
 *
 * Import the CSS separately (side-effect free barrel):
 *   import '@lucent/react/theme.css';
 *
 * Security: label text is React text nodes only (no innerHTML).
 */

import React, { useState } from 'react';
import { useLucent } from './useLucent';
import { GlassSurface } from '../primitives/GlassSurface/GlassSurface';
import { GLASS_OPACITY_MIN, GLASS_OPACITY_MAX, GLASS_BLUR_MAX } from './setters';

// Floor warning threshold — warn when within 5% of the floor
const FLOOR_WARNING_THRESHOLD = GLASS_OPACITY_MIN + 0.05;

export interface ThemePanelProps {
  className?: string;
}

export function ThemePanel({ className }: ThemePanelProps) {
  const {
    theme, accent, density, glassOpacity, glassBlur, contrast,
    setTheme, setAccent, setDensity, setGlassOpacity, setGlassBlur, setContrast,
  } = useLucent();

  const showFloorWarning = glassOpacity <= FLOOR_WARNING_THRESHOLD;

  const handleReset = () => {
    setTheme('dark');
    setAccent('cyan');
    setDensity('airy');
    setGlassOpacity(0.72);
    setGlassBlur(12);
    setContrast('default');
  };

  return (
    <GlassSurface className={`lucent-theme-panel${className ? ` ${className}` : ''}`}>

      {/* ─── Theme (dark / light) ─────────────────────────────────────── */}
      <div className="lucent-panel-section">
        <label className="lucent-panel-label" htmlFor="lucent-theme-select">
          Theme
        </label>
        <select
          id="lucent-theme-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value as 'dark' | 'light')}
          className="lucent-panel-select"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>

      {/* ─── Accent colour ───────────────────────────────────────────── */}
      <div className="lucent-panel-section">
        <label className="lucent-panel-label" htmlFor="lucent-accent-select">
          Accent
        </label>
        <select
          id="lucent-accent-select"
          value={accent}
          onChange={(e) => setAccent(e.target.value as 'cyan' | 'violet' | 'teal')}
          className="lucent-panel-select"
        >
          <option value="cyan">Cyan</option>
          <option value="violet">Violet</option>
          <option value="teal">Teal</option>
        </select>
      </div>

      {/* ─── Glass transparency ──────────────────────────────────────── */}
      <div className="lucent-panel-section">
        <label className="lucent-panel-label" htmlFor="lucent-opacity-slider">
          Glass transparency
          <span className="lucent-panel-value"> {Math.round(glassOpacity * 100)}%</span>
        </label>
        <input
          id="lucent-opacity-slider"
          type="range"
          min={GLASS_OPACITY_MIN}
          max={GLASS_OPACITY_MAX}
          step={0.01}
          value={glassOpacity}
          onChange={(e) => setGlassOpacity(parseFloat(e.target.value))}
          className="lucent-panel-slider"
          aria-label={`Glass transparency: ${Math.round(glassOpacity * 100)}%`}
        />
        <p className="lucent-panel-helper">
          Lower this if text is hard to read.
        </p>
        {showFloorWarning && (
          <p className="lucent-panel-warning" role="alert">
            Near minimum transparency — text contrast may be reduced over light backgrounds.
            Use solid mode for maximum readability.
          </p>
        )}
      </div>

      {/* ─── Blur intensity ──────────────────────────────────────────── */}
      <div className="lucent-panel-section">
        <label className="lucent-panel-label" htmlFor="lucent-blur-slider">
          Blur intensity
          <span className="lucent-panel-value"> {glassBlur}px</span>
        </label>
        <input
          id="lucent-blur-slider"
          type="range"
          min={0}
          max={GLASS_BLUR_MAX}
          step={1}
          value={glassBlur}
          onChange={(e) => setGlassBlur(parseInt(e.target.value, 10))}
          className="lucent-panel-slider"
          aria-label={`Blur intensity: ${glassBlur}px`}
        />
        <p className="lucent-panel-helper">
          Purely visual — readability never depends on it.
        </p>
      </div>

      {/* ─── Density ─────────────────────────────────────────────────── */}
      <div className="lucent-panel-section">
        <label className="lucent-panel-label" htmlFor="lucent-density-select">
          Density
        </label>
        <select
          id="lucent-density-select"
          value={density}
          onChange={(e) => setDensity(e.target.value as 'airy' | 'balanced' | 'compact')}
          className="lucent-panel-select"
        >
          <option value="airy">Airy</option>
          <option value="balanced">Balanced</option>
          <option value="compact">Compact</option>
        </select>
      </div>

      {/* ─── Solid mode toggle ───────────────────────────────────────── */}
      <div className="lucent-panel-section">
        <label className="lucent-panel-label" htmlFor="lucent-solid-toggle">
          Solid mode (high contrast)
        </label>
        <input
          id="lucent-solid-toggle"
          type="checkbox"
          checked={contrast === 'solid'}
          onChange={(e) => setContrast(e.target.checked ? 'solid' : 'default')}
          className="lucent-panel-checkbox"
          aria-label="Solid mode — makes every surface opaque for maximum readability"
        />
        <p className="lucent-panel-helper">
          Makes every surface opaque for maximum readability.
        </p>
      </div>

      {/* ─── Reset ───────────────────────────────────────────────────── */}
      <div className="lucent-panel-section">
        <button
          type="button"
          onClick={handleReset}
          className="lucent-panel-reset"
        >
          Reset to defaults
        </button>
      </div>

    </GlassSurface>
  );
}
