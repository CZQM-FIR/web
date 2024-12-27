import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {}
  },

  plugins: [typography, forms, daisyui],

  daisyui: {
    themes: [
      {
        czqmTheme: {
          primary: '#226dad',
          secondary: '#DDA01D',
          accent: '#008072',
          neutral: '#2a323c',
          'base-100': '#1d232a',
          info: '#08d0ff',
          success: '#22c55e',
          warning: '#fbbf24',
          error: '#ef5465'
        }
      }
    ]
  }
} satisfies Config;
