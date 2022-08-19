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
        'secondary': '#F9D923',
        'secondary-shade': '#e0c320',
        'background': '#187498',
        'accent': '#36AE7C',
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
