/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryFont: "var(--primary-font-color)",
        secondaryFont: "var(--secondary-font-color)",
      },

    },
  },
  plugins: [],
}