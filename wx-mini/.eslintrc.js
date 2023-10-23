module.exports = {
  extends: ['@mpxjs'],
  rules: {
    // .mpx文件规则 https://mpx-ecology.github.io/eslint-plugin-mpx/rules/
    'camelcase': 0,
    "no-unused-vars": 0,
    "no-multiple-empty-lines": 0,
    "no-debugger": 0,
    "pace-before-function-paren": 0,
    "eqeqeq": 0,
    "no-unused-expressions": 0,
    "no-tabs": 0,
    "no-trailing-spaces": 0,
    "eol-last": 0,
    "space-before-function-paren": 0,
    "indent": 0,
    "no-async-promise-executor": 0,
    "prefer-const": 0,
    "quote-props": 0,
    "array-callback-return": 0,
    "quotes": 0,
    "no-empty": 0
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        // .js文件规则 https://eslint.bootcss.com/docs/rules/
      }
    }
  ]
}
