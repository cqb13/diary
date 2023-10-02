/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "470px",
        xsl: "570px",
        mds: "670px",
        mdl: "970px",
        xml: "1170px",
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
      boxShadow: {
        bar: "0px 1px 3px rgba(0, 0, 0, 0.3)"
      },
      colors: {
        primary: "#F5CB5C",
        "dark-text": "#242423",
        "light-text": "#E8EDDF",
        "dark-background": "#333533",
        "light-background": "#404240",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
