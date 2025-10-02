// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        15: "150px",
        18: "72px",
        22: "88px",
      },
      fontFamily: {
        franklin: ['"Franklin Gothic Demi"', "sans-serif"], // 🔹 Fuente registrada
      },
      fontSize: {
        base: "1.125rem", // 18px
        lg: "1.25rem",    // 20px
        xl: "1.5rem",     // 24px
        "2xl": "2rem",    // 32px
      },
    },
  },
  plugins: [],
};

export default config;
