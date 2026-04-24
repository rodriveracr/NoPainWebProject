// 📄 /src/app/[locale]/green-soap/page.tsx
import { getTranslations } from "next-intl/server";
import ProductLayout from "@/components/ProductLayout";

export default async function GreenSoap({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  return (
    <ProductLayout
      title={t("greenSoap")}
      tagline={t("greenSoapTagline")}
      imageSrc="/Green-Soap-1.jpg"
      imageAlt={t("greenSoapAlt") || "Green Soap bottle by No Pain"}
      backgroundClass="bg-greensoap"
    >
      {/* 🔹 Detalles del producto */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-2">{t("productDetails")}</h2>
        <p className="text-gray-300">{t("greenSoapDescription")}</p>
      </section>

      {/* 🔹 Características */}
      <section>
        <h3 className="text-xl font-semibold text-white mb-2">{t("features")}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>{t("greenSoapBenefit1")}</li>
          <li>{t("greenSoapBenefit2")}</li>
          <li>{t("greenSoapBenefit3")}</li>
          <li>{t("greenSoapBenefit4")}</li>
          <li>{t("greenSoapBenefit5")}</li>
        </ul>
      </section>

      {/* 🔹 Modo de uso */}
      <section>
        <h3 className="text-xl font-semibold text-white mb-2">{t("usage")}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>{t("greenSoapUsage1")}</li>
          <li>{t("greenSoapUsage2")}</li>
          <li>{t("greenSoapUsage3")}</li>
          <li>{t("greenSoapUsage4")}</li>
        </ul>
      </section>

      {/* 🔹 Consejos */}
      <section>
        <h3 className="text-xl font-semibold text-white mb-2">{t("tips")}</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>{t("greenSoapTip1")}</li>
          <li>{t("greenSoapTip2")}</li>
          <li>{t("greenSoapTip3")}</li>
          <li>{t("greenSoapTip4")}</li>
        </ul>
      </section>
    </ProductLayout>
  );
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export const revalidate = 604800; // 🕒 7 días
