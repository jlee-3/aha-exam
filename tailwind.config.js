/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
          'bg-light': '#1B1B1B',
          'bg-darker': '#080808',
        },
      },
    },
  },
  plugins: [],
};
