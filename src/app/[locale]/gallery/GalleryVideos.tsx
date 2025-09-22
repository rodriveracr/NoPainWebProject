"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function GalleryVideos() {
  const t = useTranslations("Gallery");

  const videos = [
    { src: "/video2.mp4", desc: t("usage1") },
    { src: "/video6.mp4", desc: t("usage2") },
    { src: "/video2.mp4", desc: t("usage1") },
    { src: "/video6.mp4", desc: t("usage2") },
    { src: "/video2.mp4", desc: t("usage1") },
    { src: "/video6.mp4", desc: t("usage2") },
    { src: "/video2.mp4", desc: t("usage1") },
    { src: "/video6.mp4", desc: t("usage2") },
    { src: "/video2.mp4", desc: t("usage1") },
    // 👉 agrega más videos aquí
  ];

  const maxVisible = 8; // ✅ 4 columnas × 2 filas
  const visibleVideos = videos.slice(0, maxVisible - 1); // primeras 7
  const remaining =
    videos.length > maxVisible ? videos.length - (maxVisible - 1) : 0;

  const [current, setCurrent] = useState<number | null>(null);

  const next = () => setCurrent((prev) => (prev! + 1) % videos.length);
  const prev = () =>
    setCurrent((prev) => (prev! - 1 + videos.length) % videos.length);

  return (
    <>
      {/* Grid */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">{t("videosTitle")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {visibleVideos.map((video, idx) => (
            <div
              key={idx}
              onClick={() => setCurrent(idx)}
              className="relative cursor-pointer overflow-hidden rounded-2xl border border-gray-700 hover:scale-105 transition-transform shadow-lg"
            >
              <video
                src={video.src}
                muted
                loop
                autoPlay
                className="object-cover w-full h-[500px] lg:h-[550px] rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex items-center justify-center transition">
                <p className="text-white text-lg font-semibold">{video.desc}</p>
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

            {/* Video + texto */}
            <div className="flex flex-col md:flex-row items-center gap-6 max-w-6xl p-4">
              <video
                src={videos[current].src}
                controls
                autoPlay
                muted
                className="rounded-lg max-h-[85vh] w-auto"
              />
              <div className="text-white max-w-sm">
                <h3 className="text-xl font-bold mb-4">
                  {videos[current].desc}
                </h3>
                <p className="text-gray-300">
                  Aquí puedes poner una breve descripción del video.
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
