/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#1E40AF', // Dark Blue
        'brand-secondary': '#3B82F6', // Bright Blue
        'brand-light': '#EFF6FF', // Light Blue BG
        'brand-dark': '#111827', // Dark Gray/Blue Text
        'brand-accent': '#3B82F6', // Accent Blue
      },
    },
  },
  plugins: [],
}