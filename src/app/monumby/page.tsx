"use client";

import Image from "next/image";
import { useRef } from "react";

export default function MunumbyPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlaySound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // reinicia desde el inicio
      audioRef.current.play().catch((err) => {
        console.warn("El navegador bloqueó la reproducción automática:", err);
      });
    }
  };

  return (
    <div className="relative min-h-screen p-8 bg-black text-white">
      <h1 className="text-2xl font-bold">Munumby</h1>
      <p>Sección dedicada a Munumby.</p>

      {/* Badge flotante con sonido */}
      <a
        href="https://monumby.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Verificado por Munumby"
        className="fixed top-4 right-4 z-50 hover:opacity-80 transition"
        onClick={handlePlaySound} // 🔊 100% funciona en click
        onMouseEnter={handlePlaySound} // 🔊 puede que algunos navegadores bloqueen
      >
        <Image
          src="/badgeMuNumby.png"
          alt="Verificado por Munumby"
          width={70}
          height={70}
        />
        <audio ref={audioRef} src="/witchnoise.wav" preload="auto" />
      </a>
    </div>
  );
}
