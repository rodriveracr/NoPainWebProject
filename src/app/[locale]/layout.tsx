// 📄 /src/app/[locale]/layout.tsx
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css"; // ✅ Importa los estilos globales del proyecto

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;

  // ✅ Cargar los mensajes de traducción para el idioma actual
  let messages: Record<string, any> = {};
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    console.warn(`[i18n] No se encontraron mensajes para el locale "${locale}".`, error);
  }

  return (
    <html lang={locale}>
      <body>
        {/* 🌍 Proveedor de traducciones (Next Intl) */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
