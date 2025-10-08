// 📄 /src/components/Hero.tsx
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      className="relative text-white font-franklin overflow-hidden min-h-[80vh] flex flex-col items-center justify-center text-center px-6"
      role="banner"
      aria-label="Hero section"
    >
      {/* 🖼️ Imagen principal (LCP real) */}
      <Image
        src="/No-PAIN.webp"
        alt="No Pain Brand Hero Image"
        width={800}
        height={800}
        priority
        fetchPriority="high"
        quality={75}
        className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
      />

      {/* 🔲 Capa oscura sobre la imagen */}
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />

      {/* 🔹 Contenido principal */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-wide">
          {t("headline")}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* 🔻 Efecto degradado inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
