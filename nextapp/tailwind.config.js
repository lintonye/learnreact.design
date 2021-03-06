const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.tsx', './src/**/*.mdx'],
  theme: {
    // typography: (theme) => ({}),
    extend: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        cursive: ['Dancing Script', 'cursive'],
      },
      fontSize: {
        tiny: '.75rem',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
