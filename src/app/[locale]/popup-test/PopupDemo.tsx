"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { useTranslations } from "next-intl";

type Props = { locale: string };
type Slide = {
  img: string;
  title: string;
  desc: string;
  link: string;
  secondaryLink?: string;
  primaryCtaKey?: string;
  secondaryCtaKey?: string;
};

export default function PopupDemo({ locale }: Props) {
  const t = useTranslations("popup");
  const [isOpen, setIsOpen] = useState(true);
  const [current, setCurrent] = useState(0);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const slides: Slide[] = useMemo(
    () => [
      {
        img: "/Green-Soap-1.jpg",
        title: t("greenSoapTitle", { default: "Green Soap – Pro cleaning" }),
        desc: t("greenSoapDesc", {
          default: "Gentle soap for tattoos & PMU. Cleans without irritation.",
        }),
        link: `/${locale}/green-soap`,
      },
      {
        img: "/monumby.gif",
        title: t("monumbyTeaserTitle", { default: "Monumby · No Pain" }),
        desc:
          Math.random() > 0.5
            ? t("monumbyTeaserDesc", { default: "Coming soon. Premium professional care." })
            : t("monumbyTeaserDescAlt", {
                default: "Coming soon. Research, precision, results.",
              }),
        link: `/${locale}/monumby`,
        secondaryLink: "/#newsletter",
        primaryCtaKey: "ctaPrimary",
        secondaryCtaKey: "ctaSecondary",
      },
    ],
    [locale, t]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", onKey);
    setTimeout(() => {
      modalRef.current?.querySelector<HTMLButtonElement>("button[data-close]")?.focus();
    }, 30);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    const { body } = document;
    if (isOpen) {
      const prev = body.style.overflow;
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  const next = () => setCurrent((p) => (p + 1) % slides.length);
  const prev = () => setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));
  const goTo = (i: number) => setCurrent(i);

  const slide = slides[current];

  return (
    <>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition"
        >
          Abrir popup
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 transition"
        >
          Cerrar popup
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: easeOut }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="popup-title"
              aria-describedby="popup-desc"
              className="relative w-[92vw] max-w-[640px] rounded-2xl shadow-2xl overflow-hidden bg-neutral-900 text-white border border-neutral-800 md:w-[88vw]"
            >
              <button
                type="button"
                data-close
                onClick={() => setIsOpen(false)}
                aria-label="Close popup"
                title="Close"
                className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <X size={20} />
              </button>

              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-black">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 640px) 92vw, 640px"
                  className="object-cover"
                  priority
                  unoptimized={slide.img.endsWith('.gif')}
                />
                <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
                  {slides.map((_, i) => (
                    <button
                      type="button"
                      key={`slide-indicator-${i}`}
                      onClick={() => goTo(i)}
                      aria-label={`Ir al slide ${i + 1}`}
                      aria-current={i === current ? "true" : "false"}
                      className={`h-2 rounded-full transition-all ${
                        i === current ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
                <div className="hidden sm:flex absolute inset-y-0 left-0 items-center pl-2">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Anterior"
                    className="p-2 rounded-full bg-black/40 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    ◀
                  </button>
                </div>
                <div className="hidden sm:flex absolute inset-y-0 right-0 items-center pr-2">
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Siguiente"
                    className="p-2 rounded-full bg-black/40 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    ▶
                  </button>
                </div>
              </div>

              <div className="px-5 pt-5 pb-4 sm:px-6 sm:pt-6 sm:pb-6">
                <h2 id="popup-title" className="text-xl sm:text-2xl font-semibold uppercase tracking-wide">
                  {slide.title}
                </h2>
                <p id="popup-desc" className="mt-2 text-sm sm:text-base text-neutral-200">
                  {slide.desc}
                </p>

                {slide.primaryCtaKey ? (
                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <a
                      href={slide.link}
                      className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium hover:opacity-90 transition"
                    >
                      {t(slide.primaryCtaKey, { default: "Learn more" })}
                    </a>
                    {slide.secondaryLink && slide.secondaryCtaKey && (
                      <a
                        href={slide.secondaryLink}
                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-neutral-800 text-white font-medium hover:bg-neutral-700 transition border border-neutral-700"
                      >
                        {t(slide.secondaryCtaKey, { default: "Get updates" })}
                      </a>
                    )}
                  </div>
                ) : (
                  <a
                    href={slide.link}
                    className="mt-4 inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium hover:opacity-90 transition"
                  >
                    {t("cta", { default: "See more" })}
                  </a>
                )}

                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-[11px] sm:text-xs text-neutral-400">
                    {t("disclaimer", { default: "You can dismiss this message anytime." })}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}