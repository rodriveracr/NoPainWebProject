// 📄 /src/app/[locale]/page.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import ClientPopup from "@/components/Popup";

// 📄 Metadatos
export const metadata = {
  title: "No Pain",
  description:
    "No Pain offers anesthetic creams, tonics, and soaps for tattoos and PMU.",
};

// 📄 Tipos
type Dist = {
  name: string;
  whatsapp: string;
  url?: string;
  extra?: string | React.ReactNode;
  mapLink?: string;
  address?: string;
  phone?: string;
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

// 📄 Regiones y distribuidores
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
            extra: "Altamira 10-60 Caracas",
            mapLink: "https://maps.app.goo.gl/zpmLaKjZKp2oVqwU8",
            phone: "0212-4164026",
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
      {
        name: "panama",
        flag: "/flags/panama.png",
        dists: [
          {
            name: "@janethsupply",
            url: "https://instagram.com/janethsupply",
            whatsapp: "+50767558558",
            extra:
              "Janeth Beauty Supply – Centro Comercial Los Pueblos y Chorrera",
            mapLink: "https://www.google.com/maps/place/Janeth+Beauty+Supply/@9.0483503,-79.4551804,17z/data=!4m14!1m7!3m6!1s0x8fab55f4edf64be7:0xed44cb89e3cbb07c!2sJaneth+Beauty+Supply!8m2!3d9.0483503!4d-79.4526055!16s%2Fg%2F11rdb5lt9s!3m5!1s0x8fab55f4edf64be7:0xed44cb89e3cbb07c!8m2!3d9.0483503!4d-79.4526055!16s%2Fg%2F11rdb5lt9s?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D",
            isFixedText: true,
          },
          {
            name: "@pangeaink",
            url: "https://instagram.com/pangeaink",
            whatsapp: "+50762620736",
            extra:
              "Pangea Ink – Vía Argentina, Edificio Sobredo, Planta Baja Local A",
            mapLink: "https://maps.app.goo.gl/RKueVbMFVdnRxP2P6",
            isFixedText: true,
          },
          {
            name: "@tattoevolutionpanama",
            url: "https://instagram.com/tattoevolutionpanama",
            whatsapp: "+50765174118",
            extra:
              "Tattoo Evolution Panamá – Plaza Galápagos, Santa Clara, 1er piso local 22",
            isFixedText: true,
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
            whatsapp: "+1 (786) 210-2447",
            extra: (
              <span className="space-y-3 block text-sm sm:text-base leading-relaxed">
                <div className="text-gray-200">
                  Pedidos USA vía WhatsApp:{" "}
                  <a
                    href="https://wa.me/17862102447"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-white hover:text-gray-300"
                  >
                    +1 (786) 210-2447
                  </a>
                </div>
                <div className="text-gray-400">
                  Operamos desde Pompano Beach, FL · Soporte LatAm:{" "}
                  <a
                    href="https://wa.me/50683151806"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-gray-200 hover:text-white"
                  >
                    +506 8315 1806
                  </a>
                </div>
              </span>
            ),
            mapLink: "https://maps.app.goo.gl/noCpqcMPRoFCv1D79",
            address: "Building 3 2301 W Sample Rd, Unit 4A, Pompano Beach, FL 33073, United States",
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
  const tSuppliers = await getTranslations({ locale, namespace: "Suppliers" });
  const tHero = await getTranslations({ locale, namespace: "Hero" });

  const coverageBadges = REGIONS.flatMap((region) =>
    region.countries.map((country) => ({
      key: `${region.name}-${country.name}`,
      label: tSuppliers(country.name),
      flag: country.flag,
    })),
  );

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
              className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium rounded-2xl shadow-md hover:opacity-90 transition"
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

          {/* VIDEOS LOCALES */}
          <div className="mt-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { sources: ["/videos/video7.webm", "/videos/video7.mp4"] },
              { sources: ["/videos/video2.webm", "/videos/video2.mp4"] },
            ].map((video, idx) => (
              <div
                key={idx}
                className="w-full h-[700px] rounded-lg overflow-hidden border border-gray-700 shadow-lg"
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
            ))}
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
        <section id="proveedores" className="py-24 px-6 bg-black font-franklin">
          <h2 className="text-3xl font-semibold text-center mb-16 uppercase">
            {tSuppliers("title")}
          </h2>

          <div className="max-w-4xl mx-auto text-center space-y-10">
            <p className="text-lg text-gray-300 leading-relaxed">
              {tSuppliers("coverageCopy")}
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {coverageBadges.map((badge) => (
                <span
                  key={badge.key}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-full text-sm uppercase tracking-wide text-white bg-gray-900/60"
                >
                  <Image
                    src={badge.flag}
                    alt={badge.label}
                    width={20}
                    height={14}
                    className="rounded-sm"
                    loading="lazy"
                  />
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16">
            <a
              href="https://wa.me/50683151806"
              target="_blank"
              rel="noopener noreferrer"
              data-phone="+50683151806"
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-2xl font-medium hover:opacity-90 transition inline-flex items-center gap-2"
            >
              {tSuppliers("contactUs")}
            </a>

            <a
              href={`mailto:customercare@nopainnumbing.net?subject=${encodeURIComponent(
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
