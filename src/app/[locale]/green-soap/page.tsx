// src/app/[locale]/green-soap/page.tsx
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../globals.css"; // Corregido: desde src/app/[locale]/green-soap/ a src/app/globals.css (up 2 levels)

export const metadata = {
  title: "Green Soap - No Pain Brand",
  description: "Jabón Antiséptico Concentrado 4% Clorhexidina Gluconato.",
};

export default async function GreenSoap({ params }: { params: { locale: string } }) {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'products' });


  return (
    <>
      <Header locale={locale} />
      <div className="h-16"></div>
      <main className="relative text-white min-h-screen font-sans">
        <div className="absolute inset-0 bg-greensoap" />
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative z-10 py-24 px-6">
          <section className="text-center max-w-4xl mx-auto">
            <Image
              src="/GreenSoap.png"
              alt={t('greenSoap') || 'Green Soap'}
              width={400}
              height={400}
              className="mx-auto rounded-lg shadow-lg"
            />
            <h1 className="text-3xl sm:text-4xl font-bold mt-6 text-white">
              {t('greenSoap') || 'Green Soap'}
            </h1>
            <p className="text-base mt-4 text-white">
              {t('greenSoapTagline') || 'Jabón Antiséptico Concentrado 4% Clorhexidina Gluconato'}
            </p>
          </section>
          <section className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('description') || 'Descripción'}</h2>
            <p className="text-base text-white">
              {t('greenSoapDescription') || 'Nuestro jabón concentrado con clorhexidina gluconato al 4% está formulado para ofrecer una limpieza profunda y segura. Es ideal para la desinfección de la piel, la higiene de heridas cutáneas y la limpieza de áreas contaminadas, reduciendo eficazmente la presencia de bacterias y otros microorganismos.'}
            </p>
          </section>
          <section className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('benefits') || 'Beneficios'}</h2>
            <ul className="mt-6 space-y-2 text-base text-white text-left max-w-md mx-auto">
              <li>{t('greenSoapBenefit1') || '✔️ Máxima protección en cada uso'}</li>
              <li>{t('greenSoapBenefit2') || '✔️ Fórmula de grado profesional'}</li>
              <li>{t('greenSoapBenefit3') || '✔️ Seguro y eficaz en el cuidado de la piel'}</li>
            </ul>
            <p className="text-base text-white mt-6">
              {t('greenSoapAdditional') || 'Una solución confiable para la preparación, desinfección y cuidado en procedimientos que requieren la máxima higiene.'}
            </p>
          </section>
          <section className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('usage') || 'Modo de uso'}</h2>
            <ol className="list-decimal list-inside space-y-3 text-base text-white text-left max-w-md mx-auto">
              <li>{t('greenSoapUsage1') || 'Diluya 1 parte de jabón con 9 partes de agua filtrada o destilada.'}</li>
              <li>{t('greenSoapUsage2') || 'Aplicar con atomizador o paño limpio sobre la piel.'}</li>
              <li>{t('greenSoapUsage3') || 'Utilizar durante y después del tatuaje para limpieza.'}</li>
              <li>{t('greenSoapUsage4') || 'Conservar en un envase limpio y cerrado.'}</li>
            </ol>
          </section>
          <section className="mt-16 max-w-3xl mx-auto text-center pb-20">
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('tips') || 'Consejos'}</h2>
            <ul className="mt-6 space-y-2 text-base text-white text-left max-w-md mx-auto">
              <li>{t('greenSoapTip1') || '💡 Usa siempre diluido para evitar irritación.'}</li>
              <li>{t('greenSoapTip2') || '💡 Combínalo con productos de cuidado post-tatuaje.'}</li>
              <li>{t('greenSoapTip3') || '💡 Mantén fuera del alcance de los niños.'}</li>
              <li>{t('greenSoapTip4') || '💡 Ideal también para limpieza de equipos y superficies.'}</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}