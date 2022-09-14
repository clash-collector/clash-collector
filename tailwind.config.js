/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ddb74f",
          secondary: "#f94a62",
          accent: "#40c994",
          neutral: "#211924",
          "base-100": "#FFFFFF",
          info: "#4A73C4",
          success: "#78E8A8",
          warning: "#F2951C",
          error: "#E86991",
        },
      },
    ],
  },
};
