/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#132F59",
          dark: "#0E2342",
          light: "#EAF0F8",
          border: "rgba(19, 47, 89, 0.2)",
        },
      },
    },
  },
  plugins: [],
};
