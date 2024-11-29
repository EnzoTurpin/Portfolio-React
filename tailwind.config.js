/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Assurez-vous que Tailwind analyse vos fichiers React
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Helvetica Neue"', "Arial", "sans-serif"],
      },
      colors: {
        // Étendre les couleurs par défaut avec vos couleurs personnalisées
        dark: "#333333", // Utiliser une seule déclaration pour dark
        light: "#fff",
        grayLight: "#f3f3f3", // Utiliser une seule déclaration pour grayLight
        grayLighter: "#b0b0b0",
        gray: "#ddd",
        grayDark: "#666",
        backgroundLight: "#f8f8f8",
        backgroundGray: "#f4f4f4",
        shadow: "rgba(0, 0, 0, 0.1)",
        shadowDark: "rgba(0, 0, 0, 0.3)",
        primary: "#555",
      },
    },
  },
  plugins: [],
};
