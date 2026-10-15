/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF8F2',
        'green-900': '#103F2D',
        'green-600': '#487A49',
        pink: '#F58DB8',
        'green-300': '#A8D66D',
        ink: '#18251F',
        'border-soft': '#D8DFD5',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16, 63, 45, 0.04), 0 8px 24px rgba(16, 63, 45, 0.06)',
        'soft-lg': '0 2px 4px rgba(16, 63, 45, 0.06), 0 16px 40px rgba(16, 63, 45, 0.10)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
