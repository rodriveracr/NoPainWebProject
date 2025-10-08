"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getSlug, slugMap } from "@/utils/slugMap";
import NewsletterForm from "./NewsletterForm";

export default function Footer({ locale = "es" }: { locale?: string }) {
  const t = useTranslations("Footer");

  return (
    <footer
      role="contentinfo"
      className="bg-black text-gray-300 py-12 px-6 border-t border-[#222] font-franklin"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12">
        {/* LOGO + REDES */}
        <div
          className="flex flex-col items-center sm:items-start space-y-4"
          aria-label="Redes sociales de No Pain"
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
            <a
              href="https://www.instagram.com/nopaingel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500 rounded-full transition"
            >
              <Image
                src="/icons/instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
                loading="lazy"
              />
            </a>

            <a
              href="https://www.tiktok.com/@nopaingel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500 rounded-full transition"
            >
              <Image
                src="/icons/tiktok.svg"
                alt="TikTok"
                width={24}
                height={24}
                loading="lazy"
              />
            </a>

            <a
              href="mailto:customercare@nopainnumbing.net"
              aria-label="Enviar correo electrónico"
              className="hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500 rounded-full transition"
            >
              <Image
                src="/icons/email.webp"
                alt="Correo electrónico"
                width={24}
                height={24}
                loading="lazy"
              />
            </a>

            <a
              href="https://wa.me/50683151806"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500 rounded-full transition"
            >
              <Image
                src="/icons/whatsapp.svg"
                alt="WhatsApp"
                width={24}
                height={24}
                loading="lazy"
              />
            </a>
          </div>
        </div>

        {/* ENLACES */}
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

        {/* NEWSLETTER */}
        <div className="text-center sm:text-left">
          <h3 className="font-semibold text-lg mb-3 text-white">
            {t("newsletterTitle")}
          </h3>
          <NewsletterForm locale={locale} />
        </div>
      </div>

      {/* COPYRIGHT + FIRMA */}
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
            <span className="text-gray-400 text-xs">Made with</span>
            <Image
              src="/costa.svg"
              alt="Corazón Costa Rica"
              width={14}
              height={14}
              className="inline-block"
              loading="lazy"
            />
            <span className="text-gray-400 text-xs">in Costa Rica</span>
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
