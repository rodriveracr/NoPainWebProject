"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function GalleryPhotos() {
  const t = useTranslations("Gallery");

  const safeT = (key: string, fallback: string) => {
    try {
      const res = t(key as any);
      return typeof res === "string" && res !== key ? res : fallback;
    } catch {
      return fallback;
    }
  };

  const photos = [
    { src: "/CZC_6271.jpg", alt: "No Pain Cream" },
    { src: "/_CZC3283-Editar.jpg", alt: "Xteri Spray" },
    { src: "/_CZC3396-Editar.jpg", alt: "Wicann" },
    { src: "/Green Soap 2.jpg", alt: "Green Soap" },
    { src: "/kar.jpg", alt: "No Pain Tube" },
    { src: "/IMG_4897 copia.jpg", alt: "Xteri Bottle" },
    { src: "/linea.jpg", alt: "No Pain Display" },
    { src: "/grees.jpg", alt: "Green Soap Bottle" },
  ];

  const [current, setCurrent] = useState<number | null>(null);

  const next = () =>
    setCurrent((prev) => (prev !== null ? (prev + 1) % photos.length : 0));
  const prev = () =>
    setCurrent((prev) =>
      prev !== null ? (prev - 1 + photos.length) % photos.length : photos.length - 1
    );

  return (
    <>
      {/* 📸 Grid de fotos */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">{t("photosTitle")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {photos.map((photo, idx) => {
            const overlay = safeT(`photo${idx + 1}.overlay`, photo.alt);
            return (
              <div
                key={idx}
                onClick={() => setCurrent(idx)}
                className="relative cursor-pointer overflow-hidden rounded-2xl border border-gray-700 hover:scale-105 transition-transform shadow-lg"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={600}
                  height={900}
                  className="object-cover w-full h-[500px] lg:h-[550px]"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition">
                  <p className="text-white text-lg font-semibold">{overlay}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Modal con scroll en descripción */}
      <AnimatePresence>
        {current !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCurrent(null)}
          >
            <div
              className="relative flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 max-w-6xl w-[92vw] p-2 md:p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón cerrar */}
              <button
                onClick={() => setCurrent(null)}
                title="Close"
                className="absolute top-4 right-4 text-white bg-black/70 hover:bg-black/90 p-2 rounded-full transition z-[10000]"
              >
                <X size={28} />
              </button>

              {/* Flecha izquierda */}
              <button
                onClick={prev}
                title="Previous"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl z-[10000] bg-black/40 hover:bg-black/70 p-2 rounded-full transition"
              >
                <ChevronLeft size={36} />
              </button>

              {/* Imagen principal */}
              <div className="flex items-center justify-center w-full max-w-[1280px] h-[55vh] md:h-[680px] bg-black rounded-lg shadow-2xl">
                <Image
                  src={photos[current].src}
                  alt={photos[current].alt}
                  width={800}
                  height={1000}
                  className="rounded-lg object-contain max-h-full max-w-full"
                />
              </div>

              {/* Descripción con scroll */}
              <div className="text-white max-w-sm mt-3 md:mt-0 px-2 md:px-0 overflow-y-auto max-h-[25vh] md:max-h-[55vh] pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                <h3 className="text-xl font-bold mb-2">
                  {safeT(`photo${current + 1}.overlay`, photos[current].alt)}
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  {safeT(
                    `photo${current + 1}.longDesc`,
                    "Aquí puedes poner una breve descripción de la foto."
                  )}
                </p>
              </div>

              {/* Flecha derecha */}
              <button
                onClick={next}
                title="Next"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl z-[10000] bg-black/40 hover:bg-black/70 p-2 rounded-full transition"
              >
                <ChevronRight size={36} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
