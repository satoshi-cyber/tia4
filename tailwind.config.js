/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

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
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      dropShadow: {
        glow: '0px 0px 3px rgba(255, 255, 255, 1)',
      },
      boxShadow: {
        hover: '0px 0px 60px -4px rgb(0, 0, 0, 0.1)',
        secondary: '0px 0px 30px -4px rgba(85,60,154,0.5)',
        button: '0px 0px 30px -4px rgb(0, 0, 0, 0.2)',
        icon: '0px 0px 30px -4px rgb(0, 0, 0, 0.15)',
        player: '0px 0px 30px -4px rgb(0, 0, 0, 0.1)',
        glow: '0px 0px 20px rgba(255, 255, 255, 0.3)',
        pixel: 'inset -7px 0 1px -7px rgba(0,0,0,0.7)',
        pixelHover:
          'inset -7px 0 1px -7px rgba(0,0,0,0.1), 0 35px 60px -15px rgba(0, 0, 0, 0.1)',
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
