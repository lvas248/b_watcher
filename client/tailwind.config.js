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
      scaleLarge: {
        '0%': { transform: 'scale(1)'},
        '100%': { transform: 'scale(1.7)'},
      },
      fadeIn: {
        '0%': { opacity: 0 },
        '100%': { opacity: 1},
      }

    },

    animation: {
      'scale-up':'scaleUp 200ms ease-out forwards',
      'scale-large':'scaleLarge 200ms ease-out forwards',
      'fade-in':'fadeIn 500ms ease-out forwards'
    },
  },
},
  plugins: [],
}

