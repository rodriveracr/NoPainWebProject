// src/app/[locale]/monumby/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react"; // 👈 IMPORTANTE
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";

export default async function MonumbyPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  // ✅ Traducciones
  const t = await getTranslations({ locale, namespace: "Monumby" });

  return (
    <div className="relative min-h-screen bg-black text-white font-franklin">
      {/* ✅ Header en Suspense */}
      <Suspense fallback={<div>Loading header...</div>}>
        <Header locale={locale} />
      </Suspense>
      <div className="h-16" />

      {/* HERO */}
      <section className="h-[90vh] flex flex-col items-center justify-center text-center px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-pink-900/20 to-black" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Image
            src="/junto.png"
            alt="Monumby Logo"
            width={500}
            height={500}
            className="mx-auto mt-6 mb-6 drop-shadow-lg"
            priority
          />
          <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4">
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6">{t("subtitle")}</p>
          <p className="max-w-2xl mx-auto text-gray-300 mb-8">{t("ctaText")}</p>

          {/* Botón con sello */}
          <div className="relative inline-block mt-4">
            <Link
              href="https://monumby.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl font-semibold text-lg hover:opacity-90 transition inline-block"
            >
              {t("ctaHero")}
            </Link>
            <Image
              src="/sailedited.png"
              alt="Sello de calidad Monumby"
              width={120}
              height={120}
              className="absolute -top-4 -right-8 drop-shadow-lg rotate-6"
            />
          </div>
        </div>
      </section>

      {/* ✅ Footer en Suspense */}
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer locale={locale} />
      </Suspense>
    </div>
  );
}
