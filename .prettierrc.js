const { definePrettierConfig } = require('@ttou/define-config')

module.exports = definePrettierConfig({
  semi: false,
  singleQuote: true,
  endOfLine: 'auto',
  trailingComma: 'none',
  arrowParens: 'avoid'
})
