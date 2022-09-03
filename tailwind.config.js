/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      outline: ["focus"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-scoped-groups")({
      groups: ["one", "two"],
    }),
    plugin(function ({ addVariant, e }) {
      addVariant("group-focus-within", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.group:focus-within .${e(
            `group-focus-within${separator}${className}`
          )}`;
        });
      });
    }),
  ],
};
