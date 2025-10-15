// ===========================================================
// 🌐 src/components/LanguageSwitcher.tsx — versión estable y sincronizada (Next.js 15.5.4)
// ===========================================================
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = { small?: boolean };

export default function LanguageSwitcher({ small }: Props) {
  const router = useRouter();
  const pathnameFromHook = usePathname() || "/";
  const searchParams = useSearchParams();

  const query =
    searchParams && searchParams.toString() !== ""
      ? `?${searchParams.toString()}`
      : "";

  const [currentPath, setCurrentPath] = useState(pathnameFromHook);

  // ✅ Se sincroniza solo en cliente (previene diferencia SSR/CSR)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  // 🔗 Construcción dinámica del path con idioma
  const buildPathWithLang = (lang: string) => {
    if (/^\/(es|en)(\/|$)/.test(currentPath)) {
      return currentPath.replace(/^\/(es|en)/, `/${lang}`) + query;
    }
    return (
      (currentPath === "/" ? `/${lang}` : `/${lang}${currentPath}`) + query
    );
  };

  // 🔄 Cambio de idioma controlado
  const changeLanguage = (
    lang: string,
    e?: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    e?.preventDefault();
    const dest = buildPathWithLang(lang);
    try {
      router.replace(dest);
    } catch {
      window.location.assign(dest);
    }
  };

  // 🧭 Determina idioma activo
  const active = (lang: string) =>
    /^\/(es|en)(\/|$)/.test(currentPath)
      ? currentPath.split("/")[1] === lang
      : false;

  const baseClasses = `rounded font-bold transition ${
    small ? "px-2 py-1 text-xs" : "px-3 py-2 text-sm"
  }`;

  // ===========================================================
  // 🏁 Render
  // ===========================================================
  return (
    <div
      className={`flex justify-center items-center space-x-3 ${
        small ? "text-xs" : "text-sm"
      }`}
      suppressHydrationWarning
    >
      {[
        { code: "es", alt: "Español", flag: "/flags/spain.png" },
        { code: "en", alt: "English", flag: "/flags/usa.png" },
      ].map(({ code, alt, flag }) => (
        <a
          key={code}
          href={buildPathWithLang(code)}
          aria-current={active(code) ? "page" : undefined}
          aria-label={alt}
          onClick={(e) => changeLanguage(code, e)}
          className={`${baseClasses} inline-flex items-center gap-1 text-center ${
            active(code)
              ? "bg-pink-600 text-white"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          <Image
            src={flag}
            alt={alt}
            width={18}
            height={18}
            style={{ height: "auto" }} // ✅ evita el warning de proporción
            loading="lazy"
          />
          {code.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
