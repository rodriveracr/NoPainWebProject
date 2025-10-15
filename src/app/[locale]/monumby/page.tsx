// 📄 /src/app/[locale]/monumby/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";

export default async function MonumbyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Monumby" });

  return (
    <>
      {/* ✅ Header en Suspense */}
      <Suspense fallback={<div className="text-center py-8 text-gray-400">Loading header...</div>}>
        <Header locale={locale} />
      </Suspense>

      {/* 🔲 Fondo coherente con el resto del sitio */}
      <main className="relative text-white font-franklin overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-monumby bg-cover bg-center" aria-hidden="true" />
        <div className="absolute inset-0 bg-black/85" aria-hidden="true" />

        {/* 🔹 Contenido principal */}
        <section className="relative z-10 pt-40 pb-[20vh] px-6 max-w-5xl mx-auto text-center">
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Logo principal */}
            <Image
              src="/junto.png"
              alt="Monumby Logo"
              width={450}
              height={450}
              className="mx-auto drop-shadow-2xl mb-6"
              priority
            />

            {/* Texto principal */}
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-4">
              {t("subtitle")}
            </p>
            <p className="max-w-2xl mx-auto text-gray-300 mb-8">
              {t("ctaText")}
            </p>

            {/* Botón con sello */}
            <div className="relative inline-block mt-4">
              <Link
                href="https://monumby.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl font-semibold text-lg hover:opacity-90 transition inline-block shadow-lg"
              >
                {t("ctaHero")}
              </Link>

              {/* Sello animado */}
              <Image
                src="/sailedited.png"
                alt="Sello de calidad Monumby"
                width={120}
                height={120}
                className="absolute -top-6 -right-10 drop-shadow-xl rotate-6 animate-bounce-slow"
              />
            </div>
          </div>
        </section>
      </main>

      {/* ✅ Footer */}
      <Suspense fallback={<div className="text-center py-8 text-gray-400">Loading footer...</div>}>
        <Footer locale={locale} />
      </Suspense>
    </>
  );
}
export const revalidate = 604800; // 🕒 7 días