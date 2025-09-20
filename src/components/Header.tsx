"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("Navbar");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlaySound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <nav className="flex justify-between items-center px-4 py-4 border-b border-gray-700 fixed top-0 left-0 right-0 z-40 bg-black text-xs uppercase">
      {/* LINKS IZQUIERDA */}
      <div className="flex space-x-2 sm:space-x-6">
        <Link href={`/${locale}`} className="hover:text-gray-400">
          {t("home")}
        </Link>
        <Link href={`/${locale}#quienes-somos`} className="hover:text-gray-400">
          {t("about")}
        </Link>
        <Link href={`/${locale}#proveedores`} className="hover:text-gray-400">
          {t("suppliers")}
        </Link>
        <Link
          href={`/${locale}/no-pain-numbing-cream`}
          className="hover:text-gray-400"
        >
          {t("noPainNumbingCream")}
        </Link>
        <Link
          href={`/${locale}/xteri-numb`}
          className="hover:text-gray-400"
        >
          {t("xteriNumb")}
        </Link>
        <Link
          href={`/${locale}/wicann`}
          className="hover:text-gray-400"
        >
          {t("wicann")}
        </Link>
        <Link
          href={`/${locale}/green-soap`}
          className="hover:text-gray-400"
        >
          {t("greenSoap")}
        </Link>
      </div>

      {/* LOGO CENTRAL */}
      <div className="flex-shrink-0 mx-2">
        <Link href={`/${locale}`}>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            onMouseEnter={handlePlaySound}
            onClick={handlePlaySound}
          >
            <Image
              src="/Picture3.png"
              alt="Logo No Pain"
              width={100}
              height={100}
              className="drop-shadow-lg"
              priority
            />
          </motion.div>
        </Link>
        <audio ref={audioRef} src="/greesound.wav" preload="auto" />
      </div>

      {/* LINKS DERECHA + SWITCHER + BADGE */}
      <div className="flex items-center space-x-4 sm:space-x-6 mr-6">
        <Link
          href={`/${locale}/gallery`}
          className="hover:text-gray-400"
        >
          {t("gallery")}
        </Link>
        <Link
          href={`/${locale}/contact`}
          className="hover:text-gray-400"
        >
          {t("contact")}
        </Link>

        {/* Selector de idioma */}
        <LanguageSwitcher />

        {/* Badge Munumby */}
        <a
          href="https://monumby.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Verificado por Munumby"
          className="hover:opacity-80 transition"
        >
          <Image
            src="/badgeMuNumby.png"
            alt="Verificado por Munumby"
            width={100}
            height={100}
          />
        </a>
      </div>
    </nav>
  );
}
