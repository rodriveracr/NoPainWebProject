// 📄 /src/app/[locale]/page.tsx
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
  extra?: string | JSX.Element;
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
            isFixedText: true,
          },
          {
            name: "@pangeaink",
            url: "https://instagram.com/pangeaink",
            whatsapp: "+50762620736",
            extra:
              "Pangea Ink – Vía Argentina, Edificio Sobredo, Planta Baja Local A",
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
            whatsapp: "+15303085643",
            extra: (
              <span className="break-all text-sm sm:text-base leading-relaxed block">
                Compra online:{" "}
                <a
                  href="https://adsertattoos.bigcartel.com/product/no-pain-numbing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-white hover:text-gray-300 break-all"
                >
                  adsertattoos.bigcartel.com/product/no-pain-numbing
                </a>
              </span>
            ),
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
                                    className="flex items-center gap-2 hover:text-gray-300 break-all text-sm sm:text-base leading-relaxed"
                                  >
                                    <Image
                                      src="/icons/instagram.svg"
                                      alt="Instagram"
                                      width={18}
                                      height={18}
                                      loading="lazy"
                                    />
                                    <span className="break-all">{d.name}</span>
                                  </a>
                                ) : (
                                  <span className="flex items-center gap-2 break-all text-sm sm:text-base leading-relaxed">
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

                                {d.extra && (
                                  <p className="text-sm text-white break-words">
                                    {typeof d.extra === "string"
                                      ? d.isFixedText
                                        ? d.extra
                                        : tSuppliers(d.extra)
                                      : d.extra}
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

          {/* Botón de contacto */}
          <div className="text-center mt-16">
            <a
              href={`mailto:customercare@nopainnumbing.net?subject=${encodeURIComponent(
                tSuppliers("distributorMailSubject"),
              )}&body=${encodeURIComponent(tSuppliers("distributorMailBody"))}`}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-2xl font-medium hover:opacity-90 transition"
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
