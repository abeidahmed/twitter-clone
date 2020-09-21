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
      maxWidth: {
        '8xl': '90rem',
        ...defaultTheme.maxWidth,
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')],
};
