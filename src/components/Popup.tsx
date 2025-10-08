//src/components/Popup.tsx
"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";


const STORAGE_KEYS = {
  sessionClosed: (loc: string) => `popupClosed-${loc}`,
  seenAt: (loc: string) => `popupSeenAt-${loc}`,
  snoozeUntil: (loc: string) => `popupSnoozeUntil-${loc}`,
} as const;

const DELAY_MS = Number(process.env.NEXT_PUBLIC_POPUP_DELAY_MS ?? 1200);
const COOLDOWN_DAYS = Number(process.env.NEXT_PUBLIC_POPUP_COOLDOWN_DAYS ?? 7);

type Slide = {
  key: "green-soap" | "monumby";
  image: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  sub?: string;
};

export default function Popup({ locale = "es" }: { locale?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [current, setCurrent] = useState(0);

  const qs =
    typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const debugAlways = qs?.get("debugPopup") === "1";
  const resetFlag = qs?.get("resetPopup") === "1";

  const slides: Slide[] = useMemo(() => {
    const t = (es: string, en: string) => (locale === "en" ? en : es);

    return [
      {
        key: "green-soap",
        image: "/greensoap.gif",
        title: "GREEN SOAP PREMIUM",
        body: t(
          "Jabón vegetal artesanal ideal para estudios, piercings y cuidado posterior. Limpia, calma e hidrata sin afectar la tinta ni la piel.",
          "Handcrafted plant-based soap ideal for studios, piercings, and aftercare. Cleans, soothes, and hydrates without affecting ink or skin."
        ),
        cta: t("Ver más", "See details"),
        href: `/${locale}/green-soap`,
        sub: t("Disponible para distribuidores.", "Available for distributors."),
      },
      {
        key: "monumby",
        image: "/monumby.gif",
        title: "MONUMBY EXPERIENCE",
        body: t(
          "La nueva línea profesional de anestesia y productos certificados para artistas. Una experiencia diseñada para precisión, confianza y resultados premium.",
          "The new professional line of certified anesthesia and care products for artists. An experience built for precision, trust, and premium results."
        ),
        cta: t("Conoce más", "Learn more"),
        href: `/${locale}/monumby`,
        sub: t("Próximamente disponible.", "Coming soon."),
      },
    ];
  }, [locale]);

  const close = useCallback(() => {
    setIsOpen(false);
    if (!debugAlways && typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEYS.sessionClosed(locale), "true");
    }
  }, [debugAlways, locale]);

  const snooze24h = useCallback(() => {
    setIsOpen(false);
    if (!debugAlways && typeof window !== "undefined") {
      const until = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEYS.snoozeUntil(locale), String(until));
      sessionStorage.setItem(STORAGE_KEYS.sessionClosed(locale), "true");
    }
  }, [debugAlways, locale]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (resetFlag) {
      ["es", "en"].forEach((loc) => {
        localStorage.removeItem(STORAGE_KEYS.seenAt(loc));
        localStorage.removeItem(STORAGE_KEYS.snoozeUntil(loc));
        sessionStorage.removeItem(STORAGE_KEYS.sessionClosed(loc));
      });
    }

    if (debugAlways) {
      sessionStorage.removeItem(STORAGE_KEYS.sessionClosed(locale));
      localStorage.removeItem(STORAGE_KEYS.snoozeUntil(locale));
      setHasTriggered(true);
      setIsOpen(true);
      return;
    }

    if (process.env.NEXT_PUBLIC_POPUP !== "on") return;
    if (hasTriggered) return;

    const now = Date.now();
    const seenAt = Number(localStorage.getItem(STORAGE_KEYS.seenAt(locale)) || 0);
    const snoozeUntil = Number(localStorage.getItem(STORAGE_KEYS.snoozeUntil(locale)) || 0);
    const cooldownMs = COOLDOWN_DAYS * 24 * 60 * 60 * 1000;

    if (sessionStorage.getItem(STORAGE_KEYS.sessionClosed(locale))) return;
    if (snoozeUntil && now < snoozeUntil) return;
    if (seenAt && now - seenAt < cooldownMs) return;

    const openOnce = () => {
      setHasTriggered(true);
      setIsOpen(true);
      localStorage.setItem(STORAGE_KEYS.seenAt(locale), String(Date.now()));
    };

    const timer = window.setTimeout(openOnce, DELAY_MS);
    return () => clearTimeout(timer);
  }, [locale, hasTriggered, debugAlways, resetFlag]);

  if (!isOpen) return null;
  const slide = slides[current];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="relative w-[90vw] max-w-[640px] max-h-[88vh] sm:max-h-[85vh] rounded-2xl bg-neutral-900 text-white border border-neutral-800 shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con logo */}
        <div className="relative border-b border-neutral-800 px-4 py-5 text-center bg-neutral-800/50">
          <Image
            src="/No-PAIN.webp"
            alt="No Pain"
            width={240}
            height={72}
            className="mx-auto h-12 sm:h-14 w-auto object-contain"
            priority
          />
          <div className="text-xs text-neutral-300 mt-1">
            {locale === "en" ? "Updates & products" : "Novedades y productos"}
          </div>
          <button
            onClick={close}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
            title="Close popup"
          >
            <X size={18} />
          </button>
          {/* Botones de idioma debajo del botón X */}
<div className="absolute top-14 right-3">
  <LanguageSwitcher small />
</div>

        </div>
        

        <div className="px-1 pt-1 pb-1">
          <h2 className="text-2xl sm:text-3xl font-black mb-4 text-center">
            {slide.title}
          </h2>

          {/* 🖼️ Imagen cuadrada reducida */}
          <div className="relative w-[85%] mx-auto aspect-square bg-black rounded-xl overflow-hidden mb-4 shadow-lg flex items-center justify-center">
            <Image
              src={slide.image}
              alt={slide.title}
              width={1080}
              height={1080}
              className="object-contain"
              unoptimized
            />
          </div>

          <p className="text-neutral-200 text-base mb-5 leading-relaxed text-center">
            {slide.body}
          </p>

          {/* Botones */}
          <div className="relative mt-3">
            <button
              onClick={snooze24h}
              className="absolute right-0 -top-1 text-[12px] px-3 py-1.5 rounded-md bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 transition"
            >
              {locale === "en" ? "Remind later" : "Recordar (24h)"}
            </button>

            <div className="flex justify-center">
              <a
                href={slide.href}
                className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-md hover:opacity-90 transition"
              >
                {slide.cta}
              </a>
            </div>
          </div>

          {slide.sub && (
            <p className="mt-3 text-xs text-neutral-400 text-center">{slide.sub}</p>
          )}

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2 pb-1">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-8 bg-white" : "w-3 bg-white/50 hover:bg-white/80"
                }`}
                title={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
