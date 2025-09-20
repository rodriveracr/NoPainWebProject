"use client";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="bg-grayDark text-white py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">{t("headline")}</h1>
      <p className="text-lg max-w-xl mx-auto">{t("subtitle")}</p>
    </section>
  );
}
