// src/app/[locale]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

export const metadata = {
  title: "No Pain Brand - Anestésicos y Productos para Tatuajes",
  description:
    "No Pain Brand ofrece cremas anestésicas, tónicos y jabones para tatuajes y PMU.",
};

// 🔹 Tipado distribuidores
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

// 🔹 Distribuidores
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
        name: "costaRica",
        flag: "/flags/costarica.svg",
        dists: [
          {
            name: "@calitattoosupply",
            url: "https://instagram.com/calitattoosupply",
            whatsapp: "+50671710266",
            extra: "wholesaleRetail",
          },
          {
            name: "@nopaingel",
            url: "https://instagram.com/nopaingel",
            whatsapp: "+50683151806",
            extra: "headOffice",
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
            name: "Michael",
            whatsapp: "+15303085643",
            extra: "ordersUSA",
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
  const tHero = await getTranslations({ locale, namespace: "Hero" });
  const tNavbar = await getTranslations({ locale, namespace: "Navbar" });
  const tProducts = await getTranslations({ locale, namespace: "products" });
  const tGallery = await getTranslations({ locale, namespace: "Gallery" });
  const tAbout = await getTranslations({ locale, namespace: "About" });
  const tSuppliers = await getTranslations({ locale, namespace: "Suppliers" });

  return (
    <>
      <main className="text-white bg-black min-h-screen font-sans">
        <Header locale={locale} />
        <div className="h-16"></div>

        {/* HERO */}
        <section className="h-screen flex items-center justify-center relative hero-bg">
          <div className="absolute inset-0 bg-black/60" />
          <div className="z-10 text-center px-6">
            <Link href={`#no-pain-brand`}>
              <Image
                src="/LogoNopainvector3.png"
                alt="No Pain Brand Logo"
                width={500}
                height={150}
                className="mx-auto"
                priority
              />
            </Link>
            <p className="mt-4 text-2xl sm:text-3xl font-semibold text-white">
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

        {/* QUIENES SOMOS */}
        <section id="quienes-somos" className="py-24 text-center px-6 bg-black">
          <h2 className="text-4xl font-semibold mb-4">{tNavbar("about")}</h2>
          <p className="max-w-3xl mx-auto text-white">{tAbout("intro")}</p>
          <div className="mt-8 text-base text-white text-left max-w-xl mx-auto space-y-2">
            <p className="font-semibold">{tAbout("resultTitle")}</p>
            <ul className="list-disc list-inside space-y-2 text-white">
              <li>{tAbout("result1")}</li>
              <li>{tAbout("result2")}</li>
              <li>{tAbout("result3")}</li>
            </ul>
          </div>
          <p className="max-w-3xl mx-auto text-white mt-8">{tAbout("closing")}</p>

          {/* 🎥 GRID DE VIDEOS (Cloudinary) */}
          <div className="mt-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-black flex items-center justify-center rounded-lg p-2">
              <video
                className="max-w-full max-h-[500px] object-contain rounded-lg"
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
              >
                <source src="https://res.cloudinary.com/dw31xhowm/video/upload/v1758575932/video10_scucel.webm" type="video/webm" />
                <source src="https://res.cloudinary.com/dw31xhowm/video/upload/v1758575946/video10_ytjveg.mp4" type="video/mp4" />
                {tGallery("videoNotSupported")}
              </video>
            </div>

            <div className="bg-black flex items-center justify-center rounded-lg p-2">
              <video
                className="max-w-full max-h-[500px] object-contain rounded-lg"
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
              >
                <source src="https://res.cloudinary.com/dw31xhowm/video/upload/v1758575925/video6_nrrxvf.webm" type="video/webm" />
                <source src="https://res.cloudinary.com/dw31xhowm/video/upload/v1758575924/video6_tm6zvu.mp4" type="video/mp4" />
                {tGallery("videoNotSupported")}
              </video>
            </div>
          </div>
        </section>

        {/* PRODUCTOS */}
        {/* ... resto de la página igual ... */}
      </main>
      <Footer locale={locale} />
    </>
  );
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}
