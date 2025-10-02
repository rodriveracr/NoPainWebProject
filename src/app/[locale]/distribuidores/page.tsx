//src/app/[locale]/distribuidores/page.tsx
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../globals.css";

export const metadata = {
  title: "Distribuidores - No Pain Brand",
  description: "Encuentra distribuidores autorizados de No Pain en todo el mundo.",
};

export default async function DistribuidoresPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Suppliers" });

  return (
    <>
      <Header locale={locale} />
      <div className="h-16" />

      <main className="relative text-white min-h-screen font-sans">
        <div className="absolute inset-0 hero-bg" />
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 py-24 px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-10">{t("title")}</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t("latinAmerica")}</h2>
            <ul className="space-y-2">
              <li>{t("colombia")} — {t("exclusiveDistributorBogota")}</li>
              <li>{t("costaRica")} — {t("nationalShipping")}</li>
              <li>{t("nicaragua")} — {t("wholesaleRetail")}</li>
              <li>{t("venezuela")}</li>
              <li>{t("mexico")}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t("usa")}</h2>
            <p>{t("ordersUSA")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t("europe")}</h2>
            <p>{t("spain")}</p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}
