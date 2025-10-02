// src/app/[locale]/legal/page.tsx
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../globals.css";
import { Suspense } from "react"; // 👈 agregado

export const metadata = {
  title: "Políticas y Legal - No Pain Brand",
  description: "Información legal, derechos de autor, privacidad y términos de uso.",
};

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal" });

  return (
    <>
      {/* ✅ Header con Suspense */}
      <Suspense fallback={<div>Loading header...</div>}>
        <Header locale={locale} />
      </Suspense>
      <div className="h-16" />

      <main className="relative text-white min-h-screen font-franklin">
        <div className="absolute inset-0 hero-bg" />
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 py-24 px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-10">{t("title")}</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">{t("intellectualPropertyTitle")}</h2>
            <p>{t("intellectualPropertyText")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">{t("registrationTitle")}</h2>
            <p>{t("registrationText")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">{t("internationalTitle")}</h2>
            <p>{t("internationalText")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">{t("infractionsTitle")}</h2>
            <p>{t("infractionsText")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">{t("termsTitle")}</h2>
            <p>{t("termsText")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">{t("privacyTitle")}</h2>
            <p>{t("privacyText")}</p>
          </section>

          <p className="text-sm text-gray-400 mt-10">
            {t("lastUpdated")}: 2025
          </p>
        </div>
      </main>

      {/* ✅ Footer con Suspense */}
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer locale={locale} />
      </Suspense>
    </>
  );
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}
