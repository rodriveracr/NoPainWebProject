"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function NewsletterForm({ locale = "es" }: { locale?: string }) {
  const t = useTranslations("Footer");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "sending" | "ok" | "error">(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    setMessage(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const body = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("ok");
        setEmail("");
        setMessage(t("newsletterSuccess") ?? "Gracias — suscripción correcta");
        setTimeout(() => {
          setStatus(null);
          setMessage(null);
        }, 3000);
      } else {
        const err = (body?.error || body?.message || "Error al suscribir") + (body?.details ? ` — ${JSON.stringify(body.details)}` : "");
        setStatus("error");
        setMessage(String(err));
        setTimeout(() => {
          setStatus(null);
          setMessage(null);
        }, 5000);
      }
    } catch (err) {
      console.error("[newsletter] fetch error:", err);
      setStatus("error");
      setMessage("Error de red o timeout. Intenta otra vez.");
      setTimeout(() => {
        setStatus(null);
        setMessage(null);
      }, 5000);
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
        disabled={status === "sending"}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 rounded text-white text-sm hover:opacity-90 transition disabled:opacity-60"
        disabled={status === "sending"}
      >
        {status === "sending" ? "..." : t("subscribe")}
      </button>

      {message && (
        <div className={`text-sm mt-2 sm:mt-0 sm:ml-3 ${status === "ok" ? "text-green-400" : "text-amber-400"}`} role="status">
          {message}
        </div>
      )}
    </form>
  );
}
