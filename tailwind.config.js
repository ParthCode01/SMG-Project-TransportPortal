/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 🌙 REQUIRED for toggle-based dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // scan all React files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5", // indigo-600 (used in dashboard)
      },
    },
  },
  plugins: [],
};
