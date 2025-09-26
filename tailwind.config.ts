import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4fbf6',
          100: '#e6f7ea',
          200: '#c9efcf',
          300: '#a6e3ae',
          400: '#76d483',
          500: '#45c55a', // primary green
          600: '#2ea647',
          700: '#237f37',
          800: '#1e642e',
          900: '#1b5528',
        },
        accent: {
          50: '#fff9ed',
          100: '#fff3d6',
          200: '#ffe5a8',
          300: '#ffd270',
          400: '#ffbd38',
          500: '#ffa800', // warm gold
          600: '#e69000',
          700: '#bf7600',
          800: '#945c00',
          900: '#734800',
        },
      },
      boxShadow: {
        soft: '0 10px 25px rgba(0,0,0,0.08)',
        glow: '0 0 0 8px rgba(69,197,90,0.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} satisfies Config