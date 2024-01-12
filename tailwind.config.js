/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      zIndex: {
        '9999': 9999, // Puedes ajustar el valor según tus necesidades
      },
      animation: {
        aparecer: 'aparecer 0.2s ease-in-out forwards',
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
        'infinite-scrollLento': 'infinite-scroll 30s linear infinite',
        

      },
      keyframes: {
        aparecer: {
          '0%': { opacity: '0.2' },
          '20%': { opacity: '0.4' },
          '50%': { opacity: '0.5' },
          '70%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        },
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
      }
      },
      margin: {
        'cart-top': '6.5rem',
      },

      height: {
        '16': '4rem',
        '20': '7rem',
        card: '8rem',
      },
      width: {
        '16': '4rem',
        '20': '5rem',
        card: '16rem',  
      },
      colors: {
        letraNavBarHover: 'rgb(215, 186, 127)',
        letraNavBar: 'rgb(233,179,80)',
      },
    },
  },
  plugins: [],
}

