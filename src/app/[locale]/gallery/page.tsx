// 📄 /src/app/[locale]/gallery/page.tsx
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import GalleryVideos from "./GalleryVideos";
import GalleryPhotos from "./GalleryPhotos";

export const metadata = {
  title: "No Pain Gallery | Tattoo & PMU",
  description:
    "Explore the complete No Pain line through exclusive photos and videos representing our philosophy of excellence.",
};

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // ✅ Esperamos params correctamente (Next.js 15)
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Gallery" });

  return (
    // ✅ Ya no incluimos Header ni Footer — el layout global se encarga
    <main className="relative text-white font-franklin overflow-hidden bg-black">
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-gallery bg-cover bg-center"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/85" aria-hidden="true" />

      {/* Contenido */}
      <div className="relative z-10 pt-40 pb-[20vh] px-6 max-w-7xl mx-auto text-center space-y-24">
        <section className="max-w-3xl mx-auto text-center md:mt-32">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-wide leading-tight">
            {t("title")}
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto md:mt-6">
            {t("description")}
          </p>
        </section>

        {/* 🎥 Videos */}
        <Suspense
          fallback={
            <div className="text-center py-20 text-gray-400 bg-black/85">
              Loading videos...
            </div>
          }
        >
          <GalleryVideos />
        </Suspense>

        {/* 🖼️ Fotos */}
        <Suspense
          fallback={
            <div className="text-center py-20 text-gray-400 bg-black/85">
              Loading photos...
            </div>
          }
        >
          <GalleryPhotos />
        </Suspense>
      </div>
    </main>
  );
}

// ✅ Mantiene generación estática y revalidación semanal
export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export const revalidate = 604800; // 🕒 7 días
