//src/components/Header.tsx
"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  Suspense,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ locale: localeProp }: { locale?: string }) {
  const currentLocale = useLocale();
  const locale = localeProp || currentLocale;
  const t = useTranslations("Navbar");

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll cuando menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
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
      {
        href: `/${locale}/no-pain-numbing-cream`,
        label: t("noPainNumbingCream"),
      },
      { href: `/${locale}/xteri-numb`, label: t("xteriNumb") },
    ],
    [locale, t]
  );

  const rightLinks = useMemo(
    () => [
      { href: `/${locale}/wicann`, label: t("wicann") },
      { href: `/${locale}/green-soap`, label: t("greenSoap") },
      { href: `/${locale}/monumby`, label: t("monumby") },
      { href: `/${locale}/gallery`, label: t("gallery") },
      { href: `/${locale}/contact`, label: t("contact") },
    ],
    [locale, t]
  );

  const allLinks = useMemo(
    () => [...leftLinks, ...rightLinks],
    [leftLinks, rightLinks]
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b border-gray-800/40 backdrop-blur-sm ${
        scrolled ? "bg-black/95 shadow-lg" : "bg-black/85"
      } header-font`}
    >
      <nav
        className={`
          relative flex w-full max-w-[1400px] mx-auto items-center justify-between
          px-6 sm:px-8 lg:px-14
          py-10 sm:py-12 xl:py-6
        `}
      >
        {/* 🍔 Botón móvil */}
        <button
          type="button"
          className="xl:hidden text-white absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

       {/* 🐊 Logo centrado en mobile y iPad */}
<div className="flex xl:hidden items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
  <Link href={`/${locale}`} onClick={handleLinkClick}>
    <Image
      src="/COCODRILO.webp"
      alt="Logo No Pain Cocodrilo"
      width={70}
      height={70}
      className="drop-shadow-lg select-none crocodile-parallax"
    />
  </Link>
</div>


        {/* 💻 Desktop */}
        <div className="hidden xl:flex items-center justify-between w-full text-white gap-12">
          {/* Links izquierda con separadores */}
          <div className="flex flex-0.5 items-center justify-start gap-8 text-[0.9rem] uppercase tracking-wider font-medium whitespace-nowrap">
            {leftLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={`hover:text-gray-400 transition-colors relative whitespace-nowrap ${
                  index < leftLinks.length - 1
                    ? "after:content-[''] after:absolute after:right-[-1rem] after:top-1/2 after:-translate-y-1/2 after:h-4 after:w-[1px] after:bg-white/20 after:backdrop-blur-sm"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* 🐊 Logo Cocodrilo */}
          <div className="flex-shrink-0 px-6">
            <Link href={`/${locale}`} onClick={handleLinkClick}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                onMouseEnter={handlePlaySound}
                onClick={handlePlaySound}
              >
                <Image
                  src="/COCODRILO.webp"
                  alt="Logo No Pain Cocodrilo"
                  width={78}
                  height={78}
                  className="w-12 sm:w-14 md:w-16 lg:w-20 xl:w-[78px] h-auto drop-shadow-lg select-none crocodile-glow"
                />
              </motion.div>
            </Link>
            <audio
              ref={audioRef}
              src="/greesound.mp3"
              preload="none"
              aria-hidden="true"
            />
          </div>

          {/* Links derecha con separadores */}
          <div className="flex flex-1 items-center justify-end gap-8 text-[0.9rem] uppercase tracking-wider font-medium whitespace-nowrap pr-4">
            {rightLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={`hover:text-gray-400 transition-colors relative whitespace-nowrap ${
                  index < rightLinks.length - 1
                    ? "after:content-[''] after:absolute after:right-[-1rem] after:top-1/2 after:-translate-y-1/2 after:h-4 after:w-[1px] after:bg-white/20 after:backdrop-blur-sm"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* 🌐 Selector idioma Desktop */}
      <div className="hidden xl:flex bg-black translate-y-[-10px]">
        <div className="w-full max-w-[1400px] mx-auto flex justify-end pr-12">
          <Suspense fallback={null}>
            <LanguageSwitcher small />
          </Suspense>
        </div>
      </div>

      {/* 📱 Menú móvil */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "75vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden bg-black border-t border-gray-700 overflow-y-auto pb-14 pt-10 header-font"
          >
            <div className="flex flex-col items-center justify-center space-y-5 px-6 text-base uppercase text-center tracking-wide">
              {allLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-white hover:text-gray-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-6 border-t border-gray-700">
                <Suspense fallback={null}>
                  <LanguageSwitcher small />
                </Suspense>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
