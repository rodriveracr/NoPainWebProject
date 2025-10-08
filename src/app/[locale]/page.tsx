// src/app/[locale]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ✅ Importa el componente cliente directamente (Popup.tsx tiene "use client")
import ClientPopup from "@/components/Popup";

export const metadata = {
  title: "No Pain ",
  description:
    "No Pain ofrece cremas anestésicas, tónicos y jabones para tatuajes y PMU.",
};

// 🔹 Estructura distribuidores
type Dist = {
  name: string;
  whatsapp: string;
  url?: string;
  extra?: string;
  isFixedText?: boolean;
};

type Country = {
  name: string;
  flag: string;
  dists: Dist[];
};

type Region = {
  name: string;
  countries: Country[];
};

const REGIONS: Region[] = [
  {
    name: "latinAmerica",
    countries: [
      {
        name: "colombia",
        flag: "/flags/colombia.png",
        dists: [
          {
            name: "@painlesssupply",
            url: "https://instagram.com/painlesssupply",
            whatsapp: "+573241849978",
            extra: "exclusiveDistributorBogota",
          },
          {
            name: "@supplytattoo369",
            url: "https://instagram.com/supplytattoo369",
            whatsapp: "+573183938664",
            extra: "nationalShipping",
          },
        ],
      },
      {
        name: "nicaragua",
        flag: "/flags/nicaragua.png",
        dists: [
          {
            name: "@inksane_tattoonic",
            url: "https://instagram.com/inksane_tattoonic",
            whatsapp: "+50587566717",
          },
          {
            name: "@tahuros_tatto_supplies",
            url: "https://instagram.com/tahuros_tatto_supplies",
            whatsapp: "+50588529200",
          },
        ],
      },
      {
        name: "venezuela",
        flag: "/flags/venezuela.png",
        dists: [
          {
            name: "@agujasvenezuelatattoosupplies",
            url: "https://instagram.com/agujasvenezuelatattoosupplies",
            whatsapp: "+584241222931",
          },
          {
            name: "@rockytattoosupply",
            url: "https://instagram.com/rockytattoosupply",
            whatsapp: "+584142429226",
            extra: "Altamira 10-60 Caracas / Tel: 0212-4164026",
            isFixedText: true,
          },
        ],
      },
      {
        name: "mexico",
        flag: "/flags/mexico.png",
        dists: [
          {
            name: "Gabriela Ramírez",
            whatsapp: "+5215631451071",
            extra: "wholesaleRetail",
          },
        ],
      },
    ],
  },
  {
    name: "usa",
    countries: [
      {
        name: "usa",
        flag: "/flags/usa.png",
        dists: [
          {
            name: "@adsertattoos",
            url: "https://instagram.com/adsertattoos",
            whatsapp: "+15303085643",
            extra:
              "Compra online: https://adsertattoos.bigcartel.com/product/no-pain-numbing",
            isFixedText: true,
          },
          {
            name: "Cali Tattoo Supply",
            whatsapp: "+50683151806",
            extra: "Sacramento, California / Web: calitattoosupply.com",
            isFixedText: true,
          },
        ],
      },
    ],
  },
  {
    name: "europe",
    countries: [
      {
        name: "spain",
        flag: "/flags/spain.png",
        dists: [
          {
            name: "Darrin Jaramillo",
            whatsapp: "+34627771597",
            extra: "wholesaleRetail",
          },
        ],
      },
    ],
  },
];

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;

  // ✅ Traducciones
  const tNavbar = await getTranslations({ locale, namespace: "Navbar" });
  const tProducts = await getTranslations({ locale, namespace: "products" });
  const tGallery = await getTranslations({ locale, namespace: "Gallery" });
  const tAbout = await getTranslations({ locale, namespace: "About" });
  const tSuppliers = await getTranslations({ locale, namespace: "Suppliers" });
  const tHero = await getTranslations({ locale, namespace: "Hero" });

  return (
    <>
      <main className="text-white bg-black min-h-screen font-franklin">
        {/* ✅ POPUP SOLO EN LANDING (cliente) */}
        <ClientPopup locale={locale} />

        {/* ✅ Header envuelto en Suspense */}
        <Suspense fallback={<div>Loading header...</div>}>
          <Header locale={locale} />
        </Suspense>

        <div className="h-16"></div>

        {/* HERO */}
        <section className="h-screen flex items-center justify-center relative hero-bg">
          <div className="absolute inset-0 bg-black/60" />
          <div className="z-10 text-center px-6">
            <Link href={`#no-pain-brand`}>
              <Image
                src="/No-PAIN.webp"
                alt="No Pain Brand Logo"
                width={400}
                height={120}
                className="mx-auto"
                priority
                fetchPriority="high"
              />
            </Link>
            <p className="mt-4 text-2xl sm:text-3xl font-semibold text-white uppercase">
              {tHero("title")}
            </p>
            <Link
              href={`#productos`}
              className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium rounded-2xl shadow-md hover:opacity-90 transition"
            >
              {tHero("button")}
            </Link>
          </div>
        </section>

        {/* QUIÉNES SOMOS + Videos */}
        <section id="quienes-somos" className="py-24 text-center px-6 bg-black">
          <h2 className="text-4xl font-semibold mb-4 uppercase">{tNavbar("about")}</h2>
          <p className="max-w-3xl mx-auto text-white">{tAbout("intro")}</p>

          <div className="mt-8 text-base text-white text-left max-w-xl mx-auto space-y-2">
            <p className="font-semibold">{tAbout("resultTitle")}</p>
            <p>{tAbout("result1")}</p>
            <p>{tAbout("result2")}</p>
            <p>{tAbout("result3")}</p>
          </div>

          <p className="max-w-3xl mx-auto text-white mt-8">{tAbout("closing")}</p>

          {/* 🎥 GRID DE VIDEOS */}
          <div className="mt-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                sources: [
                  "https://res.cloudinary.com/dw31xhowm/video/upload/v1758591187/video7_tbyozu.webm",
                  "https://res.cloudinary.com/dw31xhowm/video/upload/v1758591187/video7_tbyozu.webm",
                ],
              },
              {
                sources: [
                  "https://res.cloudinary.com/dw31xhowm/video/upload/v1758591192/video2_onqzug.webm",
                  "https://res.cloudinary.com/dw31xhowm/video/upload/v1758590829/video2_yq7teb.mp4",
                ],
              },
            ].map((video, idx) => (
              <div
                key={idx}
                className="w-full h-[700px] rounded-lg overflow-hidden border border-gray-700"
              >
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  suppressHydrationWarning
                >
                  {video.sources.map((src, i) => (
                    <source
                      key={i}
                      src={src}
                      type={src.endsWith(".webm") ? "video/webm" : "video/mp4"}
                    />
                  ))}
                  Tu navegador no soporta el video.
                </video>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCTOS */}
        <section id="productos" className="py-20 px-6 bg-black">
          <h2 className="text-3xl font-semibold text-center mb-12 uppercase">
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
                className="text-center flex flex-col items-center p-4 border border-gray-700 rounded-xl hover:border-gray-500 transition-transform hover:scale-105"
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
                <p className="text-base text-white flex-grow">{p.desc}</p>
                <Link
                  href={p.link}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl font-medium hover:opacity-90 transition"
                >
                  {tProducts("moreInfo")}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* PROVEEDORES */}
        <section id="proveedores" className="py-24 px-6 bg-black">
          <h2 className="text-3xl font-semibold text-center mb-16 uppercase">
            {tSuppliers("title")}
          </h2>

          <div className="max-w-6xl mx-auto space-y-16">
            {REGIONS.map((region) => (
              <div key={region.name}>
                <h3 className="text-2xl font-bold mb-8 text-center uppercase">
                  {tSuppliers(region.name)}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {region.countries.map((country) => (
                    <div
                      key={country.name}
                      className="border border-gray-700 rounded-xl p-5 hover:border-gray-500 transition"
                    >
                      <h4 className="text-xl font-semibold mb-4 flex items-center gap-2 uppercase">
                        <Image
                          src={country.flag}
                          alt={tSuppliers(country.name)}
                          width={24}
                          height={16}
                          className="rounded-sm"
                          loading="lazy"
                        />
                        {tSuppliers(country.name)}
                      </h4>

                      <div className="space-y-3 text-white">
                        {country.dists.map((d, index) => {
                          const wa = `https://wa.me/${d.whatsapp.replace(/\D/g, "")}`;
                          return (
                            <div
                              key={`${country.name}-${index}`}
                              className="border-b border-gray-700 pb-3"
                            >
                              <div className="flex flex-col gap-1">
                                {d.url ? (
                                  <a
                                    href={d.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 hover:text-gray-300"
                                  >
                                    <Image
                                      src="/icons/instagram.svg"
                                      alt="Instagram"
                                      width={18}
                                      height={18}
                                      loading="lazy"
                                    />
                                    {d.name}
                                  </a>
                                ) : (
                                  <span className="flex items-center gap-2">
                                    {d.name}
                                  </span>
                                )}

                                <a
                                  href={wa}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-green-400 hover:text-green-300"
                                >
                                  <Image
                                    src="/icons/whatsapp.svg"
                                    alt="WhatsApp"
                                    width={18}
                                    height={18}
                                    loading="lazy"
                                  />
                                  {d.whatsapp}
                                </a>

                                {/* ✅ Traducción o texto fijo */}
                                {d.extra && (
                                  <p className="text-sm text-white">
                                    {d.isFixedText ? d.extra : tSuppliers(d.extra)}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a
              href={`mailto:customercare@nopainnumbing.net?subject=${encodeURIComponent(
                tSuppliers("distributorMailSubject")
              )}&body=${encodeURIComponent(tSuppliers("distributorMailBody"))}`}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-2xl font-medium hover:opacity-90 transition"
            >
              {tSuppliers("beDistributor")}
            </a>
          </div>
        </section>
      </main>

      {/* ✅ Footer envuelto en Suspense */}
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer locale={locale} />
      </Suspense>
    </>
  );
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}
