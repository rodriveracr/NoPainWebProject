// 📄 /src/app/[locale]/wicann/page.tsx
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductLayout from "@/components/ProductLayout";

export const metadata = {
  title: "Wicann by No Pain",
  description:
    "Tónico natural destilado de hamamelis, ideal para calmar, tonificar y preparar la piel antes y después del tatuaje o PMU.",
};

export default async function WicannPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  return (
    <>
      {/* ✅ Header optimizado con Suspense */}
      <Suspense fallback={<div className="text-center py-8 text-gray-400">Loading header...</div>}>
        <Header locale={locale} />
      </Suspense>

      {/* ✅ Layout unificado para producto */}
      <ProductLayout
        title={t("wicann")}
        tagline={t("wicannTagline")}
        imageSrc="/_CZC3097.webp"
        imageAlt={t("wicannAlt") || "Wicann witch hazel tonic by No Pain"}
        backgroundClass="bg-wicann"
      >
        {/* 🔹 Detalles del producto */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-2">{t("productDetails")}</h2>
          <p className="text-gray-300">{t("wicannDescription")}</p>
        </section>

        {/* 🔹 Beneficios */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-2">{t("features")}</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>{t("wicannBenefit1")}</li>
            <li>{t("wicannBenefit2")}</li>
            <li>{t("wicannBenefit3")}</li>
            <li>{t("wicannBenefit4")}</li>
            <li>{t("wicannBenefit5")}</li>
          </ul>
        </section>

        {/* 🔹 Modo de uso */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-2">{t("usage")}</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>{t("wicannUsage1")}</li>
            <li>{t("wicannUsage2")}</li>
            <li>{t("wicannUsage3")}</li>
            <li>{t("wicannUsage4")}</li>
          </ul>
        </section>

        {/* 🔹 Consejos */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-2">{t("tips")}</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>{t("wicannTip1")}</li>
            <li>{t("wicannTip2")}</li>
            <li>{t("wicannTip3")}</li>
          </ul>
        </section>
      </ProductLayout>

      {/* ✅ Footer optimizado */}
      <Suspense fallback={<div className="text-center py-8 text-gray-400">Loading footer...</div>}>
        <Footer locale={locale} />
      </Suspense>
    </>
  );
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}
