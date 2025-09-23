import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../globals.css";

export const metadata = {
  title: "Wicann - No Pain Brand",
  description: "Tónico calmante y regenerador para después del tatuaje.",
};

export default async function Wicann({
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
        <div className="absolute inset-0 bg-wicann bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 py-24 px-6 max-w-4xl mx-auto text-center">
          {/* 🔥 Imagen del producto */}
          <Image
            src="/wicann23.jpg"
            alt="Wicann"
            width={450}
            height={450}
            className="mx-auto mb-8 rounded-lg shadow-lg"
            priority
          />

          <h1 className="text-4xl font-bold mb-6">{t("wicann")}</h1>
          <p className="text-lg text-gray-200 mb-8">{t("wicannTagline")}</p>

          <h2 className="text-2xl font-semibold">{t("productDetails")}</h2>
          <p className="mb-6">{t("wicannDescription")}</p>

          <h3 className="text-xl font-semibold mt-6">{t("features")}</h3>
          <ul className="list-disc pl-6 text-left space-y-2">
            <li>{t("wicannBenefit1")}</li>
            <li>{t("wicannBenefit2")}</li>
            <li>{t("wicannBenefit3")}</li>
            <li>{t("wicannBenefit4")}</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">{t("usage")}</h3>
          <ul className="list-disc pl-6 text-left space-y-2">
            <li>{t("wicannUsage1")}</li>
            <li>{t("wicannUsage2")}</li>
            <li>{t("wicannUsage3")}</li>
            <li>{t("wicannUsage4")}</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">{t("tips")}</h3>
          <ul className="list-disc pl-6 text-left space-y-2">
            <li>{t("wicannTip1")}</li>
            <li>{t("wicannTip2")}</li>
            <li>{t("wicannTip3")}</li>
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
