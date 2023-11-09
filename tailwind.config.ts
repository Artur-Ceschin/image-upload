import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)'],
      },
      colors: {
        background: '#FAFAFB',
        primary: '#2F80ED',
        gray: {
          '50': '#F6F8FB',
          '100': '#F2F2F2',
          '200': '#E0E0E0',
          '300': '#BDBDBD',
          '400': '#828282',
          '500': '#4F4F4F',
        },
        green: '#219653',
        'light-blue': '#97BEF4',
      },

      keyframes: {
        moveHorizontal: {
          '0%': {
            transform: 'translateX(0)',
          },
          '50%': {
            transform: 'translateX(75%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
      },
      animation: {
        moveHorizontal: '4s linear infinite moveHorizontal',
      },
    },
  },
  plugins: [],
}
export default config
