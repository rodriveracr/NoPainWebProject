// 📄 /src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    noimageindex: true,
    googleBot: {
      index: false,
      follow: false,
      nocache: true,
      noarchive: true,
      noimageindex: true,
      "max-snippet": -1,
      "max-image-preview": "none",
      "max-video-preview": -1,
    },
  },
};

/**
 * ✅ ROOT LAYOUT
 * - No recibe params (solo layouts dinámicos los usan)
 * - Define la base HTML para todo el sitio
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-black text-white font-sans">
        {children}
      </body>
    </html>
  );
}

