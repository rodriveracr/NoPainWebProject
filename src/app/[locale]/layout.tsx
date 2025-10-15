import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

// Cargar mensajes desde src/i18n
async function loadMessages(locale: string) {
  try {
    const messages = (await import(`../../i18n/${locale}.json`)).default;
    return messages;
  } catch {
    notFound();
  }
}

/**
 * ✅ LOCALE LAYOUT — Corregido para Next 15
 * - Usa await params
 * - Compatible con next-intl 4.x
 */
export default async function LocaleLayout({ children, params }: Props) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || "es";
  const messages = await loadMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
