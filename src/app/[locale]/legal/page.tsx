// ✅ /src/app/[locale]/legal/page.tsx
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Legal | No Pain Brand",
  description:
    "Información legal, políticas y condiciones de uso de No Pain Brand.",
};

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal" });

  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-gray-400 bg-black/85 min-h-[200px]">
          Loading Legal...
        </div>
      }
    >
      <>
        <Header locale={locale} />

        <main className="relative text-white min-h-screen font-franklin overflow-hidden">
          {/* 🔳 Fondo general con efecto glass */}
          <div className="absolute inset-0 hero-bg bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* ⚖️ Contenido legal */}
<div className="relative z-10 px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto mt-30 md:mt-30 lg:mt-34">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 tracking-wide text-center">
              {t("title")}
            </h1>

            {/* 🌐 Secciones legales */}
            <section className="mb-10 border-b border-white/10 pb-6">
              <h2 className="text-2xl font-semibold mb-3 text-white/90">
                {t("intellectualPropertyTitle")}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t("intellectualPropertyText")}
              </p>
            </section>

            <section className="mb-10 border-b border-white/10 pb-6">
              <h2 className="text-2xl font-semibold mb-3 text-white/90">
                {t("registrationTitle")}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t("registrationText")}
              </p>
            </section>

            <section className="mb-10 border-b border-white/10 pb-6">
              <h2 className="text-2xl font-semibold mb-3 text-white/90">
                {t("internationalTitle")}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t("internationalText")}
              </p>
            </section>

            <section className="mb-10 border-b border-white/10 pb-6">
              <h2 className="text-2xl font-semibold mb-3 text-white/90">
                {t("infractionsTitle")}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t("infractionsText")}
              </p>
            </section>

            <section className="mb-10 border-b border-white/10 pb-6">
              <h2 className="text-2xl font-semibold mb-3 text-white/90">
                {t("termsTitle")}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t("termsText")}
              </p>
            </section>

            <section className="mb-10 border-b border-white/10 pb-6">
              <h2 className="text-2xl font-semibold mb-3 text-white/90">
                {t("privacyTitle")}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {t("privacyText")}
              </p>
            </section>

            {/* 📅 Fecha de última actualización */}
            <p className="text-sm text-gray-400 mt-12 text-center">
              {t("lastUpdated")}: 2025
            </p>
          </div>
        </main>

        
      </>
    </Suspense>
  );
}

// ✅ Rutas estáticas
export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

// ♻️ Revalidar cada 24 horas
export const revalidate = 86400;
