/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        I: "rgb(80, 227, 230)",
        J: "rgb(36, 95, 223)",
        L: "rgb(223, 173, 36)",
        O: "rgb(223, 217, 36)",
        S: "rgb(48, 211, 56)",
        T: "rgb(132, 61, 198)",
        Z: "rgb(227, 78, 78)",
      },
      fontFamily: {
        mono: ["Pixel", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  safelist: [
    {
      pattern: /(bg|(border-(t|r|b|l)))-(I|J|L|O|S|T|Z)|w-(4|6)/,
    },
  ],
  plugins: [],
};
