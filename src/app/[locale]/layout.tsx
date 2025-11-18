// 📄 /src/app/[locale]/layout.tsx
// 🌐 Layout principal con soporte multilenguaje y sello Monumby global

import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import FloatingActions from "@/components/FloatingActions";
import "../globals.css";

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

// 🗂️ Cargar mensajes de traducción desde /src/i18n/[locale].json
async function loadMessages(locale: string) {
  try {
    const messages = (await import(`../../i18n/${locale}.json`)).default;
    return messages;
  } catch {
    notFound();
  }
}

/**
 * ✅ LOCALE LAYOUT — versión global con sello Monumby
 * - Incluye Header y Footer en todas las páginas
 * - Muestra el sello Monumby fijo (bottom-right)
 * - Soporta responsive (mobile / desktop)
 */
export default async function LocaleLayout({ children, params }: Props) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || "es";
  const messages = await loadMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
      {/* 🔝 Encabezado global */}
      <Header locale={locale} />

      {/* 📄 Contenido de cada página */}
      <main>{children}</main>

      {/* 🔻 Footer global */}
      <Footer locale={locale} />

      {/* 🧷 Sello Monumby global (fijo en todas las páginas) */}
      <Link
        href="https://monumby.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[9999]"
        aria-label="Sello de calidad Monumby"
      >
        <Image
          src="/sailedited.png"
          alt="Sello Monumby"
          width={110}
          height={110}
          className="global-sello"
          priority
        />
      </Link>

      {/* Floating helper buttons (WhatsApp / Contact / Email) - rendered inside NextIntlClientProvider */}
      <FloatingActions />
    </NextIntlClientProvider>
  );
}
