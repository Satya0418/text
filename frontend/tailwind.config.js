/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F6F3ED',
        primary: '#313851',
        secondary: '#C2CBD3',
        accent: '#6366F1',
      },
      fontFamily: {
        sans: ['Switzer', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
