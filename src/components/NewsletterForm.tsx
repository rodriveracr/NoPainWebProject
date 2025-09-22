// src/components/NewsletterForm.tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function NewsletterForm({ locale = "es" }: { locale?: string }) {
  const t = useTranslations("Footer");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "sending" | "ok" | "error">(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");

    try {
      // Simulación de envío. Reemplaza aquí con tu fetch a la API cuando la tengas.
      await new Promise((r) => setTimeout(r, 700));
      setStatus("ok");
      setEmail("");
      setTimeout(() => setStatus(null), 2500);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus(null), 2500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center sm:items-start gap-3" noValidate>
      <input
        type="email"
        placeholder={t("newsletterPlaceholder")}
        className="px-3 py-2 rounded bg-gray-800 border border-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 w-full sm:w-auto"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label={t("newsletterPlaceholder")}
        data-lpignore="true"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 rounded text-white text-sm hover:opacity-90 transition"
        disabled={status === "sending"}
      >
        {status === "sending" ? "..." : t("subscribe")}
      </button>

      {status === "ok" && (
        <div className="text-sm text-green-400 mt-2 sm:mt-0 sm:ml-3">
          Gracias — suscripción simulada
        </div>
      )}
      {status === "error" && (
        <div className="text-sm text-amber-400 mt-2 sm:mt-0 sm:ml-3">
          Error al suscribir — intenta otra vez
        </div>
      )}
    </form>
  );
}
