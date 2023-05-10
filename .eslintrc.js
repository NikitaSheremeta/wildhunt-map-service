module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 13
  },
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ],
    'array-bracket-spacing': [
      'error',
      'never',
      {
        arraysInArrays: true,
        singleValue: false
      }
    ],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'no-magic-numbers': [
      'error',
      {
        ignoreArrayIndexes: true,
        enforceConst: true,
        detectObjects: false,
        ignore: [-1, 0, 1]
      }
    ],
    'no-unused-vars': [
      'error',
      {
        args: 'after-used'
      }
    ],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreStrings: true
      }
    ],
    'max-lines': [
      'error',
      {
        max: 560
      }
    ],
    'max-statements': [
      'error',
      16,
      {
        ignoreTopLevelFunctions: true
      }
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2
      }
    ],
    'no-nested-ternary': ['error'],
    'no-tabs': ['error'],
    'no-irregular-whitespace': 'off',
    'no-trailing-spaces': ['error'],
    'no-whitespace-before-property': ['error'],
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true
      }
    ],
    semi: ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
    'prefer-const': ['error'],
    complexity: [
      'error',
      {
        max: 16
      }
    ],
    'no-useless-concat': ['error'],
    'no-else-return': ['error'],
    'no-empty-function': ['error'],
    'no-implicit-coercion': ['error'],
    'no-implicit-globals': ['error']
  }
};
