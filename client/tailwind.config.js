/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
    './src/**/*.{js, jsx, ts, tsx}'
 ],
 theme: {
  extend: {
    keyframes: {

      scaleUp: {
        '0%': { transform: 'scale(1)'},
        '100%': { transform: 'scale(1.1)'},
      },


    },

    animation: {
      'scale-up':'scaleUp 200ms ease-out forwards'
    },
  },
},
  plugins: [],
}

