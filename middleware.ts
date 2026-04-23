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
const GEO_BLOCK_AUDIT = process.env.GEO_BLOCK_AUDIT === "1";

type GeoResolution = {
  country: string | null;
  region: string | null;
  source: "edge" | "fallback" | "unknown";
};

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

function normalizeCode(value: string | null | undefined) {
  if (!value) return null;
  const normalized = value.trim().toUpperCase();
  return normalized.length > 0 ? normalized : null;
}

async function resolveGeo(request: NextRequest): Promise<GeoResolution> {
  const geoRegion = normalizeCode(request.geo?.region);
  const geoCountry = normalizeCode(request.geo?.country);

  if (geoRegion && geoCountry) {
    return { country: geoCountry, region: geoRegion, source: "edge" };
  }

  const ip = extractIp(request);
  if (!ip)
    return { country: geoCountry, region: geoRegion, source: "unknown" };

  try {
    const url = new URL("/api/geoip", request.url);

    const response = await fetch(url, {
      headers: {
        "x-geo-fallback": "1",
        "x-forwarded-for": ip,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return { country: geoCountry, region: geoRegion, source: "unknown" };
    }
    const payload = await response.json();

    return {
      country: normalizeCode(payload.country) ?? geoCountry,
      region: normalizeCode(payload.region) ?? geoRegion,
      source: "fallback",
    };
  } catch (error) {
    console.warn("Geo fallback failed", error);
    return { country: geoCountry, region: geoRegion, source: "unknown" };
  }
}

async function getBlockDecision(request: NextRequest) {
  const geo = await resolveGeo(request);
  const blocked = geo.country === "US" && !!geo.region && BLOCKED_STATES.has(geo.region);
  return { blocked, geo };
}

export default async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith(BLOCKED_PATH)) {
    const decision = await getBlockDecision(request);

    if (GEO_BLOCK_AUDIT || decision.blocked) {
      console.info(
        `[geo-block] blocked=${decision.blocked} country=${decision.geo.country ?? "-"} region=${decision.geo.region ?? "-"} source=${decision.geo.source} path=${request.nextUrl.pathname}`
      );
    }

    if (decision.blocked) {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = BLOCKED_PATH;
      rewriteUrl.search = "";

      const response = NextResponse.rewrite(rewriteUrl, {
        status: 403,
      });
      response.headers.set("x-geo-block", "US-CA");
      return response;
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/", "/(en|es)/:path*"],
};
