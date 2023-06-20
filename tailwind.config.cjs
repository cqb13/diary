/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "serif": ["Instrument", "serif"],
      },
      colors: {
        "primary": "#F5CB5C",
        "dark-text": "#242423",
        "light-text": "#E8EDDF",
        "background": "#333533",
        "light-background": "#404240"
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("prettier-plugin-tailwindcss"),
    require('tailwindcss-image-rendering')(),
  ],
};
