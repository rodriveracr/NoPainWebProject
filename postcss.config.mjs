// 📦 src/postcss.config.mjs
// 🧾 Configuración de PostCSS (Tailwind + Autoprefixer)
// ⚙️ Se asigna a una variable antes de exportar, para cumplir con ESLint

const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};

export default config;
