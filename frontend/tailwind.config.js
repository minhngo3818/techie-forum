/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screen: {
      sm: "375px",
      md: "640px",
    },
    extend: {
      colors: {
        smoke: "#CCCCCC",
        gray: "#808080",
        "light-gray": "#d9d9d9",
      },
      keyframes: {
        "flip-x": {
          "0%": { transform: "scaleX(1)" },
          "50%": { transform: "scaleX(-1)" },
          "100%": { transform: "scaleX(1)" },
        },
        "zoom-in-out": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.96)" },
        },
      },
      animation: {
        "flip-x": "flip-x 0.4s ease",
        "flip-x-infinite": "flip-x 1.5s ease-in-out infinite",
        "lock-on": "zoom-in-out 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
