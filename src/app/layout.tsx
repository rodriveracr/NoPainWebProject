// 📄 /src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "No Pain Brand",
  description:
    "Descubre los mejores productos para tatuajes y PMU con No Pain Brand.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const isLocal =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname.startsWith("192.168."));

  return (
    <html lang="es">
      <head>
        {/* 🌐 Conexiones anticipadas (solo las esenciales) */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* 🎨 Favicon y tema */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* 🧠 SEO y Open Graph */}
        <meta property="og:title" content="No Pain Brand" />
        <meta
          property="og:description"
          content="Los mejores productos premium para tatuajes y PMU. Línea profesional No Pain Brand."
        />
        <meta property="og:image" content="/No-PAIN.webp" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* 📈 Umami Analytics (solo en producción) */}
        {!isLocal && process.env.NEXT_PUBLIC_UMAMI_ID && (
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
          />
        )}
      </head>

      <body>{children}</body>
    </html>
  );
}
