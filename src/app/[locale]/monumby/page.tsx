// 📄 /src/app/[locale]/monumby/page.tsx
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function MonumbyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Monumby" });

  return (
    <main className="relative text-white font-franklin overflow-hidden min-h-screen">
      {/* 🔲 Fondo coherente con el resto del sitio */}
      <div
        className="absolute inset-0 bg-monumby bg-cover bg-center"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/85" aria-hidden="true" />

      {/* 🔹 Contenido principal */}
      <section className="relative z-10 pt-40 pb-[20vh] px-6 max-w-5xl mx-auto text-center">
        {/* Logo principal */}
        <div className="relative w-[250px] md:w-[400px] lg:w-[450px] aspect-[1/1] mx-auto mb-6">
          <Image
            src="/junto.png"
            alt="Monumby Logo"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Texto principal */}
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4">
          {t("title")}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-4">
          {t("subtitle")}
        </p>
        <p className="max-w-2xl mx-auto text-gray-300 mb-8">{t("ctaText")}</p>

        {/* Botón con sello */}
        <div className="relative inline-block mt-4">
          <Link
            href="https://monumby.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl font-semibold text-lg hover:opacity-90 transition inline-block shadow-lg"
          >
            {t("ctaHero")}
          </Link>
        </div>
      </section>
    </main>
  );
}

export const revalidate = 604800; // 🕒 7 días
