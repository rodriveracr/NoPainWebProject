// 📄 /src/components/ProductLayout.tsx
"use client";

import Image from "next/image";

interface ProductLayoutProps {
  title: string;
  tagline: string;
  imageSrc: string;
  imageAlt: string;
  backgroundClass: string;
  children: React.ReactNode;
}

export default function ProductLayout({
  title,
  tagline,
  imageSrc,
  imageAlt,
  backgroundClass,
  children,
}: ProductLayoutProps) {
  return (
    <main
      className={`relative text-white font-franklin overflow-hidden bg-cover bg-center ${backgroundClass}`}
    >
      {/* 🔲 Overlay oscuro (ajustado a 60% de opacidad para que se vea el fondo) */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* 🧩 Contenido principal */}
      <div className="relative z-10 pt-36 pb-[20vh] px-6 max-w-4xl mx-auto text-center">
        {/* 📸 Imagen del producto */}
        <div className="flex justify-center mb-10 mt-20 md:mt-28">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={450}
            height={450}
            className="rounded-2xl shadow-2xl border border-gray-700 object-contain"
            priority
          />
        </div>

        {/* 🔤 Título principal */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-wide text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.25)]">
          {title}
        </h1>

        {/* ✨ Tagline (eslogan principal con estilo fijo y limpio) */}
        <p className="tagline text-[1.5rem] leading-snug text-white mb-10 max-w-3xl mx-auto font-medium tracking-wide">
          {tagline}
        </p>

        {/* 🧾 Contenido interno */}
        <div className="text-left space-y-6">{children}</div>
      </div>
    </main>
  );
}
