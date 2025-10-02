//src/components/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("Navbar");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePlaySound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const leftLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}#quienes-somos`, label: t("about") },
    { href: `/${locale}#proveedores`, label: t("suppliers") },
    { href: `/${locale}/no-pain-numbing-cream`, label: t("noPainNumbingCream") },
    { href: `/${locale}/xteri-numb`, label: t("xteriNumb") },
    { href: `/${locale}/wicann`, label: t("wicann") },
    { href: `/${locale}/green-soap`, label: t("greenSoap") },
    { href: `/${locale}/monumby`, label: t("monumby") } // ✅ Nuevo link Monumby
  ];

  const rightLinks = [
    { href: `/${locale}/gallery`, label: t("gallery") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black border-b border-gray-700 font-franklin">

      {/* NAV PRINCIPAL */}
      <nav className="flex items-center justify-between px-6 py-2 relative">
        {/* BOTÓN HAMBURGUESA (Mobile) */}
        <button
          className="md:hidden text-white absolute left-4 top-1/2 -translate-y-1/2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* LINKS IZQUIERDA (Desktop) */}
        <div className="hidden md:flex space-x-6 text-xs uppercase">
          {leftLinks.map((link, idx) => (
            <Link key={idx} href={link.href} className="hover:text-gray-400">
              {link.label}
            </Link>
          ))}
        </div>

        {/* LOGO CENTRAL */}
        <div className="mx-auto">
          <Link href={`/${locale}`}>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              onMouseEnter={handlePlaySound}
              onClick={handlePlaySound}
            >
              <Image
                src="/COCODRILO.png"
                alt="Logo No Pain"
                width={100}   // 🔽 Más pequeño que antes
                height={100}
                className="drop-shadow-lg"
                priority
              />
            </motion.div>
          </Link>
          <audio ref={audioRef} src="/greesound.wav" preload="auto" />
        </div>

        {/* LINKS DERECHA (Desktop) */}
        <div className="hidden md:flex items-center space-x-5 text-xs uppercase">
          {rightLinks.map((link, idx) => (
            <Link key={idx} href={link.href} className="hover:text-gray-400">
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* BOTONES DE IDIOMA DEBAJO DE LA LÍNEA GRIS, CENTRADOS */}
      <div className="hidden md:flex  justify-center py-0 bg-black">
        <LanguageSwitcher small />
      </div>

      {/* MENÚ MOBILE */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-gray-700 flex flex-col space-y-4 px-10 py-6 text-sm uppercase">
          {leftLinks.concat(rightLinks).map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="hover:text-gray-400"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Badge + Idiomas en mobile */}
          <div className="flex flex-col items-center pt-4 border-t border-gray-700 space-y-3">
            <a
              href="https://monumby.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Verificado por Monumby"
              className="hover:opacity-80 transition"
            >
              <Image
                src="/junto.png"
                alt="Verificado por Monumby"
                width={60}
                height={60}
              />
            </a>
            <LanguageSwitcher small />
          </div>
        </div>
      )}
    </header>
  );
}
