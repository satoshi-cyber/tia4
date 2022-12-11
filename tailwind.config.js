/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './screens/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        pixel: 'inset 0px 0px 0px 1px rgba(0, 0, 0, 0.1)',
        pixelHover:
          'inset 0px 2px 0px 1px rgba(0, 0, 0, 0.01), 0 35px 60px -15px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  variants: {
    extend: {
      outline: ['focus'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-scoped-groups')({
      groups: ['one', 'two'],
    }),
    plugin(function ({ addVariant, e }) {
      addVariant('group-focus-within', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.group:focus-within .${e(
            `group-focus-within${separator}${className}`
          )}`
        })
      })
    }),
  ],
}
