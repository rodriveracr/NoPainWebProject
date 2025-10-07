// src/next.config.js
const createNextIntlPlugin = require("next-intl/plugin");

const isDev = process.env.NODE_ENV !== "production";

const nextConfig = {
  experimental: {
    serverActions: {},
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // 🔒 Seguridad base
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

          // 🧱 Política de permisos mínima
          {
            key: "Permissions-Policy",
            value: "geolocation=(), camera=(), microphone=(), interest-cohort=()",
          },

          // 🧠 Content Security Policy con detección de entorno
          {
            key: "Content-Security-Policy",
            value: [
              // Permite recursos locales en dev, bloquea en prod
              `default-src 'self'${isDev ? " http://localhost:3001 http://192.168.56.1:3001" : ""};`,

              // Imágenes, fuentes y estilos
              "img-src 'self' data: blob: https://res.cloudinary.com;",
              "font-src 'self' https://fonts.gstatic.com;",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",

              // ✅ Scripts — permite Umami Cloud
              "script-src 'self' 'unsafe-inline' https://cloud.umami.is;",

              // ✅ Conexiones API — incluye Brevo, Cloudinary y Umami
              "connect-src 'self' https://api.brevo.com https://res.cloudinary.com https://cloud.umami.is https://api-gateway.umami.dev;",

              // Multimedia y embeds externos
              "media-src 'self' https://res.cloudinary.com;",
              "frame-src 'self' https://www.youtube.com https://player.vimeo.com;",

              // Restricciones adicionales
              "object-src 'none';",
              "base-uri 'self';",
              "form-action 'self';",
              "upgrade-insecure-requests;",
            ].join(" "),
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
module.exports = withNextIntl(nextConfig);
