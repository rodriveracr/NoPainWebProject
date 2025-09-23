import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../globals.css";

export const metadata = {
  title: "Jabón Verde - No Pain Brand",
  description: "Jabón antiséptico concentrado con clorhexidina.",
};

export default async function GreenSoap({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  return (
    <>
      <Header locale={locale} />
      <div className="h-15" />

      <main className="relative text-white min-h-screen font-sans">
        <div className="absolute inset-0 bg-greensoap bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-5 py-5 px-2 max-w-4xl mx-auto text-center">
          {/* 🔥 Imagen del producto */}
          <Image
            src="/GreenSoap.png"
            alt="Jabón Verde"
            width={400}
            height={400}
            className="mx-auto mb-20 rounded-lg shadow-lg"
            priority
          />

          <h1 className="text-4xl font-bold mb-30">{t("greenSoap")}</h1>
          <p className="text-lg text-gray-200 mb-8">{t("greenSoapTagline")}</p>

          <h2 className="text-2xl font-semibold">{t("productDetails")}</h2>
          <p className="mb-6">{t("greenSoapDescription")}</p>

          <h3 className="text-xl font-semibold mt-6">{t("features")}</h3>
          <ul className="list-disc pl-6 text-left space-y-2">
            <li>{t("greenSoapBenefit1")}</li>
            <li>{t("greenSoapBenefit2")}</li>
            <li>{t("greenSoapBenefit3")}</li>
          </ul>

          <p className="mt-4">{t("greenSoapAdditional")}</p>

          <h3 className="text-xl font-semibold mt-6">{t("usage")}</h3>
          <ul className="list-disc pl-6 text-left space-y-2">
            <li>{t("greenSoapUsage1")}</li>
            <li>{t("greenSoapUsage2")}</li>
            <li>{t("greenSoapUsage3")}</li>
            <li>{t("greenSoapUsage4")}</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">{t("tips")}</h3>
          <ul className="list-disc pl-6 text-left space-y-2">
            <li>{t("greenSoapTip1")}</li>
            <li>{t("greenSoapTip2")}</li>
            <li>{t("greenSoapTip3")}</li>
            <li>{t("greenSoapTip4")}</li>
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
