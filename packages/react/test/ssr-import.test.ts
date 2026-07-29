/**
 * ssr-import.test.ts — SSR import-safety smoke test (FND-05, D-14)
 *
 * Runs under the node-env Vitest lane (no DOM globals).
 * Verifies that every public entry can be imported without triggering
 * a browser-global access at module top level.
 *
 * This catches Pitfall B: "no browser globals at module top level."
 */
import { describe, it, expect } from 'vitest';

describe('SSR import-safety (FND-05, D-14)', () => {

  it('src/index.ts imports without accessing browser globals', async () => {
    // If any top-level code accesses window/document, this will throw in node env
    const mod = await import('../src/index');
    expect(typeof mod).toBe('object');
  });

  it('src/theme/index.ts imports without accessing browser globals', async () => {
    const mod = await import('../src/theme/index');
    expect(typeof mod.LucentProvider).toBe('function');
    expect(typeof mod.useLucent).toBe('function');
    expect(typeof mod.noFlashScript).toBe('string');
    expect(typeof mod.setGlassOpacity).toBe('function');
  });

  it('src/primitives/GlassSurface/index.ts imports without accessing browser globals', async () => {
    const mod = await import('../src/primitives/GlassSurface/index');
    // GlassSurface is a React.forwardRef component — typeof is 'object'
    expect(mod.GlassSurface).toBeTruthy();
  });

  it('src/tokens/index.ts imports without accessing browser globals', async () => {
    const mod = await import('../src/tokens/index');
    expect(typeof mod).toBe('object');
  });

  it('setters.ts: setGlassOpacity is a no-op when called (document is present via happy-dom in dom lane, but not here)', async () => {
    // In the node lane, `document` is undefined.
    // setGlassOpacity must not throw in this environment.
    const { setGlassOpacity } = await import('../src/theme/setters');
    expect(() => setGlassOpacity(0.8)).not.toThrow();
  });

  it('noFlashScript is a string that does not access globals at parse time', async () => {
    // noFlashScript is a module-level string constant — it must be parseable
    // without executing in a DOM context.
    const { noFlashScript } = await import('../src/theme/no-flash-script');
    expect(typeof noFlashScript).toBe('string');
    expect(noFlashScript).not.toBe('');
  });

});
