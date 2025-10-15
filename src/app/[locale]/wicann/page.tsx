// 📄 /src/app/[locale]/wicann/page.tsx
import { getTranslations } from "next-intl/server";
import ProductLayout from "@/components/ProductLayout";
import ClientPopup from "@/components/Popup";
import { Suspense } from "react"; // 👈 importante

export const metadata = {
  title: "Wicann | Natural Witch Hazel Tonic for Tattoo Care",
  description:
    "Natural tonic distilled from witch hazel for soothing and conditioning skin after tattoos and PMU.",
};

export default async function WicannPage({
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
          Loading Wicann...
        </div>
      }
    >
      <>
        {/* ✅ Popup (solo cliente, no bloquea SSR) */}
        <ClientPopup locale={locale} />

        {/* ✅ Layout de producto (Header/Footer gestionados por layout global) */}
        <ProductLayout
          title={t("wicann")}
          tagline={t("wicannTagline")}
          imageSrc="/_CZC3097.webp"
          imageAlt={t("wicannAlt") || "Wicann witch hazel tonic"}
          backgroundClass="bg-wicann"
        >
          {/* 🔹 Detalles del producto */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              {t("productDetails")}
            </h2>
            <p className="text-gray-300">{t("wicannDescription")}</p>
          </section>

          {/* 🔹 Características */}
          <section>
            <h3 className="text-xl font-semibold text-white mb-2">
              {t("features")}
            </h3>
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
            <h3 className="text-xl font-semibold text-white mb-2">
              {t("usage")}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>{t("wicannUsage1")}</li>
              <li>{t("wicannUsage2")}</li>
              <li>{t("wicannUsage3")}</li>
              <li>{t("wicannUsage4")}</li>
            </ul>
          </section>

          {/* 🔹 Consejos */}
          <section>
            <h3 className="text-xl font-semibold text-white mb-2">
              {t("tips")}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>{t("wicannTip1")}</li>
              <li>{t("wicannTip2")}</li>
              <li>{t("wicannTip3")}</li>
            </ul>
          </section>
        </ProductLayout>
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
