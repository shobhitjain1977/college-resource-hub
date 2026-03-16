/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf4f3',
          100: '#fce7e4',
          200: '#f9d3cd',
          300: '#f4b4aa',
          400: '#ec8778',
          500: '#e0624f',
          600: '#cc4634',
          700: '#ab3727',
          800: '#8d3125',
          900: '#752e25',
          950: '#3f150f',
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e6fe',
          300: '#7cd4fd',
          400: '#36bffa',
          500: '#0ba5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
      },
      fontFamily: {
        serif: ['Crimson Pro', 'Georgia', 'serif'],
        sans: ['Work Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
