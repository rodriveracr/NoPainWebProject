"use client";

import { useState, useRef } from "react";
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
      sources: ["/videos/video8.webm", "/videos/video8.mp4"],
      desc: t("video1.overlay"),
    },
    {
      sources: ["/videos/video9.webm", "/videos/video9.mp4"],
      desc: t("video2.overlay"),
    },
    {
      sources: ["/videos/video6.webm", "/videos/video6.mp4"],
      desc: t("video3.overlay"),
    },
    {
      sources: ["/videos/video4.webm", "/videos/video4.mp4"],
      desc: t("video4.overlay"),
    },
    {
      sources: ["/videos/video5.webm", "/videos/video5.mp4"],
      desc: t("video5.overlay"),
    },
    {
      sources: ["/videos/video7.webm", "/videos/video7.mp4"],
      desc: t("video6.overlay"),
    },
    {
      sources: ["/videos/video10.webm", "/videos/video10.mp4"],
      desc: t("video7.overlay"),
    },
    {
      sources: ["/videos/wicannx.webm", "/videos/wicannx.mp4"],
      desc: t("video8.overlay"),
    },
  ];

  const [current, setCurrent] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const next = () =>
    setCurrent((prev) => (prev !== null ? (prev + 1) % videos.length : 0));

  const prev = () =>
    setCurrent((prev) =>
      prev !== null
        ? (prev - 1 + videos.length) % videos.length
        : videos.length - 1,
    );

  return (
    <>
      {/* 🎞️ Galería de videos */}
      <section className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-2xl font-bold mb-8">{t("videosTitle")}</h2>

        <div className="gallery-grid">
          {videos.map((video, idx) => {
            const overlay = safeT(`video${idx + 1}.overlay`, "");
            return (
              <div
                key={idx}
                onClick={() => setCurrent(idx)}
                className="gallery-item"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="object-cover w-full h-[40vh] lg:h-[55vh] rounded-lg"
                >
                  {video.sources.map((src, i) => (
                    <source
                      key={i}
                      src={src}
                      type={src.endsWith(".webm") ? "video/webm" : "video/mp4"}
                    />
                  ))}
                </video>

                <div className="gallery-overlay">
                  <p>{overlay || video.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 🎬 Modal tipo TikTok */}
      <AnimatePresence>
        {current !== null && (
          <motion.div
            className="modal-overlay gallery-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setCurrent(null)}
          >
            <div
              className="relative flex flex-col md:flex-row items-center justify-center gap-6 max-w-[1100px] w-[90vw] p-4 bg-black rounded-2xl shadow-2xl z-[10001] mt-16"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setCurrent(null)}
                title="Cerrar"
                className="absolute top-4 right-4 text-white bg-black/70 hover:bg-black/90 p-2 rounded-full transition-all z-[10002]"
              >
                <X size={28} />
              </button>

              <button
                onClick={prev}
                title="Anterior"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl bg-black/40 hover:bg-black/70 p-2 rounded-full transition z-[10002]"
              >
                <ChevronLeft size={36} />
              </button>

              <div className="flex items-center justify-center w-full max-w-[400px] md:max-w-[480px]">
                <video
                  ref={videoRef}
                  key={current}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  className="rounded-lg bg-black object-cover aspect-[9/16] w-full max-h-[85vh]"
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

              <div className="text-white md:max-w-[350px] mt-4 md:mt-0 overflow-y-auto max-h-[65vh] px-2 scrollbar-thin scrollbar-thumb-gray-700">
                <h3 className="text-xl font-bold mb-2">
                  {safeT(`video${current + 1}.overlay`, videos[current].desc)}
                </h3>
                <p className="text-white text-base leading-relaxed">
                  {safeT(
                    `video${current + 1}.longDesc`,
                    "Aquí puedes poner una breve descripción del video.",
                  )}
                </p>
              </div>

              <button
                onClick={next}
                title="Siguiente"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl bg-black/40 hover:bg-black/70 p-2 rounded-full transition z-[10002]"
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
