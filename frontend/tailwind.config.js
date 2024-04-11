/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'], // Specify the files to purge
  theme: {
    extend: {      fontFamily: {
      cursive: ['cursive'],
    },},
  },
  plugins: [],
};
