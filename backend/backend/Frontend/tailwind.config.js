/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#07182B', // Deep Navy Primary
          800: '#0B223D',
        },
        brandBlue: '#1677FF', // Primary Action Blue
        brandCyan: '#12CFE8', // Accent Cyan
        bgLight: '#F5F8FC',   // Light Dashboard Background
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}