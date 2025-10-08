"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("Navbar");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 🔸 Detectar scroll para solidificar el fondo
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 🔸 Cerrar menú con ESC
  useEffect(() => {
    if (!menuOpen) return;
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [menuOpen]);

  // 🔸 Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handlePlaySound = useCallback(() => {
    audioRef.current?.play().catch(() => {});
  }, []);

  const handleLinkClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  // 🔸 useMemo para evitar recrear arrays en cada render
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
    [locale, t]
  );

  const rightLinks = useMemo(
    () => [
      { href: `/${locale}/gallery`, label: t("gallery") },
      { href: `/${locale}/contact`, label: t("contact") },
    ],
    [locale, t]
  );

  const allLinks = useMemo(() => [...leftLinks, ...rightLinks], [leftLinks, rightLinks]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-700 backdrop-blur-sm font-franklin transition-colors duration-300 ${
        scrolled ? "bg-black/95 shadow-md" : "bg-black/80"
      }`}
    >
      {/* NAV PRINCIPAL */}
      <nav
        className="flex items-center justify-between px-6 py-2 relative"
        role="navigation"
        aria-label="Navegación principal"
      >
        {/* BOTÓN HAMBURGUESA (Mobile) */}
        <button
          type="button"
          className="md:hidden text-white absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen ? "true" : "false"}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* LINKS IZQUIERDA (Desktop) */}
        <div className="hidden md:flex space-x-6 text-xs uppercase">
          {leftLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white hover:text-gray-400 transition-colors focus:outline-none focus:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* LOGO CENTRAL */}
        <div className="mx-auto relative">
          <Link
            href={`/${locale}`}
            aria-label="Ir al inicio No Pain"
            className="inline-block focus:outline-none focus:ring-2 focus:ring-white/30 rounded-full"
          >
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
                priority
              />
            </motion.div>
          </Link>
          <audio ref={audioRef} src="/greesound.wav" preload="auto" aria-hidden="true" />
        </div>

        {/* LINKS DERECHA (Desktop) */}
        <div className="hidden md:flex items-center space-x-5 text-xs uppercase">
          {rightLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white hover:text-gray-400 transition-colors focus:outline-none focus:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* IDIOMA (Desktop) */}
      <div className="hidden md:flex justify-center py-0 bg-black">
        <LanguageSwitcher small />
      </div>

      {/* MENÚ MOBILE con AnimatePresence */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-black border-t border-gray-700 overflow-hidden"
            role="menu"
            aria-label="Menú de navegación móvil"
          >
            <div className="flex flex-col space-y-4 px-10 py-6 text-sm uppercase">
              {allLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  role="menuitem"
                  className="text-white hover:text-gray-400 transition-colors focus:outline-none focus:underline"
                  onClick={handleLinkClick}
                >
                  {link.label}
                </Link>
              ))}

              {/* Idiomas en mobile */}
              <div className="flex flex-col items-center pt-4 border-t border-gray-700 space-y-3">
                <LanguageSwitcher small />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🟣 Nuevo Monumby Badge — animado y flotante */}
      <div className="fixed top-24 right-6 z-[9999] pointer-events-auto animate-bounce-slow">
        <a
          href="https://monumbycom.godaddysites.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Verificado por Monumby"
          className="block hover:scale-110 transition-transform duration-300"
        >
          <Image
  src="/sailedited.png"
  alt="Sello de verificación Monumby"
  width={90}
  height={90}
  className="drop-shadow-2xl rotate-6 mt-2 translate-y-[-20px]"
  priority
/>

        </a>
      </div>
    </header>
  );
}
