// src/i18n/request.ts
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  const supported = ['es', 'en'] as const;
  const safeLocale: 'es' | 'en' =
    supported.includes(locale as 'es' | 'en') ? (locale as 'es' | 'en') : 'es';

  const messages = (await import(`./${safeLocale}.json`)).default;

  return {
    locale: safeLocale,
    messages
  };
});
