/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "576px",
        // smdan keyin font size kichrayadi
        md: "960px",
        lg: "1440px",
        xl: "1536px",
      },
      keyframes: {
        wave: {
          "0%": { transform: "translate(360px) rotate(12deg)" },
          "50%": { transform: "translate(-360px) rotate(12deg)" },
          "100%": { transform: "translate(360px) rotate(12deg)" },
        },
      },
      animation: {
        "waving-hand": "wave 4s linear infinite",
      },
    },
  },
  plugins: [],
};
