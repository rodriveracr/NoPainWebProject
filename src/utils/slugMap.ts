// src/utils/slugMap.ts
export const slugMap = {
  noPainNumbingCream: {
    es: "crema-no-pain-numbing",
    en: "no-pain-numbing-cream",
  },
  xteriNumb: {
    es: "xteri-numb",
    en: "xteri-numb",
  },
  wicann: {
    es: "wicann",
    en: "wicann",
  },
  greenSoap: {
    es: "jabon-verde",
    en: "green-soap",
  },
  gallery: {
    es: "galeria",
    en: "gallery",
  },
  contact: {
    es: "contacto", // 🔹 corregido
    en: "contact",
  },
  faq: {
    es: "faq",
    en: "faq",
  },
  legal: {
    es: "legal",
    en: "legal",
  },
} as const;

export function getSlug(key: keyof typeof slugMap, locale: string) {
  // Si existe en el idioma, úsalo. Si no, fallback al inglés.
  return slugMap[key]?.[locale as "es" | "en"] ?? slugMap[key].en;
}
