// src/app/[locale]/xteri-numb/page.tsx
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../globals.css"; // desde src/app/[locale]/xteri-numb/ a src/app/globals.css

export const metadata = {
  title: "Xteri-Numb - No Pain Brand",
  description: "Spray desinfectante y anestésico para usar durante el tatuaje.",
};

export default async function XteriNumb({ params }: { params: { locale: string } }) {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'products' });



  return (
    <>
      <Header locale={locale} />
      <div className="h-16"></div>
      <main className="relative text-white min-h-screen font-sans">
        <div className="absolute inset-0 bg-xterinum" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 py-24 px-6">
          {/* HERO */}
          <section className="text-center max-w-4xl mx-auto">
            <Image
              src="/xteri.png"
              alt={t('xteriNumb') || 'Xteri-Numb'}
              width={400}
              height={400}
              className="mx-auto rounded-lg shadow-lg"
            />
            <h1 className="text-3xl sm:text-4xl font-bold mt-6 text-white">
              {t('xteriNumb') || 'Xteri-Numb'}
            </h1>
            <p className="text-base mt-4 text-white">
              {t('xteriNumbTagline') || 'Spray desinfectante y anestésico para usar durante el tatuaje.'}
            </p>
          </section>

          {/* DESCRIPCIÓN */}
          <section className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('productDetails')}</h2>
            <p className="text-base text-white">
              {t('xteriNumbDescription') || 'Xteri-Numb es un spray diseñado para aplicar durante la sesión de tatuaje. Ayuda a mantener el área limpia, desinfectada y con menor sensibilidad al dolor.'}
            </p>
          </section>

          {/* CARACTERÍSTICAS */}
          <section className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('features')}</h2>
            <ul className="mt-6 space-y-2 text-base text-white text-left max-w-md mx-auto">
              <li>{t('xteriBenefit1') || '✔️ Uso seguro durante el tatuaje'}</li>
              <li>{t('xteriBenefit2') || '✔️ Desinfecta y refresca la piel'}</li>
              <li>{t('xteriBenefit3') || '✔️ Reduce la molestia en sesiones largas'}</li>
              <li>{t('xteriBenefit4') || '✔️ No altera pigmentos ni cicatrización'}</li>
            </ul>
          </section>

          {/* MODO DE USO */}
          <section className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('usage') || 'Modo de uso'}</h2>
            <ol className="list-decimal list-inside space-y-3 text-base text-white text-left max-w-md mx-auto">
              <li>{t('xteriUsage1') || 'Agita bien antes de usar.'}</li>
              <li>{t('xteriUsage2') || 'Rocía sobre la piel tatuada cada vez que sea necesario.'}</li>
              <li>{t('xteriUsage3') || 'No enjuagar, deja que actúe de inmediato.'}</li>
              <li>{t('xteriUsage4') || 'Evita contacto con ojos y mucosas.'}</li>
            </ol>
          </section>

          {/* CONSEJOS */}
          <section className="mt-16 max-w-3xl mx-auto text-center pb-20">
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('tips') || 'Consejos'}</h2>
            <ul className="mt-6 space-y-2 text-base text-white text-left max-w-md mx-auto">
              <li>{t('xteriTip1') || '💡 Mantener en lugar fresco y seco.'}</li>
              <li>{t('xteriTip2') || '💡 Uso exclusivo profesional.'}</li>
              <li>{t('xteriTip3') || '💡 No aplicar sobre heridas abiertas.'}</li>
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
