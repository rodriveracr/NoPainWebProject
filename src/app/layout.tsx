// src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "No Pain Brand",
  description: "Descubre los mejores productos para tatuajes y PMU con No Pain Brand.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // ✅ Detecta si estás en entorno local o red interna
  const isLocal =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname.startsWith("192.168."));

  return (
    <html lang="es">
      <head>
        {/* 🔹 Script de analítica privada (Umami Cloud) — solo si NO estás en local */}
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
