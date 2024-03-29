import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'text-reveal':
          'text-reveal 5s cubic-bezier(0.77, 0, 0.175, 1) infinite',
        'animate-blink': 'blink 3s infinite',
        'color-change': ' color-change 1s infinite alternate',
      },
      keyframes: {
        'text-reveal': {
          '0%': {
            transform: 'translate(0, 100%)',
          },
          '50%': {
            transform: 'translate(0, 0)',
          },
          '100%': {
            transform: 'translate(0, 100%)',
          },
        },
        blink: {
          '0%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'color-change': {
          '0%': {
            backgroundColor: '#FBEC50',
          },
          '100%': {
            backgroundColor: '#DAA520',
          },
        },
      },
    },
    backgroundColor: {
      white: '#ffffff', // You can also use 'white' if you want to refer to it by name
    },
    screens: {
      xl: { max: '1200px' },
      lg: { max: '991px' },
      md: { max: '767px' },
      sm: { max: '500px' },
      odd: { max: '403px', min: '376px' },
      xsm: { max: '375px' },
    },
  },
  plugins: [],
};
export default config;
