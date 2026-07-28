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
  },
};
