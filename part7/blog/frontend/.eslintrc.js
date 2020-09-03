module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
    'jest/globals': true,
    'cypress/globals': true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:promise/recommended',
    'prettier',
    'prettier/react',
    'plugin:cypress/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'promise', 'jest', 'cypress'],
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id', '__v'] }],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
  },
};
