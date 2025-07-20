/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // manual dark mode toggling
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-sans)',
      },
    },
  },
  plugins: [],
};
