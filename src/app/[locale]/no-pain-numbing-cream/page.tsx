// 📄 /src/app/[locale]/no-pain-numbing-cream/page.tsx
import { getTranslations } from "next-intl/server";
import ProductLayout from "@/components/ProductLayout";
import ClientPopup from "@/components/Popup";
import { Suspense } from "react"; // 👈 agregado

export const metadata = {
  title: "No Pain Numbing Cream | Premium Tattoo & PMU Numbing",
  description:
    "High-quality topical anesthetic cream for tattoos and PMU. Fast-acting, safe, and dermatologically tested.",
};

export default async function NoPainNumbingCream({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-gray-400 bg-black/85 min-h-[200px]">
          Loading No Pain Numbing Cream...
        </div>
      }
    >
      <>
        {/* ✅ Popup del cliente (CSR seguro) */}
        <ClientPopup locale={locale} />

        {/* ✅ Layout de producto unificado -- envuelto en `no-animations` para esta página */}
        <div className="no-animations">
          <ProductLayout
            title={t("noPainNumbingCream")}
            tagline={t("noPainNumbingCreamTagline")}
            /* Añadimos la imagen encima del texto similar a Xteri */
            imageSrc="/nopain456.png"
            imageAlt={t("noPainNumbingCreamAlt") || "No Pain Numbing Cream product"}
            /* Use the NO-PAIN product background image */
            backgroundClass="bg-nopaincream"
          >
          {/* 🧴 Detalles del producto */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              {t("productDetails")}
            </h2>
            <p className="text-gray-300">
              {t("noPainNumbingCreamDescription")}
            </p>
          </section>

          {/* ⚡ Características */}
          <section>
            <h3 className="text-xl font-semibold text-white mb-2">
              {t("features")}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>{t("feature1")}</li>
              <li>{t("feature2")}</li>
              <li>{t("feature3")}</li>
              <li>{t("feature4")}</li>
              <li>{t("feature5")}</li>
            </ul>
          </section>

          {/* 📋 Modo de uso */}
          <section>
            <h3 className="text-xl font-semibold text-white mb-2">
              {t("usage")}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>{t("noPainNumbingCreamUsage1")}</li>
              <li>{t("noPainNumbingCreamUsage2")}</li>
              <li>{t("noPainNumbingCreamUsage3")}</li>
              <li>{t("noPainNumbingCreamUsage4")}</li>
            </ul>
          </section>

          {/* 💡 Consejos */}
          <section>
            <h3 className="text-xl font-semibold text-white mb-2">
              {t("tips")}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>{t("noPainNumbingCreamTip1")}</li>
              <li>{t("noPainNumbingCreamTip2")}</li>
              <li>{t("noPainNumbingCreamTip3")}</li>
              <li>{t("noPainNumbingCreamTip4")}</li>
              <li>{t("noPainNumbingCreamTip5")}</li>
            </ul>
          </section>
      
          </ProductLayout>
          </div>
      </>
    </Suspense>
  );
}

// 🌍 Generar rutas estáticas (es/en)
export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

// ♻️ Revalidar cada 7 días
export const revalidate = 604800;
