const colors = require("tailwindcss/colors");

const textColorEls = ["blockquote", "h1", "h2", "h3", "h4", "h5", "h6"];
const textColors = (theme) =>
  textColorEls.reduce((p, el) => {
    p[el] = { color: theme("colors.black") };
    return p;
  }, {});

module.exports = {
  purge: ["./src/**/*.ejs", "./src/**/*.md"],
  theme: {
    fontFamily: {
      sans: ["Work Sans", "sans-serif"],
    },
    extend: {
      colors: {
        gray: colors.trueGray,
        primary: colors.teal[700],
        teal: colors.teal,
        cyan: colors.cyan,
        white: colors.teal[50],
        black: colors.teal[900],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.black"),
            ...textColors(theme),
          },
        },
      }),
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
