// src/app/[locale]/faq/page.tsx
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../globals.css";

export const metadata = {
  title: "Preguntas Frecuentes - No Pain Brand",
  description: "Encuentra respuestas a las dudas más comunes sobre No Pain Brand.",
};

export default async function FAQ({ params }: { params: { locale: string } }) {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'FAQ' });


  // 👇 Lista de secciones de FAQ organizadas por producto
  const sections = ["noPain", "xteri", "wicann", "greenSoap"];

  return (
    <>
      <Header locale={locale} />
      <div className="h-16"></div>
      <main className="bg-black text-white min-h-screen py-24 px-6 font-sans">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">
            {t("pageTitle") || "Preguntas Frecuentes"}
          </h1>

          <div className="space-y-16">
            {sections.map((sectionKey) => (
              <div key={sectionKey}>
                <h2 className="text-2xl font-semibold mb-6 text-pink-400">
                  {t(`${sectionKey}.title`)}
                </h2>
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i}>
                      <h3 className="text-lg font-semibold mb-1">
                        {t(`${sectionKey}.q${i}`)}
                      </h3>
                      <p className="text-gray-300">
                        {t(`${sectionKey}.a${i}`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}
