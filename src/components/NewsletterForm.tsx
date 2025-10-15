// src/components/NewsletterForm.tsx
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

      // Try parse JSON; if not JSON, fallback to text
      const text = await res.text();
      let body: any = {};
      try {
        body = text ? JSON.parse(text) : {};
      } catch {
        body = { raw: text };
      }

      if (res.ok) {
        setStatus("ok");
        setEmail("");
        setMessage(
          t("newsletterSuccess") ?? "✅ Gracias — suscripción correcta",
        );
        setTimeout(() => {
          setStatus(null);
          setMessage(null);
        }, 3000);
      } else {
        const err =
          body?.error ||
          body?.message ||
          JSON.stringify(body) ||
          "Error al suscribir";
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-3"
      noValidate
    >
      <input
        type="email"
        placeholder={t("newsletterPlaceholder")}
        className="px-3 py-2 rounded bg-gray-800 border border-gray-600 text-sm w-full sm:w-auto"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label={t("newsletterPlaceholder")}
        disabled={status === "sending"}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 rounded text-white disabled:opacity-60"
      >
        {status === "sending" ? "..." : t("subscribe")}
      </button>

      {message && (
        <div
          className={`text-sm mt-2 ${status === "ok" ? "text-green-400" : "text-amber-400"}`}
          role="status"
          aria-live="polite"
        >
          {message}
        </div>
      )}
    </form>
  );
}
