// 📄 /src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";

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

