module.exports = {
  env: {
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['promise'],
  rules: {
    'no-console': 0,
    'no-underscore-dangle': ['error', { allow: ['_id', '__v'] }],
    'promise/always-return': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-native': 'off',
    'promise/no-nesting': 'error',
    'promise/no-promise-in-callback': 'error',
    'promise/no-return-in-finally': 'error',
    'prefer-arrow-callback': 'error',
  },
};
