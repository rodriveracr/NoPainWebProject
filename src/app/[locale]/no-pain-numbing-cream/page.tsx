import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../globals.css";

export const metadata = {
  title: "No Pain Numbing Cream - No Pain Brand",
  description: "Crema anestésica tópica premium para tatuajes y PMU.",
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
      <Header locale={locale} />
      <div className="h-16" />

      <main className="relative text-white min-h-screen font-sans">
        <div className="absolute inset-0 bg-nopaincream bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 py-24 px-6 max-w-4xl mx-auto text-center">
          {/* 🔥 Imagen del producto */}
          <Image
            src="/numbing-bg.jpg" // asegúrate que este archivo exista en /public
            alt="No Pain Numbing Cream"
            width={550}
            height={550}
            className="mx-auto mb-8 rounded-lg shadow-lg"
            priority
          />

          <h1 className="text-4xl font-bold mb-6">{t("noPainNumbingCream")}</h1>
          <p className="text-lg text-gray-200 mb-8">
            {t("noPainNumbingCreamTagline")}
          </p>

          <h2 className="text-2xl font-semibold">{t("productDetails")}</h2>
          <p className="mb-6">{t("noPainNumbingCreamDescription")}</p>

          <h3 className="text-xl font-semibold mt-6">{t("features")}</h3>
          <ul className="list-disc pl-6 text-left space-y-2">
            <li>{t("feature1")}</li>
            <li>{t("feature2")}</li>
            <li>{t("feature3")}</li>
            <li>{t("feature4")}</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">{t("usage")}</h3>
          <ul className="list-disc pl-6 text-left space-y-2">
            <li>{t("noPainNumbingCreamUsage1")}</li>
            <li>{t("noPainNumbingCreamUsage2")}</li>
            <li>{t("noPainNumbingCreamUsage3")}</li>
            <li>{t("noPainNumbingCreamUsage4")}</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">{t("tips")}</h3>
          <ul className="list-disc pl-6 text-left space-y-2">
            <li>{t("noPainNumbingCreamTip1")}</li>
            <li>{t("noPainNumbingCreamTip2")}</li>
            <li>{t("noPainNumbingCreamTip3")}</li>
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
