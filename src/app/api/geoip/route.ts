import { Reader, ReaderModel } from "@maxmind/geoip2-node";
import { NextRequest, NextResponse } from "next/server";
import path from "node:path";

export const runtime = "nodejs";

const DEFAULT_DB_PATH = path.join(
  process.cwd(),
  "tools",
  "geolite2",
  "GeoLite2-City.mmdb"
);

let readerPromise: Promise<ReaderModel> | null = null;

async function getReader(dbPath: string) {
  if (!readerPromise) {
    readerPromise = Reader.open(dbPath).catch((error) => {
      readerPromise = null;
      throw error;
    });
  }
  return readerPromise;
}

function extractIp(request: NextRequest): string | null {
  const queryIp = request.nextUrl.searchParams.get("ip");
  if (queryIp) return queryIp.trim();

  const headerIp = request.headers.get("x-forwarded-for");
  if (headerIp) {
    const [first] = headerIp.split(",");
    if (first) return first.trim();
  }

  return null;
}

export async function GET(request: NextRequest) {
  const dbPath = process.env.GEOLITE2_CITY_DB_PATH ?? DEFAULT_DB_PATH;
  const ip = extractIp(request);

  if (!ip) {
    return NextResponse.json({ region: null }, { status: 200 });
  }

  try {
    const reader = await getReader(dbPath);
    const city = await reader.city(ip);
    const subdivisions = city.subdivisions ?? [];
    const mostSpecific = subdivisions[subdivisions.length - 1];
    const region = mostSpecific?.isoCode ?? subdivisions[0]?.isoCode ?? null;

    return NextResponse.json({ region: region ?? null });
  } catch (error) {
    console.error("GeoIP lookup failed", error);
    return NextResponse.json({ region: null }, { status: 200 });
  }
}
