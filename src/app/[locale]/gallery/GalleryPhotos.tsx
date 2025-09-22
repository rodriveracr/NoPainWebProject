"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function GalleryPhotos() {
  const t = useTranslations("Gallery");

  const photos = [
    { src: "/numbing-bg.jpg", desc: t("noPain") },
    { src: "/xterinumback3.jpg", desc: t("xteri") },
    { src: "/wicannback2.jpg", desc: t("wicann") },
    { src: "/greensoapback.jpg", desc: t("greenSoap") },
    { src: "/numbing-bg.jpg", desc: t("noPain") },
    { src: "/xterinumback3.jpg", desc: t("xteri") },
    { src: "/wicannback2.jpg", desc: t("wicann") },
    { src: "/greensoapback.jpg", desc: t("greenSoap") },
    { src: "/wicannback2.jpg", desc: t("wicann") },
    { src: "/greensoapback.jpg", desc: t("greenSoap") },
    { src: "/wicannback2.jpg", desc: t("wicann") },
    { src: "/greensoapback.jpg", desc: t("greenSoap") },
    // 👉 agrega más fotos aquí
  ];

  const maxVisible = 8; // 4 columnas × 2 filas
  const visiblePhotos = photos.slice(0, maxVisible - 1); // primeras 7
  const remaining =
    photos.length > maxVisible ? photos.length - (maxVisible - 1) : 0;

  const [current, setCurrent] = useState<number | null>(null);

  const next = () => setCurrent((prev) => (prev! + 1) % photos.length);
  const prev = () =>
    setCurrent((prev) => (prev! - 1 + photos.length) % photos.length);

  return (
    <>
      {/* Grid */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">{t("photosTitle")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {visiblePhotos.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => setCurrent(idx)}
              className="relative cursor-pointer overflow-hidden rounded-2xl border border-gray-700 hover:scale-105 transition-transform shadow-lg"
            >
              <Image
                src={photo.src}
                alt={photo.desc}
                width={600}
                height={900}
                className="object-cover w-full h-[500px] lg:h-[550px]"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition">
                <p className="text-white text-lg font-semibold">{photo.desc}</p>
              </div>
            </div>
          ))}

          {/* Bloque +X */}
          {remaining > 0 && (
            <div
              onClick={() => setCurrent(maxVisible - 1)}
              className="flex items-center justify-center bg-gray-800 rounded-2xl cursor-pointer hover:bg-gray-700 transition h-[500px] lg:h-[550px]"
            >
              <span className="text-3xl font-bold text-white">+{remaining}</span>
            </div>
          )}
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

            {/* Imagen + texto */}
            <div className="flex flex-col md:flex-row items-center gap-6 max-w-6xl p-4">
              <Image
                src={photos[current].src}
                alt={photos[current].desc}
                width={800}
                height={1000}
                className="rounded-lg object-cover max-h-[85vh]"
              />
              <div className="text-white max-w-sm">
                <h3 className="text-xl font-bold mb-4">
                  {photos[current].desc}
                </h3>
                <p className="text-gray-300">
                  Aquí puedes poner una breve descripción de la foto.
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
