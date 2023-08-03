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
      width: {
        "card-img": "300px",
        accordion: "1200px",
      },
      height: {
        "card-img": "300px",
      },
      colors: {},
    },
  },
  plugins: [],
};
