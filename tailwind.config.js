/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: 'var(--font-ubuntu)',
        inter: 'var(--font-inter)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      dropShadow: {
        card: '4px 4px 20px rgba(0, 0, 0, 0.30)',
      },
      colors: {
        greyscale: {
          500: '#929292',
          800: '#242424',
          white: '#FFF',
          'white-50': 'rgba(255, 255, 255, 0.50)',
          'bg-light': '#1B1B1B',
          'bg-darker': '#080808',
          'bg-dark': '#181818',
        },
        primary: {
          main: '#00A3FF',
        },
      },
    },
  },
  plugins: [],
};
