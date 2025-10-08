// 📄 /src/app/[locale]/no-pain-numbing-cream/page.tsx
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductLayout from "@/components/ProductLayout";
import ClientPopup from "@/components/Popup"; // ✅ Popup cliente

export const metadata = {
  title: "No Pain Numbing Cream | Premium Tattoo & PMU Numbing",
  description:
    "Crema anestésica tópica premium de acción rápida para tatuajes y micropigmentación. Eficaz, segura y dermatológicamente probada.",
};

export default async function NoPainNumbingCream({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  return (
    <>
      {/* ✅ Popup (solo cliente, no bloquea SSR) */}
      <ClientPopup locale={locale} />

      {/* ✅ Header con Suspense */}
      <Suspense fallback={<div className="text-center py-8 text-gray-400">Loading header...</div>}>
        <Header locale={locale} />
      </Suspense>

      {/* ✅ Layout unificado para productos */}
      <ProductLayout
        title={t("noPainNumbingCream")}
        tagline={t("noPainNumbingCreamTagline")}
        imageSrc="/_czc3133.webp" // ✅ imagen original
        imageAlt={t("noPainNumbingCreamAlt") || "No Pain Numbing Cream product"}
        backgroundClass="bg-nopaincream"
      >
        {/* 🔹 Detalles del producto */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-2">{t("productDetails")}</h2>
          <p className="text-gray-300">{t("noPainNumbingCreamDescription")}</p>
        </section>

        {/* 🔹 Características */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-2">{t("features")}</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>{t("feature1")}</li>
            <li>{t("feature2")}</li>
            <li>{t("feature3")}</li>
            <li>{t("feature4")}</li>
          </ul>
        </section>

        {/* 🔹 Modo de uso */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-2">{t("usage")}</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>{t("noPainNumbingCreamUsage1")}</li>
            <li>{t("noPainNumbingCreamUsage2")}</li>
            <li>{t("noPainNumbingCreamUsage3")}</li>
            <li>{t("noPainNumbingCreamUsage4")}</li>
          </ul>
        </section>

        {/* 🔹 Consejos */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-2">{t("tips")}</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>{t("noPainNumbingCreamTip1")}</li>
            <li>{t("noPainNumbingCreamTip2")}</li>
            <li>{t("noPainNumbingCreamTip3")}</li>
          </ul>
        </section>
      </ProductLayout>

      {/* ✅ Footer con Suspense */}
      <Suspense fallback={<div className="text-center py-8 text-gray-400">Loading footer...</div>}>
        <Footer locale={locale} />
      </Suspense>
    </>
  );
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}
