/* eslint-disable @typescript-eslint/no-var-requires, unicorn/prefer-module */
const defaultTheme = require('tailwindcss/defaultTheme')

// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
