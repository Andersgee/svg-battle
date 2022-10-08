/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "sm": "528px", //1:
      "md": "784px", //2: 240*2 + 16*3
      "lg": "1040px", //3: 240*3 + 16*4
      "xl": "1280px",
      "2xl": "1536px",
    },
    extend: {
      keyframes: {
        strokedraw: {
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        strokedraw: "strokedraw 2.5s cubic-bezier(0.33, 0.4, 0.96, 0.6) forwards",
      },
    },
  },
  plugins: [],
};
