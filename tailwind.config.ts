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
        sans: ['var(--font-inter)'],
        mono: ['var(--font-rajdhani)'],
      },

      colors: {
        'primary': '#A362EA',
        'dark-gray': '#222429',
        'light-black': '#3A3A3A',
        'white': '#FFFFFF',
      }
    },
  },
  plugins: [],
}
export default config
