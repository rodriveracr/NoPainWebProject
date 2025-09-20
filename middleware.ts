import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Idiomas soportados
  locales: ['es', 'en'],

  // Idioma por defecto → inglés
  defaultLocale: 'en',

  // Siempre mostrar prefijo de idioma (/es o /en)
  localePrefix: 'always'
});

export const config = {
  matcher: ['/', '/(es|en)/:path*']
};
