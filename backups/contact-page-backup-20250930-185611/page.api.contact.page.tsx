//src/app/[locale]/contact/page.tsx
"use client";

import { useState } from "react";
import { Mail, Instagram } from "lucide-react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../globals.css";

export default function Contact() {
  const t = useTranslations("Contact");
  const locale = useLocale();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
    newsletter: false, // 👈 nuevo campo
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert(t("submitMessage") || "Thank you for contacting us. We will respond soon.");
        setFormData({ nombre: "", email: "", mensaje: "", newsletter: false });
      } else {
        alert("Error sending message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Header locale={locale} />
      <div className="h-16" />
      <main className="bg-black text-white min-h-screen py-24 px-6 font-sans">
        <section className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold">{t("title")}</h1>
          <p className="text-base text-gray-300 mt-4">{t("description")}</p>
        </section>

        {/* CONTACTOS */}
        <section className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-16">
          <div className="flex flex-col items-center space-y-3 p-6 border border-gray-700 rounded-xl hover:border-gray-500 transition">
            <Mail className="w-8 h-8 text-gray-400" />
            <h3 className="font-semibold text-lg">{t("emailTitle")}</h3>
            <a
              href="mailto:customercare@nopainnumbing.net"
              className="text-gray-300 hover:text-white transition"
            >
              customercare@nopainnumbing.net
            </a>
          </div>

          <div className="flex flex-col items-center space-y-3 p-6 border border-gray-700 rounded-xl hover:border-gray-500 transition">
            <Instagram className="w-8 h-8 text-gray-400" />
            <h3 className="font-semibold text-lg">{t("instagramTitle")}</h3>
            <a
              href="https://www.instagram.com/nopaingel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition"
            >
              @nopaingel
            </a>
          </div>

          <div className="flex flex-col items-center space-y-3 p-6 border border-gray-700 rounded-xl hover:border-gray-500 transition">
            <Image
              src="/icons/wagrey.png"
              alt={t("whatsappAlt")}
              width={32}
              height={32}
              className="opacity-80"
            />
            <h3 className="font-semibold text-lg">{t("whatsappTitle")}</h3>
            <a
              href="https://wa.me/50683151806"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition"
            >
              +506 8315 1806
            </a>
          </div>
        </section>

        {/* FORMULARIO */}
        <section className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder={t("namePlaceholder")}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("emailPlaceholder")}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              required
            />
            <textarea
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder={t("messagePlaceholder")}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              required
            />

            {/* Checkbox newsletter */}
            <label className="flex items-center space-x-2 text-sm text-gray-300">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                className="w-4 h-4 accent-pink-500"
              />
              <span>{t("newsletterOptIn")}</span>
            </label>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded hover:opacity-90 transition"
            >
              {t("submit")}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
