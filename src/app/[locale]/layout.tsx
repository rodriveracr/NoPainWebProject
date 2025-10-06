// src/app/[locale]/layout.tsx
import React, { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Image from "next/image";
import "../globals.css";
// ⛔ No montamos el popup aquí

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  let messages: Record<string, any> = {};
  try {
    messages = await getMessages({ locale });
  } catch (err) {
    console.warn(`[i18n] No messages for locale="${locale}", using {}.`, err);
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* Badge flotante */}
      <a
        href="https://monumby.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Verificado por Monumby"
        className="fixed top-20 right-4 z-50 hover:scale-105 hover:opacity-90 transition-all duration-200"
      >
        <Image
          src="/badgeMuNumby.png"
          alt="Verificado por Monumby"
          width={90}
          height={90}
          priority
          className="drop-shadow-lg"
        />
      </a>

      {children}
    </NextIntlClientProvider>
  );
}
