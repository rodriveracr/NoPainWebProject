// src/app/[locale]/distribuidores/page.tsx
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../globals.css";
import { Suspense } from "react"; // 👈 agregado para seguridad

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
      {/* ✅ Header envuelto en Suspense */}
      <Suspense fallback={<div>Loading header...</div>}>
        <Header locale={locale} />
      </Suspense>
      <div className="h-16" />

      <main className="relative text-white min-h-screen font-franklin">
        <div className="absolute inset-0 hero-bg" />
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 py-24 px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-10">{t("title")}</h1>

          {/* LATINOAMÉRICA */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t("latinAmerica")}</h2>
            <ul className="space-y-2">
              <li>
                {t("colombia")} — {t("exclusiveDistributorBogota")}
              </li>
              <li>
                {t("nicaragua")} — {t("wholesaleRetail")}
              </li>
              <li>{t("venezuela")}</li>
              <li>{t("mexico")}</li>
            </ul>
          </section>

          {/* USA */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t("usa")}</h2>
            <p>{t("ordersUSA")}</p>
          </section>

          {/* EUROPA */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t("europe")}</h2>
            <p>{t("spain")}</p>
          </section>
        </div>
      </main>

      {/* ✅ Footer en Suspense */}
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer locale={locale} />
      </Suspense>
    </>
  );
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}
export const revalidate = 86400; // 🕒 24 horas

