/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
