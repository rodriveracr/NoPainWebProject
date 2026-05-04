// 📄 /src/app/[locale]/distribuidores/page.tsx
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export const metadata = {
  title: "Distribuidores - No Pain Brand",
  description:
    "Encuentra distribuidores autorizados de No Pain en todo el mundo.",
};

export default async function DistribuidoresPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Suppliers" });

  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-gray-400 bg-black/85 min-h-[200px]">
          Loading Distribuidores...
        </div>
      }
    >
      <>
        {/* ✅ Header y Footer vienen de componentes compartidos */}
        <Header locale={locale} />

        <main className="relative text-white min-h-screen font-franklin">
          {/* Fondo */}
          <div className="absolute inset-0 hero-bg" />
          <div className="absolute inset-0 bg-black/80" />

          {/* Contenido */}
          <div className="relative z-10 py-24 px-6 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-10">{t("title")}</h1>

            {/* 🌎 LATINOAMÉRICA */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {t("latinAmerica")}
              </h2>
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

            {/* 🇺🇸 USA */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t("usa")}</h2>
              <p>{t("ordersUSA")}</p>
            </section>

            {/* 🇪🇺 EUROPA */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t("europe")}</h2>
              <p>{t("spain")}</p>
            </section>
          </div>
        </main>

        <Footer locale={locale} />
      </>
    </Suspense>
  );
}

// ✅ Mantener generación estática y revalidación
export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export const revalidate = 86400; // ♻️ 24 horas
