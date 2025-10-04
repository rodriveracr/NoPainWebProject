// src/app/[locale]/layout.tsx
import React, { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Image from "next/image";
import "../globals.css";
import Popup from "@/components/Popup";


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
    messages = {};
  }

  return (
    <>
     <NextIntlClientProvider locale={locale} messages={messages}>
  {/* Popup global */}
  {/*<Popup locale={locale} />*/}

  {/* Badge flotante */}
  <a
    href="https://monumby.com"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Verificado por Munumby"
    className="fixed top-20 right-4 z-50 hover:opacity-80 transition"
  >
    <Image
      src="/badgeMuNumby.png"
      alt="Verificado por Munumby"
      width={90}
      height={90}
      priority
    />
  </a>

  {children}
</NextIntlClientProvider>

    </>
  );
}
