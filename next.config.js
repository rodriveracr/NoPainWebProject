// 📄 next.config.js
// 🌍 Configuración Next.js + next-intl + soporte moderno de imágenes (Next.js 15+)

import createNextIntlPlugin from "next-intl/plugin";

// 🔤 Plugin de internacionalización (traducciones)
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {},
  },
  reactStrictMode: true,

  // 🖼️ Nueva forma recomendada de definir fuentes externas de imágenes
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // 🌐 mismo dominio que usabas en 'domains'
      },
    ],
  },
};

// ✅ Export final con next-intl integrado
export default withNextIntl(nextConfig);
