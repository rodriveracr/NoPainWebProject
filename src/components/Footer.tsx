"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import NewsletterForm from "./NewsletterForm"; // asegúrate de tener este componente
import { getSlug, slugMap } from "@/utils/slugMap";

/**
 * ✅ FOOTER — Estructura completa y ordenada
 * - 3 columnas: Redes / Enlaces / Newsletter
 * - Compatible con next-intl, Tailwind y accesibilidad
 */
export default function Footer({ locale: localeProp }: { locale?: string }) {
  const fallbackLocale = useLocale();
  const locale = localeProp ?? fallbackLocale;
  const t = useTranslations("Footer");

  return (
    <footer
      role="contentinfo"
      className="bg-black text-gray-300 py-12 px-6 border-t border-[#222] font-franklin"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12">
        {/* 🐊 LOGO + REDES SOCIALES */}
        <div
          className="flex flex-col items-center sm:items-start space-y-4"
          aria-label={t("socialLabel") || "No Pain social media"}
        >
          <Image
            src="/No-PAIN.webp"
            alt="Logo No Pain"
            width={140}
            height={40}
            className="opacity-90 select-none"
            loading="lazy"
          />

          <div className="flex gap-4 mt-2">
            {[
              {
                href: "https://www.instagram.com/nopaingel",
                label: "Instagram",
                icon: "/icons/instagram.svg",
              },
              {
                href: "https://www.tiktok.com/@nopaingel",
                label: "TikTok",
                icon: "/icons/tiktok.svg",
              },
              {
                href: "mailto:customercare@nopainnumbing.net",
                label: "Email",
                icon: "/icons/email.webp",
              },
              {
                href: "https://wa.me/50683151806",
                label: "WhatsApp",
                icon: "/icons/whatsapp.svg",
              },
            ].map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500 rounded-full transition"
              >
                <Image
                  src={icon}
                  alt={label}
                  width={24}
                  height={24}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>

        {/* 🔗 ENLACES */}
        <nav aria-label="Enlaces del sitio" className="text-center sm:text-left">
          <h3 className="font-semibold text-lg mb-3 text-white">
            {t("linksTitle")}
          </h3>

          <ul className="space-y-2 text-sm">
            {(
              [
                { slug: "contact", label: t("contact") },
                { href: "#proveedores", label: t("suppliers") },
                { slug: "faq", label: t("faq") },
                { slug: "legal", label: t("legal") },
              ] as readonly (
                | { slug: keyof typeof slugMap; label: string }
                | { href: string; label: string }
              )[]
            ).map((item, i) => (
              <li key={i}>
                <Link
                  href={
                    "slug" in item
                      ? `/${locale}/${getSlug(item.slug, locale)}`
                      : `/${locale}${item.href}`
                  }
                  className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded-sm transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ✉️ NEWSLETTER */}
        <div className="text-center sm:text-left">
          <h3 className="font-semibold text-lg mb-3 text-white">
            {t("newsletterTitle")}
          </h3>
          <p className="text-gray-400 mb-4">{t("newsletterPlaceholder")}</p>
          <NewsletterForm locale={locale} />
        </div>
      </div>

      {/* ⚖️ COPYRIGHT + FIRMA */}
      <div className="mt-12 border-t border-[#222] pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
        <div className="text-center sm:text-left">
          &copy; {new Date().getFullYear()} No Pain. {t("rights")}
        </div>

        <div className="flex items-center space-x-2 text-xs mt-4 sm:mt-0">
          <a
            href="https://rodcr.carrd.co"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portfolio de Rodolfo VR"
            title="Portfolio de Rodolfo VR"
            className="flex items-center gap-1 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500 transition"
          >
            <span className="text-gray-400 text-xs">{t("madeWith")}</span>
            <Image
              src="/costa.svg"
              alt="Corazón Costa Rica"
              width={14}
              height={14}
              className="inline-block"
              loading="lazy"
            />
            <span className="text-gray-400 text-xs">{t("inCostaRica")}</span>
            <Image
              src="/riveras.webp"
              alt="Rivera's Industries Logo"
              width={50}
              height={50}
              className="ml-2 inline-block"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
