// src/app/api/subscribe/route.ts
import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BREVO_URL = "https://api.brevo.com/v3/contacts";
const BREVO_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID || "2", 10);

// fetch with timeout
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
      console.warn("[subscribe] missing email");
      return NextResponse.json({ error: "Email es requerido" }, { status: 400 });
    }

    if (!EMAIL_RE.test(email)) {
      console.warn("[subscribe] invalid email:", email);
      return NextResponse.json({ error: "Email no válido" }, { status: 400 });
    }

    // If BREVO_KEY missing: allow a dev-mode mock response so frontend can be developed
    if (!BREVO_KEY) {
      console.warn("[subscribe] BREVO_API_KEY not set — returning mock response (dev)");
      return NextResponse.json({ success: true, data: { id: Math.floor(Math.random() * 10000) } }, { status: 200 });
    }

    const payload = {
      email,
      listIds: [BREVO_LIST_ID],
      updateEnabled: true,
    };

    console.log("[subscribe] calling Brevo for", email);

    const res = await fetchWithTimeout(BREVO_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": BREVO_KEY,
      },
      body: JSON.stringify(payload),
    }, 10000);

    if (!res) {
      console.error("[subscribe] no response from Brevo");
      return NextResponse.json({ error: "No response from Brevo" }, { status: 502 });
    }

    // try to parse JSON; if not possible, return raw text
    let data: any = null;
    try {
      const text = await res.text();
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = { raw: text };
      }
    } catch (err) {
      data = null;
    }

    console.log("[subscribe] brevo status:", res.status, "body:", data);

    if (!res.ok) {
      // Bubble up Brevo's status and message (avoid leaking keys)
      return NextResponse.json({ error: "Brevo error", details: data }, { status: res.status });
    }

    // Created (201) or OK -> forward success
    return NextResponse.json({ success: true, data }, { status: res.status });
  } catch (err: any) {
    if (err?.name === "AbortError") {
      console.error("[subscribe] request to Brevo timed out");
      return NextResponse.json({ error: "timeout" }, { status: 504 });
    }
    console.error("[subscribe] unexpected error:", err);
    return NextResponse.json({ error: "server_error", message: String(err?.message || err) }, { status: 500 });
  }
}
