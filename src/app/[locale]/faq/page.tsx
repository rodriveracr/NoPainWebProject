"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

function FAQContent() {
  const searchParams = useSearchParams();
  const section = searchParams.get("section") || "general";

  return (
    <main className="relative text-white font-franklin min-h-screen">
      <div className="absolute inset-0 bg-black/80" aria-hidden="true" />
      <div className="relative z-10 py-24 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">FAQ - No Pain</h1>
        <p className="text-gray-300 mb-4">
          Sección actual: <span className="text-pink-500">{section}</span>
        </p>
        {/* aquí tu contenido real */}
      </div>
    </main>
  );
}

export default function FAQPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-gray-400 bg-black/85 min-h-[200px]">
          Loading FAQ...
        </div>
      }
    >
      <FAQContent />
    </Suspense>
  );
}
