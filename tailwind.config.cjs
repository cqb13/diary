/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "470px",
        xsl: "570px",
        mds: "670px",
        mdl: "970px",
        xml: "1170px"
      },
      fontFamily: {
        serif: ["Instrument", "serif"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
        "8xl": "6rem",
        "9xl": "8rem",
        "10xl": "10rem",
        "11xl": "12rem",
        "12xl": "14rem",
        "13xl": "16rem",
        "14xl": "18rem",
        "15xl": "20rem",
      },
      colors: {
        primary: "#F5CB5C",
        "dark-text": "#242423",
        "light-text": "#E8EDDF",
        background: "#333533",
        "light-background": "#404240",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("prettier-plugin-tailwindcss"),
    require("tailwindcss-image-rendering")(),
  ],
};
