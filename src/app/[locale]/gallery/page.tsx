// src/app/[locale]/gallery/page.tsx
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../globals.css";
import GalleryPhotos from "./GalleryPhotos";
import GalleryVideos from "./GalleryVideos";
import { Suspense } from "react"; // 👈 IMPORTANTE

export const metadata = {
  title: "Gallery - No Pain",
  description: "Discover photos and videos with No Pain.",
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
      {/* ✅ Header con Suspense */}
      <Suspense fallback={<div>Loading header...</div>}>
        <Header locale={locale} />
      </Suspense>
      <div className="h-16" />

      <main className="bg-black text-white min-h-screen py-24 px-6 font-franklin space-y-24">
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold">
            {t("title") || "Gallery"}
          </h1>
          <p className="text-base text-gray-300 mt-4">
            {t("description") ||
              "Discover our products, their real use, and our global story."}
          </p>
        </section>

        {/* 🎥 Videos y 📸 Fotos */}
        <GalleryVideos />
        <GalleryPhotos />
      </main>

      {/* ✅ Footer con Suspense */}
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer locale={locale} />
      </Suspense>
    </>
  );
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}
