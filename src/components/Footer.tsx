// src/components/Footer.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getSlug } from "@/utils/slugMap";
import NewsletterForm from "./NewsletterForm";

export default function Footer({ locale = "es" }: { locale?: string }) {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 border-t border-gray-700 font-franklin">

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12">
        
        {/* LOGO + Redes */}
        <div className="flex flex-col items-center sm:items-start space-y-4">
          <Image
            src="/No-PAIN.png"
            alt="No Pain Brand"
            width={140}
            height={40}
            className="opacity-90"
          />
          <div className="flex gap-4 mt-2">
            <a href="https://www.instagram.com/nopaingel" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-80 transition">
              <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} />
            </a>
            <a href="https://www.tiktok.com/@nopaingel" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:opacity-80 transition">
              <Image src="/icons/tiktok.svg" alt="TikTok" width={24} height={24} />
            </a>
            <a href="mailto:customercare@nopainnumbing.net" aria-label="Email" className="hover:opacity-80 transition">
              <Image src="/icons/email.png" alt="Email" width={24} height={24} />
            </a>
            <a href="https://wa.me/50683151806" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:opacity-80 transition">
              <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={24} height={24} />
            </a>
          </div>
        </div>

        {/* LINKS */}
        <div className="text-center sm:text-left">
          <h3 className="font-semibold text-lg mb-3 text-white">{t("linksTitle")}</h3>
          <ul className="space-y-2">
            <li>
              <Link href={`/${locale}/${getSlug("contact", locale)}`} className="hover:text-white transition">
                {t("contact")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}#proveedores`} className="hover:text-white transition">
                {t("suppliers")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/${getSlug("faq", locale)}`} className="hover:text-white transition">
                {t("faq")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/${getSlug("legal", locale)}`} className="hover:text-white transition">
                {t("legal")}
              </Link>
            </li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="text-center sm:text-left">
          <h3 className="font-semibold text-lg mb-3 text-white">{t("newsletterTitle")}</h3>
          <NewsletterForm locale={locale} />
        </div>
      </div>

      {/* COPYRIGHT + FIRMA PERSONAL */}
      <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
        <div className="text-center sm:text-left">
          &copy; {new Date().getFullYear()} No Pain. {t("rights")}
        </div>

    {/* Firma desarrollador (lado derecho) */}
<div className="flex items-center space-x-2 text-xs mt-4 sm:mt-0">
  <a 
    href="https://rodcr.carrd.co" 
    target="_blank" 
    rel="noopener noreferrer" 
    aria-label="Portfolio de Rodolfo VR"
    title="Portfolio de Rodolfo VR"
    className="flex items-center gap-1 hover:opacity-80 transition"
  >
    <span className="text-gray-400 text-xs">Made with</span>
    <Image 
      src="/costa.svg" 
      alt="Costa Rica Heart" 
      width={14} 
      height={14} 
      className="inline-block"
    />
    <span className="text-gray-400 text-xs">in Costa Rica</span>
    <Image 
      src="/riveras.png" 
      alt="Rivera's Industries Logo" 
      width={50} 
      height={50} 
      className="ml-2 inline-block"
    />
  </a>
</div>

      </div>
    </footer>
  );
}
