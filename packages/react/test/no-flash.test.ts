/**
 * no-flash.test.ts — SSR no-flash script executes correctly (FND-05)
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { noFlashScript } from '../src/theme/no-flash-script';

describe('noFlashScript (FND-05, D-14)', () => {

  beforeEach(() => {
    // Reset html attributes before each test
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('data-accent');
    document.documentElement.removeAttribute('data-density');
    document.documentElement.style.removeProperty('--lucent-glass-opacity');
    document.documentElement.style.removeProperty('--lucent-glass-blur');
    localStorage.clear();
  });

  it('noFlashScript is a non-empty string', () => {
    expect(typeof noFlashScript).toBe('string');
    expect(noFlashScript.length).toBeGreaterThan(0);
  });

  it('sets default data-theme="dark" when nothing is persisted', () => {
    // eslint-disable-next-line no-new-func
    new Function(noFlashScript)();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('restores persisted theme from localStorage', () => {
    localStorage.setItem('lucent-theme', 'light');
    // eslint-disable-next-line no-new-func
    new Function(noFlashScript)();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('sets default data-accent="cyan" when nothing is persisted', () => {
    // eslint-disable-next-line no-new-func
    new Function(noFlashScript)();
    expect(document.documentElement.getAttribute('data-accent')).toBe('cyan');
  });

  it('restores persisted accent', () => {
    localStorage.setItem('lucent-accent', 'violet');
    // eslint-disable-next-line no-new-func
    new Function(noFlashScript)();
    expect(document.documentElement.getAttribute('data-accent')).toBe('violet');
  });

  it('sets default data-density="airy" when nothing is persisted', () => {
    // eslint-disable-next-line no-new-func
    new Function(noFlashScript)();
    expect(document.documentElement.getAttribute('data-density')).toBe('airy');
  });

  it('restores persisted glass-opacity from localStorage', () => {
    localStorage.setItem('lucent-glass-opacity', '0.85');
    // eslint-disable-next-line no-new-func
    new Function(noFlashScript)();
    const val = document.documentElement.style.getPropertyValue('--lucent-glass-opacity');
    expect(parseFloat(val)).toBeCloseTo(0.85);
  });

  it('clamps persisted glass-opacity to floor (0.60)', () => {
    localStorage.setItem('lucent-glass-opacity', '0.1');
    // eslint-disable-next-line no-new-func
    new Function(noFlashScript)();
    const val = document.documentElement.style.getPropertyValue('--lucent-glass-opacity');
    expect(parseFloat(val)).toBeCloseTo(0.60);
  });

  it('does not throw when localStorage has corrupt data', () => {
    localStorage.setItem('lucent-theme', '<script>alert(1)</script>');
    // Should run without throwing and fall back to defaults
    expect(() => new Function(noFlashScript)()).not.toThrow();
    // Corrupt theme value should not be applied (not a whitelisted value)
    const theme = document.documentElement.getAttribute('data-theme');
    expect(['dark', 'light']).toContain(theme);
  });

  it('noFlashScript is a static string with no dynamic interpolation', () => {
    // Security: the script string should not contain template literal markers
    // or function calls that could be injection sinks
    expect(noFlashScript).not.toContain('${');
    expect(noFlashScript).not.toContain('document.write');
    expect(noFlashScript).not.toContain('innerHTML');
    expect(noFlashScript).not.toContain('eval(');
  });

});
