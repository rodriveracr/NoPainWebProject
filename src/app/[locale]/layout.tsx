import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Image from "next/image";
import "../globals.css";

export const metadata = {
  title: {
    default: "No Pain Brand",
    template: "%s - No Pain Brand",
  },
  description:
    "Descubre los mejores productos para tatuajes y PMU con No Pain Brand.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* Badge flotante arriba a la derecha */}
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
  />
</a>


      {/* Contenido de cada página */}
      {children}
    </NextIntlClientProvider>
  );
}
