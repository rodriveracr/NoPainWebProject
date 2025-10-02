// src/components/LanguageSwitcher.tsx
"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = { small?: boolean };

export default function LanguageSwitcher({ small }: Props) {
  const router = useRouter();
  const pathnameFromHook = usePathname() || "/";
  const searchParams = useSearchParams();
  const query = searchParams && searchParams.toString() !== "" ? `?${searchParams.toString()}` : "";

  // Preferir window.location.pathname cuando esté disponible (más fiel a lo que ve el navegador)
  const getCurrentPath = () =>
    typeof window !== "undefined" ? window.location.pathname : pathnameFromHook;

  const buildPathWithLang = (lang: string) => {
    const current = getCurrentPath();
    // Reemplaza /es o /en al inicio, o añade /lang delante si no existe
    if (/^\/(es|en)(\/|$)/.test(current)) {
      return current.replace(/^\/(es|en)/, `/${lang}`) + query;
    }
    return (current === "/" ? `/${lang}` : `/${lang}${current}`) + query;
  };

  const changeLanguage = (lang: string, event?: React.MouseEvent<HTMLAnchorElement>) => {
    if (event) event.preventDefault(); // porque usamos <a>

    const dest = buildPathWithLang(lang);
    console.log("[LanguageSwitcher] click", { currentPath: getCurrentPath(), dest, lang });

    // actualizar <html lang> para accesibilidad inmediata
    try {
      if (typeof document !== "undefined") document.documentElement.lang = lang;
    } catch {}

    // Intentar navegación SPA
    try {
      router.replace(dest);
    } catch (e) {
      console.warn("[LanguageSwitcher] router.replace failed:", e);
      // fallback a navegación completa
      window.location.assign(dest);
      return;
    }

    // Fallback forzado si SPA no aplica (ej. router bloqueado)
    const fallback = setTimeout(() => {
      if (typeof window !== "undefined" && window.location.pathname !== dest.split("?")[0]) {
        console.warn("[LanguageSwitcher] SPA navigation didn't change location — forcing full reload to:", dest);
        window.location.assign(dest);
      }
    }, 300);

    // si hay un popstate que indica navegación, limpiar timeout
    const onPop = () => {
      clearTimeout(fallback);
      window.removeEventListener("popstate", onPop);
    };
    window.addEventListener("popstate", onPop);
  };

  const current = getCurrentPath();
  const active = (lang: string) => /^\/(es|en)(\/|$)/.test(current) ? current.split("/")[1] === lang : false;

  const baseClasses = `rounded font-bold transition ${small ? "px-2 py-1 text-xs" : "px-3 py-2 text-sm"}`;

  const destEs = buildPathWithLang("es");
  const destEn = buildPathWithLang("en");

  return (
    <div className={`flex justify-center space-x-2 ${small ? "text-xs" : "text-sm"}`}>
      {active("es") ? (
        <a
          href={destEs}
          aria-current="page"
          aria-label="Página en español (actual)"
          onClick={(e) => changeLanguage("es", e)}
          className={`${baseClasses} bg-pink-600 text-white inline-block text-center`}
        >
          ES
        </a>
      ) : (
        <a
          href={destEs}
          aria-label="Cambiar a español"
          onClick={(e) => changeLanguage("es", e)}
          className={`${baseClasses} bg-gray-700 text-white inline-block text-center`}
        >
          ES
        </a>
      )}

      {active("en") ? (
        <a
          href={destEn}
          aria-current="page"
          aria-label="Current page in English"
          onClick={(e) => changeLanguage("en", e)}
          className={`${baseClasses} bg-pink-600 text-white inline-block text-center`}
        >
          EN
        </a>
      ) : (
        <a
          href={destEn}
          aria-label="Switch to English"
          onClick={(e) => changeLanguage("en", e)}
          className={`${baseClasses} bg-gray-700 text-white inline-block text-center`}
        >
          EN
        </a>
      )}
    </div>
  );
}
