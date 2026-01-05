# Copilot Instructions
## Architecture & Routing
- Next.js 15 App Router renders from src/app; the root handler reads the `Accept-Language` header and redirects to the first supported locale, while edge middleware enforces `/en` and `/es` prefixes and auto-detects visitors ([src/app/page.tsx](src/app/page.tsx), [middleware.ts](middleware.ts)).
- [src/app/[locale]/layout.tsx](src/app/%5Blocale%5D/layout.tsx) is the shared chrome: it wraps `NextIntlClientProvider`, injects `Header`, `Footer`, Monumby seal, and `FloatingActions`, so individual pages should only supply `<main>` content (clean up legacy pages that still mount the header when you touch them).
- Next 15 streams server props as promises; always `const { locale } = await params` in route handlers as shown across `[locale]` pages to avoid runtime `params.locale is undefined` bugs ([src/app/[locale]/page.tsx](src/app/%5Blocale%5D/page.tsx)).
- New localized routes must live inside `[locale]/...`, export `generateStaticParams`, and define a sensible `revalidate` window so both languages stay statically generated.

## Localization & Content
- Copy lives under `next-intl` JSON namespaces; fetch server strings with `getTranslations` and client strings with `useTranslations`, keeping the keys mirrored across [src/i18n/en.json](src/i18n/en.json) and [src/i18n/es.json](src/i18n/es.json).
- Locale resolution is centralized in [src/i18n/request.ts](src/i18n/request.ts) and wired through the plugin exported in [next.config.js](next.config.js); extend both plus `middleware.ts` if you add another language.
- Update [src/utils/slugMap.ts](src/utils/slugMap.ts) whenever you introduce a page that needs a localized slug—`Header`, `Footer`, and `FloatingActions` all derive their hrefs from this map.
- The distributor directory on the home page is the `REGIONS` constant plus translation keys in the `Suppliers` namespace; add new `extra` values to the dictionaries before referencing them ([src/app/[locale]/page.tsx](src/app/%5Blocale%5D/page.tsx)).
- Gallery screens are array-driven client components; every photo/video overlay and description must have matching `Gallery.photoN.*` or `Gallery.videoN.*` keys before adding entries in [GalleryPhotos.tsx](src/app/%5Blocale%5D/gallery/GalleryPhotos.tsx) or [GalleryVideos.tsx](src/app/%5Blocale%5D/gallery/GalleryVideos.tsx).

## UI Components & Styling
- Shared UI such as `Header`, `Footer`, `LanguageSwitcher`, `FloatingActions`, `ClientPopup`, and `ProductLayout` expect a `next-intl` context; only mount them once per view and pass `locale` explicitly when rendering outside the locale layout ([src/components](src/components)).
- Product detail routes should keep using [src/components/ProductLayout.tsx](src/components/ProductLayout.tsx) and the `products.*` translation block; [src/app/[locale]/no-pain-numbing-cream/page.tsx](src/app/%5Blocale%5D/no-pain-numbing-cream/page.tsx) is the reference for structure, suspense fallback, and popup placement.
- Global styles import Tailwind 4 and define custom classes for hero overlays, floating FABs, gallery modals, and animations; reuse the tokens and helpers in [src/app/globals.css](src/app/globals.css) instead of scattering inline CSS.
- Animations respect `prefers-reduced-motion` in `globals.css`; keep that pattern whenever you introduce new motion-heavy features.

## Forms & APIs
- The contact page is client-only, loads the hCaptcha script manually, and posts to `/api/contact`; keep the `window.onHcaptchaSuccess|Error|Expire` callbacks stable or the submit handler in [src/app/[locale]/contact/page.tsx](src/app/%5Blocale%5D/contact/page.tsx) will treat every attempt as invalid.
- [src/app/api/contact/route.ts](src/app/api/contact/route.ts) validates `HCAPTCHA_SECRET_KEY`, rate-limits IPs, restricts origins to `nopainnumbing.net`/localhost, sends Brevo emails, and optionally enrolls users into the list; required env vars are `BREVO_API_KEY`, `BREVO_LIST_ID`, `CONTACT_EMAIL`, and `HCAPTCHA_SECRET_KEY`.
- Newsletter subscriptions post to [src/app/api/subscribe/route.ts](src/app/api/subscribe/route.ts), which uses the shared in-memory limiter in [src/app/api/utils/rateLimiter.ts](src/app/api/utils/rateLimiter.ts); keep the JSON response shape consistent because [src/components/NewsletterForm.tsx](src/components/NewsletterForm.tsx) parses both success and failure bodies manually.
- Floating buttons, footer CTAs, and nav labels pull directly from the `Navbar` and `Contact` namespaces, so add translations before wiring new quick actions.

## Workflows & Tooling
- Package scripts are `npm run dev`, `npm run build`, `npm run start -p 3001`, `npm run lint`, and `npm run check-types`; stick to these when documenting or scripting CI ([package.json](package.json)).
- Heavy media in `public/videos` should be processed through [compress-videos.ps1](compress-videos.ps1), which backs up originals, runs two-pass ffmpeg from `tools/ffmpeg-8.0-essentials_build`, and even stages/commits the results.
- Before or after deploying, execute the quick regression script at [tools/smoke-test-prod.ps1](tools/smoke-test-prod.ps1) to verify key pages and video headers respond correctly.
- Remote media currently loads from Cloudinary; if you add another host, declare it in the `images.remotePatterns` block of [next.config.js](next.config.js).

## Operational Gotchas
- The promotional popup in [src/components/Popup.tsx](src/components/Popup.tsx) throttles itself via `localStorage`; ensure you only render it once per page tree or users will get overlapping overlays.
- `Header` plays an audio cue on hover/tap and manages body scroll locking for the mobile menu; keep it client-only and avoid invoking it from server components outside the layout.
- The aggressive `!important` whites in [src/app/globals.css](src/app/globals.css) mean new sections must be tested over dark hero backgrounds to guarantee contrast and legibility.
- Supporting a new locale requires touching `locales` in [middleware.ts](middleware.ts), [src/i18n/request.ts](src/i18n/request.ts), adding JSON dictionaries, and updating redirects/menus.
