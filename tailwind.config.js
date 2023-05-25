/** @type {import('tailwindcss').Config} */
// const jostRegular = require('./src/assets/fonts/jost/static/Jost-Black.ttf')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{ 
        // sans: ['jost', 'sans-serif'],
        jost: ['jost', 'sans-serif']
      },
    },
  },
  plugins: [ 
    require('@tailwindcss/forms')
   ],
}

