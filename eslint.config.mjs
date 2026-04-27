import nextPlugin from '@next/eslint-plugin-next';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import betterTailwind from 'eslint-plugin-better-tailwindcss';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
      '**/build/**',
      '**/dist/**',
      '**/coverage/**',
      '**/playwright-report/**',
      '**/storybook-static/**',
      '**/test-results/**',
      '**/.git/**',
      'apps/web/next-env.d.ts',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        projectService: true,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@next/next': nextPlugin,
      '@typescript-eslint': typescriptEslint,
      'better-tailwindcss': betterTailwind,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'unused-imports': unusedImports,
    },
    settings: {
      next: {
        rootDir: ['apps/web/'],
      },
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: 'apps/web/tsconfig.json',
        },
      },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...reactPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-check': false,
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': 'allow-with-description',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      'better-tailwindcss/enforce-canonical-classes': [
        'warn',
        {
          entryPoint: 'apps/web/shared/styles/tailwind.css',
        },
      ],
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-anonymous-default-export': [
        'error',
        {
          allowArray: false,
          allowArrowFunction: false,
          allowCallExpression: true,
          allowLiteral: false,
          allowObject: true,
        },
      ],
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling'], 'index', 'type'],
          'newlines-between': 'always',
          pathGroups: [
            {
              group: 'external',
              pattern: 'react',
              position: 'before',
            },
            {
              group: 'external',
              pattern: 'next/**',
              position: 'after',
            },
            {
              group: 'internal',
              pattern: '@/**',
              position: 'before',
            },
            {
              group: 'index',
              pattern: '**/*.{css,scss}',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
        },
      ],
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          aspects: ['invalidHref', 'preferButton'],
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-duplicate-imports': 'off',
      'no-empty': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-var': 'error',
      'prefer-const': 'error',
      'react/display-name': 'off',
      'react/no-unescaped-entities': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: [
      '*.config.{js,mjs,cjs,ts}',
      '**/*.config.{js,mjs,cjs,ts}',
      'apps/web/.storybook/**/*.{ts,tsx}',
      'apps/web/proxy.ts',
    ],
    languageOptions: {
      parserOptions: {
        projectService: false,
      },
    },
    rules: {
      'import/no-anonymous-default-export': 'off',
      'no-console': 'off',
    },
  },
];

export default config;
