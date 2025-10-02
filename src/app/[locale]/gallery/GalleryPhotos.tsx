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

      {/* Modal */}
      <AnimatePresence>
        {current !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setCurrent(null)}
              title="Close"
              className="absolute top-6 right-6 text-white text-3xl"
            >
              <X size={32} />
            </button>

            {/* Flecha izquierda */}
            <button
              onClick={prev}
              title="Previous"
              className="absolute left-6 text-white text-4xl"
            >
              <ChevronLeft size={40} />
            </button>

            {/* Imagen modal */}
            <div className="flex flex-col md:flex-row items-center gap-6 max-w-6xl p-4">
              <Image
                src={photos[current].src}
                alt={photos[current].alt}
                width={800}
                height={1000}
                className="rounded-lg object-cover max-h-[85vh]"
              />
              <div className="text-white max-w-sm">
                <h3 className="text-xl font-bold mb-4">
                  {safeT(`photo${current + 1}.overlay`, photos[current].alt)}
                </h3>
                <p className="text-gray-300">
                  {safeT(
                    `photo${current + 1}.longDesc`,
                    "Aquí puedes poner una breve descripción de la foto."
                  )}
                </p>
              </div>
            </div>

            {/* Flecha derecha */}
            <button
              onClick={next}
              title="Next"
              className="absolute right-6 text-white text-4xl"
            >
              <ChevronRight size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
