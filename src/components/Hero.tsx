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
      {/* 🔲 Fondo e overlay coherente con el resto */}
      <div className="absolute inset-0 hero-bg bg-cover bg-center" aria-hidden="true" />
      <div className="absolute inset-0 bg-black/80" aria-hidden="true" />

      {/* 🔹 Contenido principal */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* ✅ Imagen opcional si querés logo o fondo decorativo */}
        {/* <Image
          src="/hero-logo.webp"
          alt="No Pain Logo"
          width={200}
          height={200}
          className="mx-auto mb-6 drop-shadow-lg"
          priority
        /> */}

        <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-wide">
          {t("headline")}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* 🔻 Efecto degradado inferior opcional */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
