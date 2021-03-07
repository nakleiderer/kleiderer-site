const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.ejs", "./src/**/*.md"],
  theme: {
    fontFamily: {
      sans: ["Work Sans", "sans-serif"],
    },
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      gray: colors.trueGray,
      primary: colors.teal[700],
      teal: colors.teal,
      white: colors.teal[50],
      black: colors.teal[900],
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
