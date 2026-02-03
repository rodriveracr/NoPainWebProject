// =====================================================
// 🌍 src/middleware.ts — Detección automática + bloqueo regional
// =====================================================
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const handleI18nRouting = createMiddleware({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: true,
});

const BLOCKED_PATH = "/blocked";
const BLOCKED_STATES = new Set(
  (process.env.BLOCKED_STATES ?? "CA")
    .split(",")
    .map((code) => code.trim().toUpperCase())
    .filter(Boolean)
);

const FALLBACK_HEADERS = ["x-real-ip", "x-forwarded-for"];

function extractIp(request: NextRequest) {
  for (const header of FALLBACK_HEADERS) {
    const value = request.headers.get(header);
    if (value) {
      const [first] = value.split(",");
      if (first) {
        const ip = first.trim();
        if (ip) return ip;
      }
    }
  }

  return null;
}

async function resolveRegion(request: NextRequest) {
  const geoRegion = request.geo?.region;
  if (geoRegion) return geoRegion.toUpperCase();

  const ip = extractIp(request);
  if (!ip) return null;

  try {
    const url = new URL("/api/geoip", request.url);
    url.searchParams.set("ip", ip);

    const response = await fetch(url, {
      headers: {
        "x-geo-fallback": "1",
      },
      cache: "no-store",
    });

    if (!response.ok) return null;
    const payload = await response.json();
    return typeof payload.region === "string"
      ? payload.region.toUpperCase()
      : null;
  } catch (error) {
    console.warn("Geo fallback failed", error);
    return null;
  }
}

async function shouldBlock(request: NextRequest) {
  const region = await resolveRegion(request);
  if (!region) return false;
  return BLOCKED_STATES.has(region);
}

export default async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith(BLOCKED_PATH)) {
    const blocked = await shouldBlock(request);
    if (blocked) {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = BLOCKED_PATH;
      rewriteUrl.search = "";

      return NextResponse.rewrite(rewriteUrl, {
        status: 403,
      });
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/", "/(en|es)/:path*"],
};
