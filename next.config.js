const createNextIntlPlugin = require('next-intl/plugin');

const nextConfig = {
  experimental: {
    serverActions: {},
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(),camera=()" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "img-src 'self' data: https://res.cloudinary.com",
              "font-src 'self' https://fonts.gstatic.com",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "media-src 'self' https://res.cloudinary.com", // 👈 permite videos locales y en Cloudinary
              "frame-src 'self' https://www.youtube.com https://player.vimeo.com" // 👈 si usas YouTube/Vimeo
            ].join("; ")
          }
        ]
      }
    ];
  }
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
module.exports = withNextIntl(nextConfig);
