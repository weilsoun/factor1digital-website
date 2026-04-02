/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        exo: ['"Exo 2"', 'sans-serif'],
        sans: ['"Open Sans"', 'sans-serif'],
      },
      colors: {
        f1: {
          cyan: '#06b6d4',
          purple: '#8b5cf6',
          dark: '#050508',
          card: '#0d0d14',
          border: '#1e1e2e',
        },
      },
      backgroundImage: {
        'f1-gradient': 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
      },
    },
  },
  plugins: [],
}
