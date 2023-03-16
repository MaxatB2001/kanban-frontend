/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      '-2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      '-xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      '-lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      '-md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      '-sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      colors: {
        'my-gray': '#f9f8f8',
        'text-dark': '#1e1f21'
      }
    }
  },
  plugins: [],
}