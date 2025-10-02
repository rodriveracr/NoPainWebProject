// src/app/[locale]/gallery/GalleryVideos.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function GalleryVideos() {
  const t = useTranslations("Gallery");

  // helper seguro: intenta traducir y si falla devuelve fallback
  const safeT = (key: string, fallback: string) => {
    try {
      const res = t(key as any);
      return typeof res === "string" && res !== key ? res : fallback;
    } catch {
      return fallback;
    }
  };

  const videos = [
    {
      sources: [
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758591188/video8_mmv8lu.webm",
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758590813/video8_lblkzn.mp4",
      ],
      desc: t("usage1"),
    },
    {
      sources: [
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758591194/video9_mmd6uq.webm",
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758590815/video9_o2dyim.mp4",
      ],
      desc: t("usage2"),
    },
    {
      sources: [
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758591189/video6_pmlgvj.webm",
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758590812/video6_odecam.mp4",
      ],
      desc: t("usage1"),
    },
    {
      sources: [
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758591207/video4_rvedvq.webm",
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758590819/video4_n8d3ad.mp4",
      ],
      desc: t("usage2"),
    },
    {
      sources: [
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758591187/video5_kfeaxg.webm",
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758590811/video5_rxowee.mp4",
      ],
      desc: t("usage1"),
    },
    {
      sources: [
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758591187/video7_tbyozu.webm",
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758590812/video7_kqrijw.mp4",
      ],
      desc: t("usage2"),
    },
    // resto (no overlay/longDesc obligatorio)
    {
      sources: [
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758591194/video10_bvqxrv.webm",
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758590825/video10_ulyyst.mp4",
      ],
      desc: t("usage2"),
    },
    {
      sources: [
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758591194/video9_mmd6uq.webm",
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758590815/video9_o2dyim.mp4",
      ],
      desc: t("usage1"),
    },
    {
      sources: [
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758591194/video10_bvqxrv.webm",
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758590825/video10_ulyyst.mp4",
      ],
      desc: t("usage2"),
    },
  ];

  const maxVisible = 8;
  const visibleVideos = videos.slice(0, maxVisible - 1);
  const remaining = videos.length > maxVisible ? videos.length - (maxVisible - 1) : 0;

  const [current, setCurrent] = useState<number | null>(null);

  const next = () =>
    setCurrent((prev) => (prev !== null ? (prev + 1) % videos.length : 0));
  const prev = () =>
    setCurrent((prev) =>
      prev !== null ? (prev - 1 + videos.length) % videos.length : videos.length - 1
    );

  return (
    <>
      {/* Grid */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">{t("videosTitle")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {visibleVideos.map((video, idx) => {
            // overlay y longDesc para los primeros 7: claves: Gallery.video{n}.overlay / .longDesc
            const overlay = safeT(`video${idx + 1}.overlay`, "");
            return (
              <div
                key={idx}
                onClick={() => setCurrent(idx)}
                className="relative cursor-pointer overflow-hidden rounded-2xl border border-gray-700 hover:scale-105 transition-transform shadow-lg"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="object-cover w-full h-[500px] lg:h-[550px] rounded-lg"
                >
                  {video.sources.map((src, i) => (
                    <source
                      key={i}
                      src={src}
                      type={src.endsWith(".webm") ? "video/webm" : "video/mp4"}
                    />
                  ))}
                  {t("videoNotSupported")}
                </video>
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex items-center justify-center transition">
                  {/* muestra overlay (si existe) o fallback video.desc */}
                  <p className="text-white text-lg font-semibold">{overlay || video.desc}</p>
                </div>
              </div>
            );
          })}

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
            <button
              onClick={() => setCurrent(null)}
              title="Close"
              className="absolute top-6 right-6 text-white text-3xl"
            >
              <X size={32} />
            </button>
            <button
              onClick={prev}
              title="Previous"
              className="absolute left-6 text-white text-4xl"
            >
              <ChevronLeft size={40} />
            </button>

            {/* Video con marco uniforme */}
            <div className="flex flex-col md:flex-row items-center gap-6 max-w-6xl p-4">
              <div className="bg-black rounded-lg flex items-center justify-center w-[1280px] h-[720px]">
                <video
                  key={current} // 🔑 fuerza actualización al cambiar
                  controls
                  autoPlay
                  muted
                  playsInline
                  className="max-w-full max-h-full object-contain rounded-lg"
                >
                  {videos[current].sources.map((src, i) => (
                    <source
                      key={i}
                      src={src}
                      type={src.endsWith(".webm") ? "video/webm" : "video/mp4"}
                    />
                  ))}
                  {t("videoNotSupported")}
                </video>
              </div>
              <div className="text-white max-w-sm">
                {/* título: usa overlay si existe, sino desc */}
                <h3 className="text-xl font-bold mb-4">
                  {safeT(`video${current + 1}.overlay`, videos[current].desc)}
                </h3>

                {/* descripción larga sólo si existe la clave */}
                <p className="text-gray-300">
                  {safeT(`video${current + 1}.longDesc`, "Aquí puedes poner una breve descripción del video.")}
                </p>
              </div>
            </div>

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
