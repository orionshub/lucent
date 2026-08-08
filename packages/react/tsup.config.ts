import { defineConfig } from 'tsup';

export default defineConfig({
  // Multi-entry: each entry becomes its own output in dist/
  // Empty globs (e.g. no primitives yet) are harmless.
  entry: [
    'src/index.ts',
    'src/primitives/*/index.ts',
    'src/utils/*/index.ts',
    'src/theme/index.ts',
    // Server-safe standalone entry so SSR head-injection can import the no-flash
    // script without pulling the client theme barrel (RSC-safe).
    'src/theme/no-flash-script.ts',
    'src/tokens/index.ts',
  ],

  format: ['esm'],       // ESM-only (D-04)
  dts: true,             // Per-entry .d.ts via rollup pass
  splitting: false,
  treeshake: true,
  clean: true,           // Wipe dist before build; CSS copy runs AFTER via onSuccess

  // Keep these external so they're never bundled — consumers share one copy (D-05)
  external: ['react', 'react-dom', 'radix-ui', /^@radix-ui\//],

  // NOTE: esbuild-plugin-preserve-directives was rejected (pre-1.0 risk).
  // "use client" is applied by scripts/post-build.mjs (zero-dep fallback, runs in onSuccess).
  // esbuildPlugins: [],

  // After tsup finishes (and after clean:true wipes dist), run the post-build script:
  //   1. Copy src/**/*.css → dist/ (CSS/preset subpath export delivery)
  //   2. Prepend "use client" to interactive dist entries
  onSuccess: 'node scripts/post-build.mjs',

  // Source maps for debugging
  sourcemap: true,
});
