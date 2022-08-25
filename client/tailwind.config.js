/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#EB5353',
        'primary-shade': '#d44b4b',
        'secondary': '#5bccf6',
        'secondary-shade': '#52b8dd',
        'background': '#FFFDF4',
        'accent': '#36AE7C',
        'dark': '#030e12'
      },
      fontFamily: {
        'righteous': ['Righteous', 'cursive'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'main-background': "url('../src/images/bg.svg')",
      }
    },
  },
  plugins: [],
}
