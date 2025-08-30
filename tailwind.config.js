/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./html/**/*.html",
    "./JS/**/*.js"

  ],
  theme: {
    extend: {
      backgroundImage: {
        'app-gradient': "linear-gradient(135deg, #2563eb, #0ea5e9, #14b8a6)"
      },
      animation: {
        'gradient-flow': 'gradient-flow 12s ease infinite',
      },
      keyframes: {
        'gradient-flow': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        }
      }
    }
  },
  plugins: [],
}
