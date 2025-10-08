// 📄 /src/app/[locale]/xteri-numb/page.tsx
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductLayout from "@/components/ProductLayout";

export const metadata = {
  title: "Xteri-Numb | Antiséptico y Anestésico Profesional by No Pain",
  description:
    "Antiséptico y anestésico de grado médico para tatuajes y PMU. Desinfecta, calma y prolonga el efecto del adormecimiento.",
};

export default async function XteriNumb({
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

      {/* ✅ Layout unificado de producto */}
      <ProductLayout
        title={t("xteriNumb")}
        tagline={t("xteriNumbTagline")}
        imageSrc="/_CZC3060.webp"
        imageAlt={t("xteriNumbAlt") || "Xteri-Numb spray bottle by No Pain"}
        backgroundClass="bg-xterinum"
      >
        {/* 🔹 Detalles del producto */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-2">{t("productDetails")}</h2>
          <p className="text-gray-300">{t("xteriNumbDescription")}</p>
        </section>

        {/* 🔹 Características */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-2">{t("features")}</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>{t("xteriBenefit1")}</li>
            <li>{t("xteriBenefit2")}</li>
            <li>{t("xteriBenefit3")}</li>
            <li>{t("xteriBenefit4")}</li>
          </ul>
        </section>

        {/* 🔹 Modo de uso */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-2">{t("usage")}</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>{t("xteriUsage1")}</li>
            <li>{t("xteriUsage2")}</li>
            <li>{t("xteriUsage3")}</li>
            <li>{t("xteriUsage4")}</li>
          </ul>
        </section>

        {/* 🔹 Consejos */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-2">{t("tips")}</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>{t("xteriTip1")}</li>
            <li>{t("xteriTip2")}</li>
            <li>{t("xteriTip3")}</li>
          </ul>
        </section>
      </ProductLayout>

      {/* ✅ Footer optimizado con Suspense */}
      <Suspense fallback={<div className="text-center py-8 text-gray-400">Loading footer...</div>}>
        <Footer locale={locale} />
      </Suspense>
    </>
  );
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}
export const revalidate = 604800; // 🕒 7 días

