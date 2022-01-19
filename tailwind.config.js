/* eslint-disable @typescript-eslint/no-var-requires, unicorn/prefer-module */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  mode: 'jit',
  purge: ['./public/index.html', './src/**/*.{vue,js,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      // use TailwindCSS v3 colors: https://github.com/tailwindlabs/tailwindcss/pull/5384
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      slate: colors.blueGray,
      gray: colors.coolGray,
      zinc: colors.gray,
      neutral: colors.trueGray,
      stone: colors.warmGray,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      emerald: colors.emerald,
      green: colors.green,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
