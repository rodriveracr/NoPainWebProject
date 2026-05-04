// 📄 /src/app/[locale]/page.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import ClientPopup from "@/components/Popup";

// ✅ FIX: params ya no es Promise
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const tNavbar = await getTranslations({ locale, namespace: "Navbar" });
  const tProducts = await getTranslations({ locale, namespace: "products" });
  const tAbout = await getTranslations({ locale, namespace: "About" });
  const tHero = await getTranslations({ locale, namespace: "Hero" });
  const tSuppliers = await getTranslations({ locale, namespace: "Suppliers" });

  return (
    <>
      <main className="text-white bg-black min-h-screen font-franklin">
        <ClientPopup locale={locale} />

        <Suspense
          fallback={
            <div className="text-center py-8 text-gray-400 bg-black">
              Loading header...
            </div>
          }
        >
          <Header locale={locale} />
        </Suspense>

        <div className="h-16"></div>

        {/* HERO */}
        <section className="h-screen flex items-center justify-center relative hero-bg">
          <div className="absolute inset-0 bg-black/60" />
          <div className="z-10 text-center px-6">
            <Link href="#no-pain-brand">
              <Image
                src="/No-PAIN.webp"
                alt="No Pain Brand Logo"
                width={400}
                height={120}
                className="mx-auto"
                priority
              />
            </Link>
            <p className="mt-4 text-2xl sm:text-3xl font-semibold text-white uppercase tracking-wide">
              {tHero("title")}
            </p>
            <Link
              href="#productos"
              className="mt-6 inline-block px-6 py-3 bg-linear-to-r from-pink-500 to-red-500 text-white font-medium rounded-2xl shadow-md hover:opacity-90 transition"
            >
              {tHero("button")}
            </Link>
          </div>
        </section>

        {/* QUIÉNES SOMOS */}
        <section id="quienes-somos" className="py-24 text-center px-6 bg-black">
          <h2 className="text-4xl font-semibold mb-4 uppercase font-franklin">
            {tNavbar("about")}
          </h2>
          <p className="max-w-3xl mx-auto text-white font-franklin">
            {tAbout("intro")}
          </p>

          <div className="mt-8 text-base text-white text-left max-w-xl mx-auto space-y-2 font-franklin">
            <p className="font-semibold">{tAbout("resultTitle")}</p>
            <p>{tAbout("result1")}</p>
            <p>{tAbout("result2")}</p>
            <p>{tAbout("result3")}</p>
          </div>

          <p className="max-w-3xl mx-auto text-white mt-8 font-franklin">
            {tAbout("closing")}
          </p>

          {/* VIDEOS FROM CLOUDINARY CDN */}
          <div className="mt-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {(() => {
              // 🌐 Use Cloudinary in production, fallback to local in dev
              const cloudinaryBase = process.env.NEXT_PUBLIC_CLOUDINARY_BASE || "/videos";
              const videoBaseUrl =
                process.env.NODE_ENV === "production" && cloudinaryBase !== "/videos"
                  ? cloudinaryBase
                  : "/videos";

              const videoData = [
                { name: "video7", sources: [`${videoBaseUrl}/video7.webm`, `${videoBaseUrl}/video7.mp4`] },
                { name: "video2", sources: [`${videoBaseUrl}/video2.webm`, `${videoBaseUrl}/video2.mp4`] },
              ];

              return videoData.map((video, idx) => (
                <div
                  key={idx}
                  className="w-full min-h-[22rem] md:min-h-[28rem] lg:min-h-[34rem] rounded-lg overflow-hidden border border-gray-700 shadow-lg"
                >
                  <video
                    className="w-full h-full object-cover rounded-lg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="metadata"
                  >
                    {video.sources.map((src, i) => (
                      <source
                        key={i}
                        src={src}
                        type={src.endsWith(".webm") ? "video/webm" : "video/mp4"}
                      />
                    ))}
                  </video>
                </div>
              ));
            })()}
          </div>
        </section>

        {/* PRODUCTOS */}
        <section id="productos" className="py-20 px-6 bg-black">
          <h2 className="text-3xl font-semibold text-center mb-12 uppercase font-franklin">
            {tProducts("title")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {[
              {
                img: "/No-Pain.jpg",
                title: tProducts("noPainNumbingCream"),
                desc: tProducts("noPainNumbingCreamDescription"),
                link: `/${locale}/no-pain-numbing-cream`,
              },
              {
                img: "/xteri.png",
                title: tProducts("xteriNumb"),
                desc: tProducts("xteriNumbDescription"),
                link: `/${locale}/xteri-numb`,
              },
              {
                img: "/Wicann2.jpg",
                title: tProducts("wicann"),
                desc: tProducts("wicannDescription"),
                link: `/${locale}/wicann`,
              },
              {
                img: "/Green-Soap.jpg",
                title: tProducts("greenSoap"),
                desc: tProducts("greenSoapDescription"),
                link: `/${locale}/green-soap`,
              },
            ].map((p, i) => (
              <div
                key={i}
                className="text-center flex flex-col items-center p-4 border border-gray-700 rounded-xl hover:border-gray-500 transition-transform hover:scale-105 font-franklin"
              >
                <Image
                  src={p.img}
                  alt={p.title}
                  width={300}
                  height={300}
                  className="mx-auto object-cover rounded-lg"
                  loading="lazy"
                />
                <h3 className="mt-4 text-xl font-semibold text-white uppercase">
                  {p.title}
                </h3>
                <p className="text-base text-white grow">{p.desc}</p>
                <Link
                  href={p.link}
                  className="mt-4 px-4 py-2 bg-linear-to-r from-pink-500 to-red-500 text-white rounded-xl font-medium hover:opacity-90 transition"
                >
                  {tProducts("moreInfo")}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="py-16 px-6 bg-black font-franklin">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/50683151806"
              target="_blank"
              rel="noopener noreferrer"
              data-phone="+50683151806"
              className="px-6 py-3 bg-linear-to-r from-pink-500 to-red-500 text-white rounded-2xl font-medium hover:opacity-90 transition inline-flex items-center gap-2"
            >
              {tSuppliers("contactUs")}
            </a>

            <a
              href={`mailto:infonopain@nopainnumbing.net?subject=${encodeURIComponent(
                tSuppliers("distributorMailSubject"),
              )}&body=${encodeURIComponent(tSuppliers("distributorMailBody"))}`}
              className="px-6 py-3 border border-gray-600 text-white rounded-2xl font-medium hover:border-gray-400 transition inline-flex items-center gap-2"
            >
              {tSuppliers("beDistributor")}
            </a>
          </div>
        </section>

      </main>
    </>
  );
}

// ✅ Revalidación estática
export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}
