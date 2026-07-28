/**
 * style-dictionary.config.ts
 *
 * Single token source → three outputs:
 *   1. src/styles/tokens.css — CSS custom properties (:root + theme/accent/density remaps)
 *   2. src/tokens/index.ts  — typed TS token map
 *   3. src/tailwind/preset.css — Tailwind v4 @theme block
 *
 * NOTE: All primitive colors are authored as HSL channel triplets (e.g. "190 95% 55%")
 * NOT as hsl() functions. This allows alpha composition via:
 *   background: hsl(var(--lucent-surface) / var(--lucent-glass-opacity))
 * and Tailwind v4 color utilities via:
 *   --lucent-accent: 190 95% 55%;   (referenced as hsl(var(--lucent-accent) / <alpha-value>))
 */

import StyleDictionary from 'style-dictionary';

// ─── Custom format: Tailwind v4 @theme ──────────────────────────────────────

StyleDictionary.registerFormat({
  name: 'lucent/tailwind-theme',
  format: ({ dictionary }) => {
    const vars = dictionary.allTokens
      .filter((t) => !t.path.includes('12') && !t.path.includes('36')) // skip internal-only type sizes
      .map((t) => {
        const name = '--' + t.name;
        // For HSL color channel triplets, wrap in hsl() with alpha-value slot for Tailwind
        // For non-color tokens, use the value directly
        const isHslChannel = typeof t.value === 'string' &&
          /^\d{1,3}\s+\d{1,3}%\s+\d{1,3}%$/.test(t.value.trim());
        const value = isHslChannel
          ? `hsl(${t.name.includes('lucent-') ? `var(${name})` : t.value} / <alpha-value>)`
          : `var(${name})`;
        return `  ${name}: ${value};`;
      })
      .join('\n');
    return `@theme {\n${vars}\n}\n`;
  },
});

// ─── SD instance with source + platforms ─────────────────────────────────────

const sd = new StyleDictionary({
  log: { verbosity: 'verbose' },
  source: [
    'tokens/primitive.json',
    'tokens/semantic.json',
  ],

  platforms: {
    // Platform 1: CSS custom properties
    css: {
      transformGroup: 'css',
      files: [
        // Dark defaults at :root — ALL tokens (primitive + semantic) so var() chains resolve
        {
          destination: 'src/styles/tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            selector: ':root',
          },
          // Include all tokens (primitives + semantics) so var() references resolve
        },
        // NOTE: Theme/accent/density override files are hand-authored (not SD-generated)
        // because SD cannot output different values for the same semantic token per context.
        // See: src/styles/tokens.light.css, tokens.accent-violet.css, tokens.accent-teal.css,
        //      tokens.density-balanced.css, tokens.density-compact.css
        // Violet accent preset
        {
          destination: 'src/styles/tokens.accent-violet.css',
          format: 'css/variables',
          options: {
            outputReferences: false,
            selector: '[data-accent="violet"]',
          },
          filter: (token) =>
            token.filePath.includes('semantic') &&
            (token.name === 'lucent-accent' || token.name === 'lucent-on-accent'),
        },
        // Teal accent preset
        {
          destination: 'src/styles/tokens.accent-teal.css',
          format: 'css/variables',
          options: {
            outputReferences: false,
            selector: '[data-accent="teal"]',
          },
          filter: (token) =>
            token.filePath.includes('semantic') &&
            (token.name === 'lucent-accent' || token.name === 'lucent-on-accent'),
        },
        // Balanced density
        {
          destination: 'src/styles/tokens.density-balanced.css',
          format: 'css/variables',
          options: {
            outputReferences: false,
            selector: '[data-density="balanced"]',
          },
          filter: (token) =>
            token.filePath.includes('semantic') && token.name === 'lucent-control-h',
        },
        // Compact density
        {
          destination: 'src/styles/tokens.density-compact.css',
          format: 'css/variables',
          options: {
            outputReferences: false,
            selector: '[data-density="compact"]',
          },
          filter: (token) =>
            token.filePath.includes('semantic') && token.name === 'lucent-control-h',
        },
      ],
    },

    // Platform 2: TypeScript token map
    ts: {
      transformGroup: 'js',
      files: [
        {
          destination: 'src/tokens/index.ts',
          format: 'javascript/es6',
          filter: (token) => token.filePath.includes('semantic'),
        },
      ],
    },

    // Platform 3: Tailwind v4 @theme
    tailwind: {
      transformGroup: 'css',
      files: [
        {
          destination: 'src/tailwind/preset.css',
          format: 'lucent/tailwind-theme',
          filter: (token) => token.filePath.includes('semantic'),
        },
      ],
    },
  },
});

// Build
await sd.buildAllPlatforms();
console.log('Style Dictionary: build complete');
