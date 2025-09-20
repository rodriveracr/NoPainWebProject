import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../globals.css";

export const metadata = {
  title: "Políticas & Legal - No Pain Brand",
  description: "Información legal y políticas de No Pain Brand en Costa Rica y a nivel internacional.",
};

export default async function Legal({ params }: { params: { locale: string } }) {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'Legal' });


  return (
    <>
      <Header locale={locale} />
      <div className="h-16"></div>
      <main className="bg-black text-white min-h-screen py-24 px-6 font-sans">
        <section className="max-w-4xl mx-auto space-y-12">
          <h1 className="text-4xl font-bold text-center mb-12">
            {t("title")}
          </h1>

          <div>
            <h2 className="text-2xl font-semibold mb-4">{t("intellectualPropertyTitle")}</h2>
            <p className="text-gray-300">{t("intellectualPropertyText")}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">{t("registrationTitle")}</h2>
            <p className="text-gray-300">{t("registrationText")}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">{t("internationalTitle")}</h2>
            <p className="text-gray-300">{t("internationalText")}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">{t("infractionsTitle")}</h2>
            <p className="text-gray-300">{t("infractionsText")}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">{t("termsTitle")}</h2>
            <p className="text-gray-300">{t("termsText")}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">{t("privacyTitle")}</h2>
            <p className="text-gray-300">{t("privacyText")}</p>
          </div>

          <p className="text-sm text-gray-500 mt-12 text-center">
            📅 {t("lastUpdated")}: 18/09/2025
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}
