// 📄 /src/app/[locale]/contact/page.tsx
"use client";

import { useState } from "react";
import { Mail, Instagram } from "lucide-react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import "../../globals.css";

export default function Contact() {
  const t = useTranslations("Contact");
  const locale = useLocale();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
    newsletter: false,
  });

  const [status, setStatus] = useState<null | "sending" | "ok" | "error">(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setStatus("sending");
    setMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok && json?.success) {
        setStatus("ok");
        setMessage(t("submitMessage"));
        setFormData({ nombre: "", email: "", mensaje: "", newsletter: false });

        setTimeout(() => {
          setStatus(null);
          setMessage(null);
        }, 4000);
      } else {
        const err = json?.error || "Error enviando el mensaje.";
        setStatus("error");
        setMessage("❌ " + err);
        setTimeout(() => {
          setStatus(null);
          setMessage(null);
        }, 5000);
      }
    } catch (err) {
      console.error("❌ Error en fetch /api/contact:", err);
      setStatus("error");
      setMessage("❌ Ocurrió un error. Inténtalo de nuevo.");
      setTimeout(() => {
        setStatus(null);
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <>
      {/* ✅ Header */}
      <Suspense fallback={<div className="text-center py-8 text-gray-400">Loading header...</div>}>
        <Header locale={locale} />
      </Suspense>

      {/* ✅ Fondo y layout coherente */}
      <main className="relative text-white font-franklin overflow-hidden">
        <div className="absolute inset-0 bg-contact bg-cover bg-center" aria-hidden="true" />
        <div className="absolute inset-0 bg-black/85" aria-hidden="true" />

        {/* 🔹 Contenido */}
        <div className="relative z-10 pt-40 pb-[20vh] px-6 max-w-5xl mx-auto text-center space-y-20">
          {/* Encabezado */}
          <section className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-wide">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {t("description")}
            </p>
          </section>

          {/* 🔸 Datos de contacto */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {/* Email */}
            <div className="flex flex-col items-center space-y-3 p-6 border border-gray-700 rounded-2xl hover:border-gray-500 transition bg-black/40 backdrop-blur-sm">
              <Mail className="w-8 h-8 text-gray-400" />
              <h3 className="font-semibold text-lg">{t("emailTitle")}</h3>
              <a
                href="mailto:customercare@nopainnumbing.net"
                className="text-gray-300 hover:text-white transition"
              >
                customercare@nopainnumbing.net
              </a>
            </div>

            {/* Instagram */}
            <div className="flex flex-col items-center space-y-3 p-6 border border-gray-700 rounded-2xl hover:border-gray-500 transition bg-black/40 backdrop-blur-sm">
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

            {/* WhatsApp */}
            <div className="flex flex-col items-center space-y-3 p-6 border border-gray-700 rounded-2xl hover:border-gray-500 transition bg-black/40 backdrop-blur-sm">
              <a
                href="https://wa.me/50683151806"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="+506 8315 1806"
                title="Abrir WhatsApp"
                className="flex flex-col items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
              >
                <Image
                  src="/icons/wagrey.png"
                  alt={t("whatsappAlt")}
                  width={28}
                  height={28}
                  className="opacity-80"
                />
                <h3 className="font-semibold text-lg">{t("whatsappTitle")}</h3>
              </a>
            </div>
          </section>

          {/* 🔹 Formulario */}
          <section className="max-w-lg mx-auto text-left bg-black/40 border border-gray-700 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-4" method="post">
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder={t("namePlaceholder")}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("emailPlaceholder")}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
                required
              />
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder={t("messagePlaceholder")}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white min-h-[120px]"
                required
              />

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
                className="w-full py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded hover:opacity-90 transition disabled:opacity-50"
                disabled={status === "sending"}
              >
                {status === "sending" ? "..." : t("submit")}
              </button>
            </form>

            {message && (
              <div
                className={`mt-4 text-center ${
                  status === "ok" ? "text-green-400" : "text-red-400"
                }`}
                role="status"
              >
                {message}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* ✅ Footer */}
      <Suspense fallback={<div className="text-center py-8 text-gray-400">Loading footer...</div>}>
        <Footer locale={locale} />
      </Suspense>
    </>
  );
}
