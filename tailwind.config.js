/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "space-grotesk": ["Space Grotesk"],
        "space-mono": ["Space Mono"],
      },
      width: {
        "card-img": "300px",
      },
      height: {
        "card-img": "300px",
      },
      colors: {},
    },
  },
  plugins: [],
};
