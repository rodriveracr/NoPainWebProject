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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>; // 🔹 ahora es promesa
}) {
  const { locale } = await params; // ✅ corregido

  // ✅ Cargar mensajes
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
