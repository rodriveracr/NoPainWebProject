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
        {/* 🌐 Preconexiones para mejorar tiempo de carga */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* ⚡ Preload de la imagen principal (LCP) */}
        <link
          rel="preload"
          as="image"
          href="/No-PAIN.webp"
          fetchPriority="high"
        />

        {/* 🎨 Favicon y SEO base */}
        
        {/* 🎨 Favicon y color de tema multiplataforma */}
<meta name="theme-color" content="#000000" />
<meta name="msapplication-TileColor" content="#000000" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

          property="og:description"
          content="Los mejores productos premium para tatuajes y PMU. Línea profesional No Pain Brand."
        
        <meta property="og:image" content="/No-PAIN.webp" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* 🔹 Script analítica privada (solo si NO estás en local) */}
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
