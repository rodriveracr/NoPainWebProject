// 📄 /src/app/[locale]/layout.tsx
import React, { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";

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
      {/* ✅ Solo renderiza el contenido de la página */}
      {children}
    </NextIntlClientProvider>
  );
}
