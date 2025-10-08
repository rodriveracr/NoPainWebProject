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
      {/* 🔲 Overlay oscuro */}
      <div className="absolute inset-0 bg-black/80 z-0" />

      {/* 🧩 Contenido principal */}
      <div className="relative z-10 pt-36 pb-[20vh] px-6 max-w-4xl mx-auto text-center">

        {/* 📸 Imagen del producto (bajada para evitar superposición con header) */}
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

        {/* 🔤 Título y tagline */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-wide">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
          {tagline}
        </p>

        {/* 🧾 Contenido interno */}
        <div className="text-left space-y-6">{children}</div>
      </div>
    </main>
  );
}
