// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        15: "150px",  // Ahora puedes usar h-15 para 60px
        18: "72px",
        22: "88px",
      },
    },
  },
  plugins: [],
}
export default config
