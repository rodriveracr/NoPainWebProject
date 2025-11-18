//src/components/Hero.tsx
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      className="relative text-white font-franklin overflow-hidden min-h-[80vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-12"
      role="banner"
      aria-label="Hero section"
    >
      {/* 🖼️ Imagen principal (LCP real) */}
      <Image
        src="/No-PAIN.webp"
        alt="No Pain Brand Hero Image"
        width={1500}
        height={1500}
        priority
        fetchPriority="high"
        quality={85}
        className="hero-image shiny absolute inset-0 w-full h-full object-cover object-center opacity-55"
      />

      

      {/* 🔲 Capa oscura sobre la imagen */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"
        aria-hidden="true"
      />

      {/* 🔹 Contenido principal */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-wide drop-shadow-md">
          {t("headline")}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
          {t("subtitle")}
        </p>
      </div>

      {/* 🕯️ Sello Monumby con efecto “Fade + Glow Dorado Premium” */}
      <a
        href="https://monumby.com/"
        target="_blank"
        rel="noopener noreferrer"
        title="Visit Monumby website"
        aria-label="Visit Monumby official website"
        className="hero-sello"
      >
        <Image
          src="/sailedited.png"
          alt="Monumby Quality Seal"
          width={110}
          height={110}
          className="w-full h-auto"
        />
      </a>





      {/* 🔻 Efecto degradado inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
