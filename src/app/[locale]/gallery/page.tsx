import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryPhotos from "./GalleryPhotos";
import GalleryVideos from "./GalleryVideos";
import { Suspense } from "react";

export const metadata = {
  title: "Gallery - No Pain",
  description: "Discover photos and videos from the No Pain experience.",
};

export default async function Gallery({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Gallery" });

  return (
    <>
      {/* ✅ Header en Suspense */}
      <Suspense fallback={<div className="text-center py-8 text-gray-400">Loading header...</div>}>
        <Header locale={locale} />
      </Suspense>

      {/* ✅ Contenedor principal con fondo coherente */}
      <main className="relative text-white font-franklin overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gallery bg-cover bg-center" aria-hidden="true" />
        <div className="absolute inset-0 bg-black/85" aria-hidden="true" />

        {/* 🔹 Contenido */}
        <div className="relative z-10 pt-40 pb-[20vh] px-6 max-w-7xl mx-auto text-center space-y-24">
          {/* Intro */}
          <section className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-wide">
              {t("title") || "Gallery"}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {t("description") ||
                "Explore our products in action and behind-the-scenes moments from around the world."}
            </p>
          </section>

          {/* Galería de Videos */}
          <GalleryVideos />

          {/* Galería de Fotos */}
          <GalleryPhotos />
        </div>
      </main>

      {/* ✅ Footer en Suspense */}
      <Suspense fallback={<div className="text-center py-8 text-gray-400">Loading footer...</div>}>
        <Footer locale={locale} />
      </Suspense>
    </>
  );
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}
