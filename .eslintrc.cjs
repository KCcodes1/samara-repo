module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'next/core-web-vitals',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  rules: {
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }],
  },
}
