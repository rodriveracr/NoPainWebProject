//src/app/[locale]/gallery/GalleryVideos.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function GalleryVideos() {
  const t = useTranslations("Gallery");

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
      desc: t("video1.overlay"),
    },
    {
      sources: [
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758591194/video9_mmd6uq.webm",
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758590815/video9_o2dyim.mp4",
      ],
      desc: t("video2.overlay"),
    },
    {
      sources: [
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758591189/video6_pmlgvj.webm",
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758590812/video6_odecam.mp4",
      ],
      desc: t("video3.overlay"),
    },
    {
      sources: [
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758591207/video4_rvedvq.webm",
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758590819/video4_n8d3ad.mp4",
      ],
      desc: t("video4.overlay"),
    },
    {
      sources: [
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758591187/video5_kfeaxg.webm",
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758590811/video5_rxowee.mp4",
      ],
      desc: t("video5.overlay"),
    },
    {
      sources: [
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758591187/video7_tbyozu.webm",
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758590812/video7_kqrijw.mp4",
      ],
      desc: t("video6.overlay"),
    },
    {
      sources: [
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758591194/video10_bvqxrv.webm",
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758590825/video10_ulyyst.mp4",
      ],
      desc: t("video7.overlay"),
    },
    {
      sources: [
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1759418641/wicannx_miwtnu.webm",
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1759418642/wicannx_mawau8.mp4",
      ],
      desc: t("video8.overlay"),
    },
  ];

  const [current, setCurrent] = useState<number | null>(null);

  const next = () =>
    setCurrent((prev) => (prev !== null ? (prev + 1) % videos.length : 0));
  const prev = () =>
    setCurrent((prev) =>
      prev !== null
        ? (prev - 1 + videos.length) % videos.length
        : videos.length - 1
    );

  return (
    <>
      {/* Galería de videos */}
      <section className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-2xl font-bold mb-8">{t("videosTitle")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {videos.map((video, idx) => {
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
                </video>
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition">
                  <p className="text-white text-lg font-semibold">
                    {overlay || video.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Modal de video */}
      <AnimatePresence>
        {current !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[99999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCurrent(null)}
          >
            <div
              className="relative flex flex-col md:flex-row items-center gap-6 max-w-6xl w-[92vw] p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón cerrar */}
              <button
                onClick={() => setCurrent(null)}
                title="Close"
                className="absolute top-4 right-4 z-[10000] text-white bg-black/70 hover:bg-black/90 p-2 rounded-full transition"
              >
                <X size={26} />
              </button>

              {/* Botón anterior */}
              <button
                onClick={prev}
                title="Previous"
                className="absolute left-3 md:left-6 text-white text-4xl z-[10000] hover:opacity-80"
              >
                <ChevronLeft size={36} />
              </button>

              {/* Video principal */}
              <div className="bg-black rounded-lg flex items-center justify-center w-[90vw] max-w-[1280px] h-[60vh] md:h-[720px] shadow-2xl">
                <video
                  key={current}
                  controls
                  autoPlay
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
                </video>
              </div>

              {/* Descripción */}
              <div className="text-white max-w-sm mt-6 md:mt-0 px-2 md:px-0">
                <h3 className="text-xl font-bold mb-3">
                  {safeT(`video${current + 1}.overlay`, videos[current].desc)}
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  {safeT(
                    `video${current + 1}.longDesc`,
                    "Aquí puedes poner una breve descripción del video."
                  )}
                </p>
              </div>

              {/* Botón siguiente */}
              <button
                onClick={next}
                title="Next"
                className="absolute right-3 md:right-6 text-white text-4xl z-[10000] hover:opacity-80"
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
