import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../globals.css";

export const metadata = {
  title: "Xteri-Numb - No Pain Brand",
  description: "Spray desinfectante y anestésico para usar durante el tatuaje.",
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
      <Header locale={locale} />
      <div className="h-16" />

      <main className="relative text-white min-h-screen font-sans">
        <div className="absolute inset-0 bg-xterinum bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 py-24 px-6 max-w-4xl mx-auto text-center">
          {/* 🔥 Imagen del producto */}
          <Image
            src="/xteri.png"
            alt="Xteri-Numb Spray"
            width={450}
            height={450}
            className="mx-auto mb-8 rounded-lg shadow-lg"
            priority
          />

          <h1 className="text-4xl font-bold mb-6">{t("xteriNumb")}</h1>
          <p className="text-lg text-gray-200 mb-8">{t("xteriNumbTagline")}</p>

          <h2 className="text-2xl font-semibold">{t("productDetails")}</h2>
          <p className="mb-6">{t("xteriNumbDescription")}</p>

          <h3 className="text-xl font-semibold mt-6">{t("features")}</h3>
          <ul className="list-disc pl-6 text-left space-y-2">
            <li>{t("xteriBenefit1")}</li>
            <li>{t("xteriBenefit2")}</li>
            <li>{t("xteriBenefit3")}</li>
            <li>{t("xteriBenefit4")}</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">{t("usage")}</h3>
          <ul className="list-disc pl-6 text-left space-y-2">
            <li>{t("xteriUsage1")}</li>
            <li>{t("xteriUsage2")}</li>
            <li>{t("xteriUsage3")}</li>
            <li>{t("xteriUsage4")}</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">{t("tips")}</h3>
          <ul className="list-disc pl-6 text-left space-y-2">
            <li>{t("xteriTip1")}</li>
            <li>{t("xteriTip2")}</li>
            <li>{t("xteriTip3")}</li>
          </ul>
        </div>
      </main>

      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}
