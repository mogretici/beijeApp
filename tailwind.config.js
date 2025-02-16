/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['app/**/*.{tsx,jsx,ts,js}', 'components/**/*.{tsx,jsx,ts,js}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        bleeding: '#F67554',
        bleedingArea: '#FBD7CE',
        ovulation: '#097B77',
        fertility: '#E4F2F2',
        fertilityArea: '#BDE1E0',
        defaultBg: '#F3F3F3',
      },
    },
  },
  plugins: [],
}