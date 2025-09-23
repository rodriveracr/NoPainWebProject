"use client";

import { usePathname, useRouter } from "next/navigation";

type Props = {
  small?: boolean;
};

export default function LanguageSwitcher({ small }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (lang: string) => {
    if (!pathname) return;
    const segments = pathname.split("/");
    segments[1] = lang;
    router.push(segments.join("/"));
  };

  return (
    <div className={`flex justify-center space-x-2 ${small ? "text-xs" : "text-sm"}`}>
      <button
        onClick={() => changeLanguage("es")}
        className={`rounded font-bold transition ${
          small
            ? "px-2 py-1 text-xs"
            : "px-3 py-2 text-sm"
        } ${
          pathname?.startsWith("/es")
            ? "bg-pink-600 text-white"
            : "bg-gray-700 text-white"
        }`}
      >
        ES
      </button>
      <button
        onClick={() => changeLanguage("en")}
        className={`rounded font-bold transition ${
          small
            ? "px-2 py-1 text-xs"
            : "px-3 py-2 text-sm"
        } ${
          pathname?.startsWith("/en")
            ? "bg-pink-600 text-white"
            : "bg-gray-700 text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}
