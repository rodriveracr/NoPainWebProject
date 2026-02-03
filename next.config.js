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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet, noimageindex",
          },
        ],
      },
    ];
  },

  // Allow dev origins (fixes Cross origin request detected warning during dev)
  // Add any local IPs or hostnames you use to access the dev server (e.g. LAN IP)
  // In production this has no effect; it's only for the dev server security check.
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.1.33:3000",
  ],

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
