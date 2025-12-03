/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "white-50": "#d9ecff",
        "black-50": "#1c1c21",
        "black-100": "#0e0e10",
        "black-200": "#282732",
        "blue-50": "#839cb5",
        "blue-100": "#2d2d38",
        "sw-orange": "#FF6A3D",
        "sw-orange-300": "#FFD6C2"
      },
      fontFamily: {
        sans: ["Mona Sans", "Inter", "system-ui", "sans-serif"]
      },
      maxWidth: {
        form: "720px"
      },
      boxShadow: {
        card: "0px 4px 20px rgba(0,0,0,0.1)"
      }
    },
  },
  plugins: [],
};
