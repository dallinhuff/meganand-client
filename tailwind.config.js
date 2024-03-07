/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,html,ts,js}'],
  theme: {
    extend: {
      backgroundImage: {
        'groundrats': "url('/public/groundrats.jpg')",
        'sitting': "url('/public/sitting.jpg')",
        'dancing': "url('/public/dancingred.jpg')"
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [{
      mytheme: {
        "primary": "#17625b",
        "secondary": "#67adb9",
        "accent": "#f16f43",
        "neutral": "#d1d6e8",
        "base-100": "#f1e6dd",
      },
    }],
  },
}
