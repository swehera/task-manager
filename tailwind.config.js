/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgRedColor: "#FA4343",
        bgBlue: "#2D62AE",
        yellowColor: "#F39B1F",
        lightYellow: "#FFCC84",
        lightBlue: "#98C2FF",
        bgGreen: "#00D308",
        lightGreen: "#84FF9F",
        grayColor: "#D7D7D7",
        grayTextColor: "#313131",
        mediumColor: "#98C2FF",
        highColor: "#FFCC84",
        lowColor: "#84FF9F",
      },
      flex: {
        full: "0 0 100%",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
