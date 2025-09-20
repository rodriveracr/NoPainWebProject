// src/app/[locale]/wicann/page.tsx
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../globals.css"; // desde src/app/[locale]/wicann/ a src/app/globals.css

export const metadata = {
  title: "Wicann - No Pain Brand",
  description: "Tónico calmante y regenerador para después del tatuaje.",
};

export default async function Wicann({ params }: { params: { locale: string } }) {
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'products' });


  return (
    <>
      <Header locale={locale} />
      <div className="h-16"></div>
      <main className="relative text-white min-h-screen font-sans">
        <div className="absolute inset-0 bg-wicann" />
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative z-10 py-24 px-6">
          {/* HERO */}
          <section className="text-center max-w-4xl mx-auto">
            <Image
              src="/Wicann2.png"
              alt={t('wicann') || 'Wicann'}
              width={400}
              height={400}
              className="mx-auto rounded-lg shadow-lg"
            />
            <h1 className="text-3xl sm:text-4xl font-bold mt-6 text-white">
              {t('wicann') || 'Wicann'}
            </h1>
            <p className="text-base mt-4 text-white">
              {t('wicannTagline') || 'Tónico calmante y regenerador para después del tatuaje.'}
            </p>
          </section>

          {/* DESCRIPCIÓN */}
          <section className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('productDetails')}</h2>
            <p className="text-base text-white">
              {t('wicannDescription') || 'Wicann es un tónico formulado con extractos naturales que ayudan a reducir la irritación y favorecer la regeneración de la piel después del tatuaje. Ideal para una recuperación rápida y segura.'}
            </p>
          </section>

          {/* BENEFICIOS */}
          <section className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('benefits') || 'Beneficios'}</h2>
            <ul className="mt-6 space-y-2 text-base text-white text-left max-w-md mx-auto">
              <li>{t('wicannBenefit1') || '✔️ Hidrata y calma la piel recién tatuada'}</li>
              <li>{t('wicannBenefit2') || '✔️ Favorece la regeneración natural'}</li>
              <li>{t('wicannBenefit3') || '✔️ Reduce enrojecimiento e incomodidad'}</li>
              <li>{t('wicannBenefit4') || '✔️ Fórmula ligera, rápida absorción'}</li>
            </ul>
          </section>

          {/* MODO DE USO */}
          <section className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('usage') || 'Modo de uso'}</h2>
            <ol className="list-decimal list-inside space-y-3 text-base text-white text-left max-w-md mx-auto">
              <li>{t('wicannUsage1') || 'Limpia el área tatuada con jabón neutro.'}</li>
              <li>{t('wicannUsage2') || 'Aplica Wicann directamente sobre la piel.'}</li>
              <li>{t('wicannUsage3') || 'Deja absorber sin enjuagar.'}</li>
              <li>{t('wicannUsage4') || 'Repite 2-3 veces al día según necesidad.'}</li>
            </ol>
          </section>

          {/* CONSEJOS */}
          <section className="mt-16 max-w-3xl mx-auto text-center pb-20">
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('tips') || 'Consejos'}</h2>
            <ul className="mt-6 space-y-2 text-base text-white text-left max-w-md mx-auto">
              <li>{t('wicannTip1') || '💡 Uso exclusivo para después del tatuaje.'}</li>
              <li>{t('wicannTip2') || '💡 Mantener en lugar fresco y seco.'}</li>
              <li>{t('wicannTip3') || '💡 Evitar contacto con ojos y mucosas.'}</li>
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
