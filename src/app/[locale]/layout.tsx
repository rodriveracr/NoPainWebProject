// src/app/[locale]/layout.tsx
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";

export const metadata = {
  title: {
    default: "No Pain Brand",
    template: "%s - No Pain Brand",
  },
  description:
    "Descubre los mejores productos para tatuajes y PMU con No Pain Brand.",
};

/**
 * Layout para la ruta dinámica [locale].
 * IMPORTANT: `params` viene como Promise<{ locale: string }> en App Router,
 * por eso lo tipamos así y hacemos `await params`.
 *
 * Nota: no renderiza <html> ni <body> (eso lo hace src/app/layout.tsx).
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>; // <- aquí: Promise
}) {
  const { locale } = await params; // await para resolver la Promise
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
