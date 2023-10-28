/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      height: {
        11: "100px",
        101: "41rem",
        97: "35rem",
      },

      width: {
        "6.5xl": "79rem",
        "6/13": "55%",
        97: "25rem",
        1.5: "2.3125rem",
        1.4: "2rem",
      },
      maxWidth: {
        "1/2": "50%",
        "9/11": "88%",
      },
      backgroundImage: {
        mainColor: "linear-gradient(70deg,#44c5e5,#276dc1)",
      },
      colors: {
        mainColor: "#3699d3",
        textMainColor: "#ffffff",
        textCustom: "#ffffff99",
        textCustomBgWhite: "#727171",
        mainL1: "#1f4160",
        header: "#44c5e5",
        textWhiteMain: "rgb(255 255 255 / 0.7)",
      },
      backgroundColor: {
        mainBackGroundColor: "#1c2635",
        bgHeaderMobile: "rgb(249 248 248 / 80%)",
        bgLogin:
          "linear-gradient( to right, hsla(141, 54%, 86%, 1) 0%,hsla(333, 73%, 85%, 1) 50%,hsla(211, 58%, 79%, 1) 100%)",
      },

      margin: {
        bottom: "105px",
        mbGettingStarted: "29px",
      },
      keyframes: {
        customBounce: {
          "0%, 100%": {
            transform: "translateX(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        customBounce: "customBounce 1.5s infinite",
      },
      fontSize: {
        textSizeHostingTitle: "32px",
      },
      screens: {
        "2xl": { max: "1535px" },
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        md: { max: "767px" },
        md1: { min: "768px" },
        sm: { max: "639px" },
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".container": {
          maxWidth: theme("columns.7xl"),
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: theme("spacing.4"),
          paddingRight: theme("spacing.4"),
        },
      });
    }),
    require("@tailwindcss/line-clamp"),
  ],
};
