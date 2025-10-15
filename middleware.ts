// =====================================================
// 🌍 src/middleware.ts — Detección automática de idioma
// =====================================================
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: true,
});

export const config = {
  matcher: ["/", "/(en|es)/:path*"],
};
