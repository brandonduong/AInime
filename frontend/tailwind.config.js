/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        "dark-pink-900": "#2e2829",
        "dark-pink-950": "#191314",
        "dark-pink-600": "#500724",
        "dark-pink-500": "#642638",
        "dark-pink-400": "#783f4e",
        "dark-pink-300": "#8b5965",
        "dark-mode": "#443f40",
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
