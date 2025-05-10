module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2024, // or latest
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json', // Ensure this points to your main tsconfig.json
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.css'],
      },
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
      },
    },
    'import/ignore': [
      'node_modules', // Default ignore pattern
      '\.(coffee|scss|less|svg)$', // Default ignore pattern for asset types
      '@remix-run/css-bundle', // Specifically ignore this virtual module
    ],
  },
  extends: [
    'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended', // Likely included by @remix-run/eslint-config
    'plugin:react/recommended',
    'plugin:react/jsx-runtime', // For new JSX transform in React 17+
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    '@remix-run/eslint-config', // New Remix config
    '@remix-run/eslint-config/node', // For Node.js specific parts
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:storybook/recommended', // If you use Storybook
    'prettier', // Must be LAST to override other formatting rules
  ],
  plugins: [
    // '@typescript-eslint', // This is likely included by @remix-run/eslint-config
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
    // 'remix' plugin is usually included by @remix-run/eslint-config
  ],
  rules: {
    // General ESLint rules
    'no-console': ['warn', { allow: ['warn', 'error'] }], // Allow console.warn and .error
    'no-unused-vars': 'off', // Use @typescript-eslint/no-unused-vars instead
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn', // Encourage typing over 'any'
    // React specific rules
    'react/prop-types': 'off', // Not needed with TypeScript
    'react/react-in-jsx-scope': 'off', // Handled by new JSX transform
    // Import rules
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'object',
          'type',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/no-unresolved': ['error', { ignore: ['^virtual:'] }], // For virtual modules if any
    // Remix specific (often covered by plugin:remix/recommended)
    // Add custom rules here
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // TypeScript specific overrides
      },
    },
    {
      files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'], // Storybook files
      rules: {
        // Storybook specific overrides if needed
      },
    },
    {
        // For config files like this one, *.config.js, etc.
        files: ['*.cjs', '*.js', '*.config.js', '*.config.ts'],
        env: {
            node: true,
        },
        rules: {
            '@typescript-eslint/no-var-requires': 'off',
        }
    }
  ],
};
