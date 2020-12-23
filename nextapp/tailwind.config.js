const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.tsx'],
  theme: {
    typography: (theme) => ({}),
    extend: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        cursive: ['Dancing Script', 'cursive'],
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
}
