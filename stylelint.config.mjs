const config = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-css-modules'],
  ignoreFiles: [
    '**/coverage/**',
    '**/node_modules/**',
    '**/playwright-report/**',
    '**/storybook-static/**',
    '**/test-results/**',
  ],
  overrides: [
    {
      files: ['**/*.css'],
      rules: {
        'scss/load-partial-extension': null,
      },
    },
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['apply', 'layer', 'source', 'tailwind', 'theme', 'utility', 'variant'],
      },
    ],
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: ['user-select'],
      },
    ],
    'import-notation': [
      'string',
      {
        allowExtension: true,
      },
    ],
    'scss/at-rule-no-unknown': null,
    'scss/load-partial-extension': 'always',
    'selector-class-pattern': null,
  },
};

export default config;
