module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'eol-last': 'off',
    'arrow-parens': 'off',
    'linebreak-style': 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',
    'no-undef': 'off',
    'max-len': 'off',
    'guard-for-in': 'off',
    // 'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'no-restricted-syntax': 'off',
    'no-alert': 'off',
    'new-cap': 'off',
    'no-mixed-operators': 'off',
    'no-restricted-globals': 'off',
    'no-empty': 'off',
    'no-useless-constructor': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  },
};
