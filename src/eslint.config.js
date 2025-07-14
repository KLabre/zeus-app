// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import jestPlugin from 'eslint-plugin-jest';

export default [
  js.configs.recommended,

  // Standard TS rules
  {
    files: ['**/*.ts', '**/*.tsx'],
    ...tseslint.configs.recommendedTypeChecked[0], // apply typed rules only to TS files
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },

  // React rules
  {
    files: ['**/*.tsx', '**/*.jsx'],
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'jsx-a11y': pluginJsxA11y,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginJsxA11y.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    plugins: {
      import: pluginImport,
    },
    rules: {
      'import/order': ['warn', { groups: ['builtin', 'external', 'internal'] }],
      'import/no-unresolved': 'off',
    },
  },

  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'warn',
    },
  },

  {
    ignores: ['build/**', 'node_modules/**', '**/.react-router/**'],
  },

  // Jest rules and globals only for test files
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: {
        jest: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        it: 'readonly',
      },
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      // optionally add/override Jest rules here
      // e.g. "jest/no-disabled-tests": "warn",
    },
  },
];
