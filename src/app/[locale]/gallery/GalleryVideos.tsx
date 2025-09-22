"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function GalleryVideos() {
  const t = useTranslations("Gallery");

  // ✅ Videos de Cloudinary (solo válidos, sin duplicados)
  const videos = [
    {
      sources: [
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758575932/video10_scucel.webm",
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758575946/video10_ytjveg.mp4",
      ],
      desc: t("usage1"),
    },
    {
      sources: [
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758575925/video6_nrrxvf.webm",
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758575924/video6_tm6zvu.mp4",
      ],
      desc: t("usage2"),
    },
    {
      sources: [
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758575938/video2_e3y1ve.mp4",
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758575924/video2_hqa5wk.webm",
      ],
      desc: t("usage1"),
    },
    {
      sources: [
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758575923/video7_do4jtr.webm",
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758575922/video7_gb7ngw.mp4",
      ],
      desc: t("usage2"),
    },
    {
      sources: [
        "https://res.cloudinary.com/dw31xhowm/video/upload/v1758575926/video8_pmtnmy.webm",
      ],
      desc: t("usage1"),
    },
  ];

  const maxVisible = 4;
  const visibleVideos = videos.slice(0, maxVisible);
  const remaining = videos.length > maxVisible ? videos.length - maxVisible : 0;

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
                <p className="text-white text-lg font-semibold">{video.desc}</p>
              </div>
            </div>
          ))}

          {remaining > 0 && (
            <div
              onClick={() => setCurrent(maxVisible)}
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

            <div className="flex flex-col md:flex-row items-center gap-6 max-w-6xl p-4">
              <video
                controls
                autoPlay
                muted
                playsInline
                className="rounded-lg max-h-[85vh] w-auto"
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
              <div className="text-white max-w-sm">
                <h3 className="text-xl font-bold mb-4">
                  {videos[current].desc}
                </h3>
                <p className="text-gray-300">
                  Aquí puedes poner una breve descripción del video.
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
