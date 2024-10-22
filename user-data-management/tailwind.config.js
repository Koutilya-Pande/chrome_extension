/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0f172a",
          foreground: "#ffffff", // Assuming white text on primary background
        },
        secondary: {
          DEFAULT: "#f8fafc", // Light background color from your Login.css
          foreground: "#000000", // Assuming black text on secondary background
        },
        accent: {
          DEFAULT: "#2563eb", // Blue color from your Login.css
        },
        muted: {
          DEFAULT: "#94a3b8", // Muted text color from your Login.css
        },
      },
    },
  },
  plugins: [],
}

