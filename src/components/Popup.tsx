// src/components/Popup.tsx
"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export default function Popup({ locale }: { locale: string }) {
  const t = useTranslations("popup");
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { img: "/Green-Soap-1.jpg", title: t("greenSoapTitle"), desc: t("greenSoapDesc"), link: `/${locale}/green-soap` },
    { img: "/Monumby-1.jpg", title: t("monumbyTitle"), desc: t("monumbyDesc"), link: `/${locale}/monumby` },
  ];

  useEffect(() => {
    // Verificar entorno cliente
    if (typeof window === "undefined") return;

    const closed = sessionStorage.getItem(`popupClosed-${locale}`);
    const isDev = process.env.NODE_ENV === "development";

    if (isDev) {
      // en desarrollo mostrar siempre
      setIsOpen(true);
      return;
    }

    if (!closed) {
      setIsOpen(true);
    }
  }, [locale]);

  const closePopup = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(`popupClosed-${locale}`, "true");
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative bg-white text-black rounded-2xl shadow-2xl max-w-lg w-full p-6"
      >
        <button onClick={closePopup} aria-label="Close popup" title="Close popup" className="absolute top-3 right-3 text-gray-600 hover:text-black">
          <X size={24} />
        </button>
        <div className="flex justify-center mb-4">
          <Image src="/logo-nopain.png" alt="No Pain Logo" width={120} height={60} />
        </div>
        <div className="relative text-center">
          <Image
            src={slides[currentSlide].img}
            alt={slides[currentSlide].title}
            width={400}
            height={300}
            className="mx-auto rounded-xl shadow-md"
          />
          <h2 className="text-xl font-bold mt-4">{slides[currentSlide].title}</h2>
          <p className="text-gray-700 text-sm mt-2">{slides[currentSlide].desc}</p>
          <a
            href={slides[currentSlide].link}
            className="mt-4 inline-block px-5 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-medium hover:opacity-90 transition"
          >
            {t("cta")}
          </a>
          <div className="flex justify-between mt-4">
            <button onClick={prevSlide} className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300">◀</button>
            <button onClick={nextSlide} className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300">▶</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
