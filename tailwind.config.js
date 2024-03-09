/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,html,ts,js}'],
  theme: {
    extend: {
      backgroundImage: {
        sitting: "url('/sitting.jpg')",
        dancing: "url('/dancing.jpg')",
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#175962',
          secondary: '#ad4a1c',
          accent: 'rgb(232,232,232)',
          neutral: '#175962',
          'base-100': '#f1e6dd',
        },
      },
    ],
  },
}
