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

        <main className="relative text-white min-h-screen font-franklin">
          <div className="absolute inset-0 hero-bg" />
          <div className="absolute inset-0 bg-black/80" />

          <div className="relative z-10 py-24 px-6 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-10">{t("title")}</h1>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                {t("intellectualPropertyTitle")}
              </h2>
              <p>{t("intellectualPropertyText")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                {t("registrationTitle")}
              </h2>
              <p>{t("registrationText")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                {t("internationalTitle")}
              </h2>
              <p>{t("internationalText")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                {t("infractionsTitle")}
              </h2>
              <p>{t("infractionsText")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">{t("termsTitle")}</h2>
              <p>{t("termsText")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                {t("privacyTitle")}
              </h2>
              <p>{t("privacyText")}</p>
            </section>

            <p className="text-sm text-gray-400 mt-10">
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
