import content from './tailwind-config/content';
import animations from './tailwind-config/theme/animations';
import borderRadius from './tailwind-config/theme/border-radius';
import colors from './tailwind-config/theme/colors';
import fonts from './tailwind-config/theme/fonts';
import keyframes from './tailwind-config/theme/keyframes';

/** @type {import('tailwindcss').Config} */

export default {
  content,
  theme: {
    extend: {
      fontFamily: fonts,
      colors: colors,
      borderRadius: borderRadius,
      keyframes: keyframes,
      animation: animations,
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
