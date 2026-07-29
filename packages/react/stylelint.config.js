/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  rules: {
    // FND-08 / D-13: ban physical box-model properties — use logical equivalents
    // e.g. margin-inline-start instead of margin-left, inset-inline-end instead of right
    'property-disallowed-list': [
      'margin-left',
      'margin-right',
      'padding-left',
      'padding-right',
      'left',
      'right',
      'float',
      'clear',
    ],
    // Ban physical text-align values (left/right)
    'declaration-property-value-disallowed-list': {
      'text-align': ['left', 'right'],
    },
    // Allow alpha-value in modern CSS (used in hsl() / color-mix())
    'color-function-notation': 'modern',
    // Allow CSS custom property values in various places
    'value-keyword-case': ['lower', { camelCaseSvgKeywords: true }],
    // Allow at-rules we use (supports, media, keyframes, layer, theme)
    'at-rule-no-unknown': [true, {
      ignoreAtRules: ['theme', 'layer'],
    }],
    'import-notation': null,
    // Allow BEM-style component class names: block, block__element, block--modifier
    // e.g. .lucent-badge, .lucent-btn__spinner, .lucent-badge--soft
    'selector-class-pattern': [
      '^[a-z](?:[a-z0-9]*)(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$',
      { message: 'Expected class selector to be kebab-case BEM (block__element--modifier)' },
    ],
    // Tokens are authored as decimal alphas (e.g. hsl(... / 0.15)) to match the
    // token layer; do not force percentage notation.
    'alpha-value-notation': null,
    // Compiled/generated token CSS and hand-authored component CSS don't need the
    // empty-line-before formatting rule enforced.
    'rule-empty-line-before': null,
    'custom-property-empty-line-before': null,
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    // We intentionally ship `-webkit-backdrop-filter` for Safari (glass surfaces).
    'property-no-vendor-prefix': null,
    // HSL is authored as unitless channel triplets ("225 24% 12%") so alpha
    // composition works via hsl(var(--token) / <alpha>). Do not force `deg`.
    'hue-degree-notation': null,
    // Font-family proper nouns (Roboto, Menlo, "Space Grotesk") keep their casing.
    'value-keyword-case': null,
    'font-family-name-quotes': null,
  },
  // Generated token CSS (Style Dictionary output) and font-face file are not
  // hand-authored; skip formatting-only lint noise on them. The RTL logical-property
  // guard still applies to all hand-authored component CSS.
  ignoreFiles: [
    'src/styles/tokens.css',
    'src/styles/tokens.*.css',
    'src/tailwind/preset.css',
  ],
};
