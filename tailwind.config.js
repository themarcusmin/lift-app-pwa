import defaultTheme from 'tailwindcss/defaultTheme'
import formsPlugin from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryYellow: '#FFB801',
        secondaryYellow: '#FBD269',
        primaryOrange: '#FD5A00',
        customYellow: '#FBD269',
        customYellowHover: '#FFE8AF',
        customGray: '#666666'
      }
    },
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans]
    }
  },
  plugins: [formsPlugin]
}
