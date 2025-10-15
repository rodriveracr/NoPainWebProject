import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const supportedLocales = ["en", "es"] as const;

  const safeLocale = supportedLocales.includes(
    locale as (typeof supportedLocales)[number],
  )
    ? (locale as (typeof supportedLocales)[number])
    : "en";

  const messages = (await import(`./${safeLocale}.json`)).default;

  return { locale: safeLocale, messages };
});
