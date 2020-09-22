const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'focus-within'],
    borderWidth: ['responsive', 'last'],
  },
  plugins: [require('@tailwindcss/ui')],
};
