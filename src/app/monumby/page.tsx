"use client";

import Image from "next/image";

export default function MunumbyPage() {
  return (
    <div className="relative min-h-screen p-8 bg-black text-white">
      <h1 className="text-2xl font-bold">Munumby</h1>
      <p>Sección dedicada a Munumby.</p>

      {/* Badge flotante (ahora sí fuera del header) */}
      <a
        href="https://monumby.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Verificado por Munumby"
        className="fixed top-4 right-4 z-50 hover:opacity-80 transition"
      >
        <Image
          src="/badgeMuNumby.png"
          alt="Verificado por Munumby"
          width={70}
          height={70}
        />
      </a>
    </div>
  );
}
