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
      }, 
      scroll: {
        '0%': { transform: 'translateX(0%)'},
        '100%': { transform: 'translateX(-150%)'},
      },
      glideUp: {
        '0%': { transform: 'translateY(100%)', opacity: 0 },
        '100%': { transform: 'translateY(0%)', opacity: 1 },
      },
      marquee: {
        '0%': { transform: 'translateX(0%)'},
        '100%': { transform: 'translateX(-300%)'},
      },
      marqueeLg: {
        '0%': { transform: 'translateX(0%)'},
        '100%': { transform: 'translateX(-200%)'},
      }, 

      glideIn:{
        '0%': { transform: 'translateX(200%)'},
        '100%': { transform: 'translateX(0%)'},
      },
    },

    animation: {
      'scale-up':'scaleUp 200ms ease-out forwards',
      'scale-large':'scaleLarge 200ms ease-out forwards',
      'fade-in':'fadeIn 500ms ease-out',
      'fade-in-slow':'fadeIn 2s ease-out',
      'scroll-right':'scroll 5s linear infinite',
      'glide-up':'glideUp 800ms ease-out ',
      'glide-up-delayed':'glideUp 800ms ease-out forwards',
      'marquee': 'marquee 20s linear infinite',
      'marquee-lg': 'marqueeLg 25s linear infinite',
      'glide-in':'glideIn 200ms ease-out forwards'
  },
},
  plugins: [],
}

}