module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'react-hooks'],
  rules: {
    // es
    semi: 'warn',
    'max-len': 'off',
    'consistent-return': 'off',
    'global-require': 'warn',
    'no-empty': 'warn',
    'no-undef': 'warn',
    'no-unused-vars': 'warn',
    'no-trailing-spaces': 'warn',
    'no-multiple-empty-lines': 'warn',
    'no-nested-ternary': 'warn',
    'no-underscore-dangle': 'off',
    'padded-blocks': 'off',
    'no-use-before-define': ['error', { functions: false }],
    'object-curly-newline': 'off',
    'quote-props': 'off',
    'no-plusplus': 'off',
    'arrow-parens': 'off',
    'no-lonely-if': 'off',
    'no-param-reassign': ['error', { props: false }],

    // import
    'import/prefer-default-export': 'off',
    // 'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

    // react
    'react/jsx-filename-extension': 'off',
    'react/prefer-stateless-function': 'warn',
    'react/no-unused-state': 'warn',
    'react/forbid-prop-types': 'warn',
    'react/prop-types': 'warn',
    'react/destructuring-assignment': 'warn',
    'react/no-unused-prop-types': 'warn',
    'react/no-did-update-set-state': 'warn',
    'react/no-array-index-key': 'warn',
    'react/self-closing-comp': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-curly-newline': 'warn',
    'react/jsx-wrap-multilines': 'warn',
    'react/jsx-one-expression-per-line': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
