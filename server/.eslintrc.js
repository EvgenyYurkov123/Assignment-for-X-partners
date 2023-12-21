module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    strict: 'off',
    'no-console': 'off',
    'consistent-return': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
