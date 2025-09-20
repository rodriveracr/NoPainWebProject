// src/components/LanguageSwitcher.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (locale: string) => {
    if (!pathname) return;
    const segments = pathname.split("/");
    segments[1] = locale; // cambia /es → /en
    router.push(segments.join("/"));
  };

  const current = pathname?.startsWith("/en") ? "en" : "es";

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => changeLanguage("es")}
        className={`px-3 py-1 rounded text-sm font-medium transition ${
          current === "es"
            ? "bg-pink-600 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        ES
      </button>
      <button
        onClick={() => changeLanguage("en")}
        className={`px-3 py-1 rounded text-sm font-medium transition ${
          current === "en"
            ? "bg-pink-600 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        EN
      </button>
    </div>
  );
}
