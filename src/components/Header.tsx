"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback, useMemo, Suspense } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

/**
 * ✅ HEADER — Estable y sincronizado con next-intl
 * - Corrige hydration y accesibilidad
 * - Usa useLocale() para detectar idioma actual
 */
export default function Header({ locale: localeProp }: { locale?: string }) {
  const currentLocale = useLocale();
  const locale = localeProp || currentLocale;
  const t = useTranslations("Navbar");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handlePlaySound = useCallback(() => {
    if (audioRef.current) audioRef.current.play().catch(() => {});
  }, []);

  const handleLinkClick = useCallback(() => setMenuOpen(false), []);

  const leftLinks = useMemo(
    () => [
      { href: `/${locale}`, label: t("home") },
      { href: `/${locale}#quienes-somos`, label: t("about") },
      { href: `/${locale}#proveedores`, label: t("suppliers") },
      { href: `/${locale}/no-pain-numbing-cream`, label: t("noPainNumbingCream") },
      { href: `/${locale}/xteri-numb`, label: t("xteriNumb") },
      { href: `/${locale}/wicann`, label: t("wicann") },
      { href: `/${locale}/green-soap`, label: t("greenSoap") },
      { href: `/${locale}/monumby`, label: t("monumby") },
    ],
    [locale, t],
  );

  const rightLinks = useMemo(
    () => [
      { href: `/${locale}/gallery`, label: t("gallery") },
      { href: `/${locale}/contact`, label: t("contact") },
    ],
    [locale, t],
  );

  const allLinks = useMemo(() => [...leftLinks, ...rightLinks], [leftLinks, rightLinks]);

  return (
    <header
      suppressHydrationWarning
      className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-700 backdrop-blur-sm font-franklin transition-colors duration-300 ${
        scrolled ? "bg-black/95 shadow-md" : "bg-black/80"
      }`}
    >
      <nav
        role="navigation"
        aria-label={t("home")}
        className="flex items-center justify-between px-6 py-2 relative"
        suppressHydrationWarning
      >
        {/* 🍔 Menú móvil */}
        <button
          type="button"
          className="md:hidden text-white absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* 🔗 Links izquierda */}
        <div className="hidden md:flex space-x-6 text-xs uppercase">
          {leftLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="text-white hover:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* 🐊 Logo */}
        <div className="mx-auto relative">
          <Link href={`/${locale}`} aria-label="Inicio No Pain">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              onMouseEnter={handlePlaySound}
              onClick={handlePlaySound}
            >
              <Image
                src="/COCODRILO.webp"
                alt="Logo No Pain - Cocodrilo"
                width={90}
                height={90}
                className="drop-shadow-lg select-none"
                loading="lazy"
                style={{ color: "transparent" }}
              />
            </motion.div>
          </Link>
          <audio ref={audioRef} src="/greesound.mp3" preload="none" aria-hidden="true" />
        </div>

        {/* 🔗 Links derecha */}
        <div className="hidden md:flex items-center space-x-5 text-xs uppercase">
          {rightLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="text-white hover:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* 🌐 Selector idioma (envuelto en Suspense) */}
      <div className="hidden md:flex justify-end pr-8 bg-black translate-y-[8px]" suppressHydrationWarning>
        <Suspense fallback={null}>
          <LanguageSwitcher small />
        </Suspense>
      </div>

      {/* 📱 Menú móvil */}
    {/* 📱 Menú móvil mejorado para pantallas pequeñas */}
<AnimatePresence>
  {menuOpen && (
    <motion.div
      id="mobile-menu"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "50vh" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25 }}
className="md:hidden bg-black border-t border-gray-700 overflow-y-auto max-h-[55vh] pb-10"
      suppressHydrationWarning
    >
      <div className="flex flex-col space-y-3 px-6 py-5 text-sm uppercase">
        {allLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={handleLinkClick}
            className="text-white hover:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded-sm text-center"
          >
            {link.label}
          </Link>
        ))}

        {/* 🌐 Selector de idioma — versión compacta */}
        <div className="flex flex-col items-center pt-4 border-t border-gray-700">
          <div className="scale-90 sm:scale-100">
            <Suspense fallback={null}>
              <LanguageSwitcher small />
            </Suspense>
          </div>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>


      {/* 🪶 Badge Monumby */}
      <div
        className="fixed top-[105px] left-6 z-[9999] pointer-events-auto animate-bounce-slow"
        suppressHydrationWarning
      >
        <a
          href="https://monumbycom.godaddysites.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Verificado por Monumby"
          className="block hover:scale-110 transition-transform duration-300"
        >
          <Image
            src="/sailedited.webp"
            alt="Sello de verificación Monumby"
            width={90}
            height={90}
            unoptimized
            className="drop-shadow-2xl rotate-6 mt-2 translate-y-[-20px]"
            loading="lazy"
            style={{ color: "transparent" }}
          />
        </a>
      </div>
    </header>
  );
}
