/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      maxWidth: {
        'sm': '350px',
      },
      center: true,
      padding: {
        'DEFAULT': '1rem',
        'sm': '2rem',
        'lg': '4rem',
        'xl': '5rem',
        '2xl': '6rem',
      },
    },
    screens: {
      'sm': '300px',
      'md': '800px',
      'lg': '1040px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        'dominant': '#FFF',
              'complement': '#F4F7FE',
              'ascent': '#4318FF',
              'ascent-dark': '#2B3674',
      },
    },
  },
  plugins: [],

}
