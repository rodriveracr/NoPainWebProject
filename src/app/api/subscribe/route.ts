import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BREVO_URL = "https://api.brevo.com/v3/contacts";
const BREVO_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID || "2", 10);

async function fetchWithTimeout(input: RequestInfo, init?: RequestInit, ms = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(input, { ...(init || {}), signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = (body?.email || "").toString().trim();

    console.log("[subscribe] received body:", body);

    if (!email) {
      return NextResponse.json({ error: "Email es requerido" }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Email no válido" }, { status: 400 });
    }
    if (!BREVO_KEY) {
      console.error("[subscribe] BREVO_API_KEY no configurada");
      return NextResponse.json({ error: "Server misconfigured: missing BREVO_API_KEY" }, { status: 500 });
    }

    const payload = { email, listIds: [BREVO_LIST_ID], updateEnabled: true };

    console.log("[subscribe] calling Brevo for", email);

    const res = await fetchWithTimeout(BREVO_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": BREVO_KEY,
      },
      body: JSON.stringify(payload),
    }, 8000);

    if (!res) {
      return NextResponse.json({ error: "No response from Brevo" }, { status: 502 });
    }

    const data = await res.json().catch(() => null);
    console.log("[subscribe] brevo status:", res.status, "body:", data);

    if (!res.ok) {
      return NextResponse.json({ error: "Brevo error", details: data }, { status: res.status });
    }

    return NextResponse.json({ success: true, data }, { status: res.status });
  } catch (err: any) {
    if (err?.name === "AbortError") {
      console.error("[subscribe] request to Brevo timed out");
      return NextResponse.json({ error: "timeout" }, { status: 504 });
    }
    console.error("[subscribe] unexpected error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
