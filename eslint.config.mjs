import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import perfectionist from 'eslint-plugin-perfectionist'
import unicorn from 'eslint-plugin-unicorn'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'src/db/migrations/**',
      'pnpm-lock.yaml',
      'worker-configuration.d.ts',
      'commitlint.config.cjs',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,

  {
    files: ['src/**/*.{ts,tsx,js}'],

    plugins: {
      perfectionist,
      unicorn,
    },

    rules: {
      // Enforce kebab-case filenames
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: ['index.ts', 'README.md'],
        },
      ],

      // Import sorting
      'perfectionist/sort-imports': 'error',

      // Console warnings
      'no-console': 'warn',

      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
]
