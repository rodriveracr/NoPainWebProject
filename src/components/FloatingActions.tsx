"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { getSlug } from "@/utils/slugMap";

export default function FloatingActions() {
  const tContact = useTranslations("Contact");
  const tNavbar = useTranslations("Navbar");
  const locale = useLocale();

  // Official contact details from Footer
  const whatsappNumber = "+506 8315 1806";
  const whatsappHref = "https://wa.me/50683151806";
  const emailHref = "mailto:infonopain@nopainnumbing.net";

  return (
    <div className="floating-actions" aria-hidden={false}>
      <a
        className="fab whatsapp"
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp +506 8315 1806`}
        title={`WhatsApp +506 8315 1806`}
      >
        <img src="/icons/whatsapp.svg" alt={`WhatsApp +506 8315 1806`} width={20} height={20} />
      </a>

      <a
        className="fab contact"
        href={`/${locale}/${getSlug("contact", locale as string)}`}
        aria-label={tNavbar("contact") || tContact("title")}
        title={tNavbar("contact") || tContact("title")}
      >
        <img src="/contact-form.svg" alt={tNavbar("contact") || tContact("title") || "Contact"} width={18} height={18} />
      </a>

      <a
        className="fab email"
        href={emailHref}
        aria-label={`EMAIL infonopain@nopainnumbing.net`}
        title={`EMAIL infonopain@nopainnumbing.net`}
      >
        <img src="/icons/email.webp" alt={`EMAIL infonopain@nopainnumbing.net`} width={18} height={18} />
      </a>
    </div>
  );
}
