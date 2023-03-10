/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        itim: ["Itim", "cursive"],
        prosto: ["'Prosto One'", "cursive"],
        roboto: ["Roboto", "sans-serif"],
        robotoMono: ["'Roboto Mono'", "monospace"],
        ubuntu: ["Ubuntu", "sans-serif"],
        unbounded: ["Unbounded", "cursive"],
      },

      textShadow: {
        "yellow-2": "0 0 2px  rgb(234, 179, 8)", //yellow glow
        "white-3": "0 0 3px  rgb(255, 255, 255)", //white glow
        "black-3": "0 0 3px  rgb(0, 0, 0)", //black glow
        "dark-amber-2": "0 0 2px  rgb(146, 64, 14)",
      },

      boxShadow: {
        "s1-black": "0 0 6px 1px  rgb(190, 190, 190)", //black glow
        "s2-red": "0 0 2px 1px rgb(218, 42, 42)", //red glow
        "s2-green": "0 0 2px 1px rgb(22, 163, 74)", //green glow
        "s2-dark-amber": "0 0 5px  rgb(146, 64, 14)",
      },

      animation: {
        "spin-slow": "spin 2s linear infinite",
      },

      minHeight: (theme) => ({
        ...theme("spacing"),
      }),

      maxWidth: (theme) => ({
        ...theme("spacing"),
      }),

      minWidth: (theme) => ({
        ...theme("spacing"),
      }),
    },
  },

  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
