/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF5A1F',
          dark: '#E9470C',
        },
        background: {
          light: '#F7F8FA',
          surface: '#15181D',
          black: '#0B0D10',
        },
        status: {
          success: '#16A34A',
          danger: '#DC2626',
          warning: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
