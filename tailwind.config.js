/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,html,ts,js}'],
  theme: {
    extend: {
      backgroundImage: {
        window: "url('/window.jpg')",
        dancing: "url('/dancing.jpg')",
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#2a454d',
          secondary: '#0e5953',
          accent: '#E8E8E8FF',
          neutral: '#175962',
          'base-100': '#f1e6dd',
        },
      },
    ],
  },
}
