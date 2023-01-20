/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: ['class'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './screens/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--display-font)'],
        body: ['var(--body-font)'],
      },
      boxShadow: {
        hover: '0px 0px 60px -4px rgb(0, 0, 0, 0.15)',
        button: '0px 0px 30px -4px rgb(0, 0, 0, 0.15)',
        pixel: 'inset -7px 0 1px -7px rgba(0,0,0,0.7)',
        pixelHover:
          'inset -7px 0 1px -7px rgba(0,0,0,0.1), 0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      scale: {
        flip: '-1',
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
    require('@tailwindcss/typography'),
    require('tailwindcss-scoped-groups')({
      groups: ['one', 'two'],
    }),
    plugin(function ({ addVariant, e }) {
      addVariant('group-focus-within', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.group:focus-within .${e(
            `group-focus-within${separator}${className}`
          )}`;
        });
      });
    }),
  ],
};
