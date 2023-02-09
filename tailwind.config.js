/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
// const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/pages/**/*.{html,js, jsx}',
    './src/components/**/*.{html,js, jsx}',
    './src/**/*.{html,js, jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
