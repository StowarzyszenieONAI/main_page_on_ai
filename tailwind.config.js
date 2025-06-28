/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          black: '#000000',
        },
        accent: {
          blue: '#3c76c4',
        },
      },
      fontFamily: {
        'anton': ['Anton', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'handwritten': ['Montserrat', 'sans-serif'], // Fallback until custom font is available
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
      },
    },
  },
  plugins: [],
};