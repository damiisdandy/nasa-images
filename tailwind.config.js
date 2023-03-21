/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#111",
          200: "#1a1a1a",
          300: "#222",
        },
        placeholder: {
          light: "#666",
        },
      },
    },
  },
  plugins: [],
};
