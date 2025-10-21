// ✅ src/app/[locale]/faq/page.tsx

import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "FAQ | No Pain Brand",
  description: "Preguntas frecuentes sobre los productos y servicios No Pain.",
};

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "FAQ" });

  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-gray-400 bg-black/85 min-h-[200px]">
          Loading FAQ...
        </div>
      }
    >
      <>
        <Header locale={locale} />
<main className="relative text-white font-franklin min-h-screen pt-0 md:pt-32">
          <div className="absolute inset-0 hero-bg" />
          <div className="absolute inset-0 bg-black/80" />

          <div className="relative z-10 py-24 px-6 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-10">{t("pageTitle")}</h1>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-2">{t("noPain.title")}</h2>
              <ul className="space-y-4">
                <li><strong>{t("noPain.q1")}</strong> {t("noPain.a1")}</li>
                <li><strong>{t("noPain.q2")}</strong> {t("noPain.a2")}</li>
                <li><strong>{t("noPain.q3")}</strong> {t("noPain.a3")}</li>
                <li><strong>{t("noPain.q4")}</strong> {t("noPain.a4")}</li>
                <li><strong>{t("noPain.q5")}</strong> {t("noPain.a5")}</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-2">{t("xteri.title")}</h2>
              <ul className="space-y-4">
                <li><strong>{t("xteri.q1")}</strong> {t("xteri.a1")}</li>
                <li><strong>{t("xteri.q2")}</strong> {t("xteri.a2")}</li>
                <li><strong>{t("xteri.q3")}</strong> {t("xteri.a3")}</li>
                <li><strong>{t("xteri.q4")}</strong> {t("xteri.a4")}</li>
                <li><strong>{t("xteri.q5")}</strong> {t("xteri.a5")}</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-2">{t("wicann.title")}</h2>
              <ul className="space-y-4">
                <li><strong>{t("wicann.q1")}</strong> {t("wicann.a1")}</li>
                <li><strong>{t("wicann.q2")}</strong> {t("wicann.a2")}</li>
                <li><strong>{t("wicann.q3")}</strong> {t("wicann.a3")}</li>
                <li><strong>{t("wicann.q4")}</strong> {t("wicann.a4")}</li>
                <li><strong>{t("wicann.q5")}</strong> {t("wicann.a5")}</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-2">{t("greenSoap.title")}</h2>
              <ul className="space-y-4">
                <li><strong>{t("greenSoap.q1")}</strong> {t("greenSoap.a1")}</li>
                <li><strong>{t("greenSoap.q2")}</strong> {t("greenSoap.a2")}</li>
                <li><strong>{t("greenSoap.q3")}</strong> {t("greenSoap.a3")}</li>
                <li><strong>{t("greenSoap.q4")}</strong> {t("greenSoap.a4")}</li>
                <li><strong>{t("greenSoap.q5")}</strong> {t("greenSoap.a5")}</li>
              </ul>
            </section>
          </div>
        </main>
       
      </>
    </Suspense>
  );
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export const revalidate = 86400;
