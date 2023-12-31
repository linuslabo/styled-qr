/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        one: '#164773',
        two: '#0B2B40',
        three: '#1E5959',
        four: '#3B8C6E',
        five: '#89D99D',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

