// 📄 /src/app/[locale]/xteri-numb/page.tsx
import { getTranslations } from "next-intl/server";
import ProductLayout from "@/components/ProductLayout";
import ClientPopup from "@/components/Popup";

export const metadata = {
  title: "Xteri-Numb | Antiseptic & Numbing Spray for Tattoos",
  description:
    "Medical-grade antiseptic and numbing spray for tattoos and PMU. Instant disinfection and pain relief.",
};

export default async function XteriNumbPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  return (
    <>
      {/* ✅ Popup cliente (no bloquea SSR) */}
      <ClientPopup locale={locale} />

      {/* ✅ Layout unificado de producto (Header/Footer vienen del layout global) */}
      <ProductLayout
        title={t("xteriNumb")}
        tagline={t("xteriNumbTagline")}
        imageSrc="/_CZC3060.webp"
        imageAlt={t("xteriNumbAlt") || "Xteri-Numb anesthetic spray"}
        backgroundClass="bg-xterinum"
      >
        {/* 🔹 Detalles del producto */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-2">
            {t("productDetails")}
          </h2>
          <p className="text-gray-300">{t("xteriNumbDescription")}</p>
        </section>

        {/* 🔹 Características */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-2">
            {t("features")}
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>{t("xteriBenefit1")}</li>
            <li>{t("xteriBenefit2")}</li>
            <li>{t("xteriBenefit3")}</li>
            <li>{t("xteriBenefit4")}</li>
            <li>{t("xteriBenefit5")}</li>
          </ul>
        </section>

        {/* 🔹 Modo de uso */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-2">
            {t("usage")}
          </h3>
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
    </>
  );
}

// 🌍 Generar rutas estáticas (es/en)
export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

// ♻️ Revalidar cada 7 días
export const revalidate = 604800;
