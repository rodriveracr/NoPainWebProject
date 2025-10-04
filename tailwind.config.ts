// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Escanea todos los archivos dentro de src
  ],
  theme: {
    extend: {
      spacing: {
        15: "150px",
        18: "72px",
        22: "88px",
      },
      fontFamily: {
        franklin: ['"Franklin Gothic Demi"', "sans-serif"], // ✅ Fuente principal registrada
      },
      fontSize: {
        base: "1.125rem", // 18px
        lg: "1.25rem",    // 20px
        xl: "1.5rem",     // 24px
        "2xl": "2rem",    // 32px
      },
      colors: {
        primary: {
          DEFAULT: "#ff004f", // 🔥 Color principal (botones, acentos)
          dark: "#cc0040",    // Variante oscura
        },
        neutral: {
          light: "#f5f5f5",
          dark: "#1a1a1a",
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideUp: "slideUp 0.5s ease-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),   // ✅ Textos largos (blogs, FAQ, popup)
    require("@tailwindcss/forms"),        // ✅ Formularios (contacto, newsletter)
    require("@tailwindcss/aspect-ratio"), // ✅ Galería, videos, carruseles
  ],
};

export default config;
