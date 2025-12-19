"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { getSlug } from "@/utils/slugMap";

export default function FloatingActions() {
  const tContact = useTranslations("Contact");
  const tNavbar = useTranslations("Navbar");
  const locale = useLocale();

  // Official contact details from Footer
  const whatsappHref = "https://wa.me/17862102447";
  const emailHref = "mailto:customercare@nopainnumbing.net";

  return (
    <div className="floating-actions" aria-hidden={false}>
      <a
        className="fab whatsapp half-pill"
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={tContact("whatsappTitle")}
        title={tContact("whatsappTitle")}
      >
        <img src="/icons/whatsapp.svg" alt={tContact("whatsappAlt") || "WhatsApp"} width={20} height={20} />
        <span className="fab-label">{tContact("whatsappTitle")}</span>
      </a>

      <a
        className="fab contact half-pill"
        href={`/${locale}/${getSlug("contact", locale as string)}`}
        aria-label={tNavbar("contact") || tContact("title")}
        title={tNavbar("contact") || tContact("title")}
      >
        <img src="/contact-form.svg" alt={tNavbar("contact") || tContact("title") || "Contact"} width={18} height={18} />
        <span className="fab-label">{tNavbar("contact") || tContact("title")}</span>
      </a>

      <a
        className="fab email half-pill"
        href={emailHref}
        aria-label={tContact("emailTitle")}
        title={tContact("emailTitle")}
      >
        <img src="/icons/email.webp" alt={tContact("emailTitle") || "Email"} width={18} height={18} />
        <span className="fab-label">{tContact("emailTitle")}</span>
      </a>
    </div>
  );
}
