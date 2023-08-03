/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      fontFamily: {
        "space-grotesk": ["Space Grotesk"],
        "space-mono": ["Space Mono"],
      },
      colors: {},
    },
  },
  plugins: [],
};
