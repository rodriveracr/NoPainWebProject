import Image from "next/image";
import { getTranslations } from 'next-intl/server';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../globals.css"; // desde src/app/[locale]/no-pain-numbing-cream/ a src/app/globals.css

export const metadata = {
  title: "No Pain Numbing Cream - No Pain Brand",
  description: "Crema anestésica tópica premium para tatuajes y PMU.",
};

export default async function NoPainNumbingCream({ params }: { params: { locale: string } }) {
  const { locale } = await Promise.resolve(params); // ✅ primero obtener locale
  const t = await getTranslations({ locale, namespace: 'products' }); // ✅ luego usar locale


  return (
    <>
      <Header locale={locale} />
      <div className="h-16"></div>
      <main className="relative text-white min-h-screen font-sans">
        {/* Fondo con imagen */}
        <div className="absolute inset-0 bg-nopaincream bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative z-10 py-24 px-6">
          {/* HERO */}
          <section className="text-center max-w-4xl mx-auto">
            <Image
              src="/NopainImageOficial.png"
              alt={t('noPainNumbingCream') || "No Pain Numbing Cream"}
              width={400}
              height={400}
              className="mx-auto rounded-lg shadow-lg"
            />
            <h1 className="text-3xl sm:text-4xl font-bold mt-6 text-white">
              {t('noPainNumbingCream') || "No Pain Numbing Cream"}
            </h1>
            <p className="text-base mt-4 text-white">
              {t('noPainNumbingCreamTagline') || "Crema anestésica tópica premium para tatuajes y PMU."}
            </p>
          </section>

          {/* DESCRIPCIÓN */}
          <section className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('productDetails') || "Descripción"}</h2>
            <p className="text-base text-white">
              {t('noPainNumbingCreamDescription') || "Nuestra crema premium está formulada para brindar anestesia tópica de larga duración y máxima seguridad en tatuajes y PMU."}
            </p>
          </section>

          {/* BENEFICIOS */}
          <section className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('features') || "Beneficios"}</h2>
            <ul className="mt-6 space-y-2 text-base text-white text-left max-w-md mx-auto">
              <li>{t('feature1') || "✔️ Anestesia tópica de larga duración"}</li>
              <li>{t('feature2') || "✔️ Fórmula segura y dermatológicamente probada"}</li>
              <li>{t('feature3') || "✔️ Reduce dolor e inflamación"}</li>
              <li>{t('feature4') || "✔️ Ideal para tatuajes y micropigmentación"}</li>
            </ul>
          </section>

          {/* MODO DE USO */}
          <section className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('usage') || "Modo de uso"}</h2>
            <ol className="list-decimal list-inside space-y-3 text-base text-white text-left max-w-md mx-auto">
              <li>{t('noPainNumbingCreamUsage1') || "Limpia bien la piel antes de aplicar."}</li>
              <li>{t('noPainNumbingCreamUsage2') || "Aplica una capa uniforme de crema sobre el área deseada."}</li>
              <li>{t('noPainNumbingCreamUsage3') || "Cubre con film plástico por 20-30 minutos."}</li>
              <li>{t('noPainNumbingCreamUsage4') || "Retira el exceso antes de iniciar el procedimiento."}</li>
            </ol>
          </section>

          {/* CONSEJOS */}
          <section className="mt-16 max-w-3xl mx-auto text-center pb-20">
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('tips') || "Consejos"}</h2>
            <ul className="mt-6 space-y-2 text-base text-white text-left max-w-md mx-auto">
              <li>{t('noPainNumbingCreamTip1') || "💡 No aplicar sobre piel irritada o con heridas abiertas."}</li>
              <li>{t('noPainNumbingCreamTip2') || "💡 Mantener fuera del alcance de los niños."}</li>
              <li>{t('noPainNumbingCreamTip3') || "💡 Uso exclusivo profesional."}</li>
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
