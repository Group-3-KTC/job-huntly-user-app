/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // if you use new app folder of Next.js 13+
  ],
  theme: {
    extend: {
      // customize theme here if want
    },
  },
  plugins: [
    // example: require('@tailwindcss/forms')
  ],
};
