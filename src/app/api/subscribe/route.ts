// src/app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { rateLimit } from "@/app/api/utils/rateLimiter";

export async function POST(req: Request) {
  try {
    // 🔐 Validar origen (rechazar solo si es sospechoso, no si viene de tu sitio)
    const origin = req.headers.get("origin") || req.headers.get("referer") || "";
    const allowedOrigins = [
      "https://www.nopainnumbing.net",
      "https://nopainnumbing.net",
      "http://localhost:3000",
      "http://localhost",
    ];
    const isValidOrigin = allowedOrigins.some(allowed => origin.includes(allowed));
    
    // Solo rechazar si hay un origin Y no es válido (no rechazar si no hay origin)
    if (origin && !isValidOrigin && !origin.includes("localhost")) {
      console.warn(`[subscribe] Origen rechazado: ${origin}`);
      return NextResponse.json(
        { error: "Origen no permitido" },
        { status: 403 }
      );
    }

    // 🛡️ Rate limiting: 5 requests por IP cada 60 segundos
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    if (!rateLimit(ip, 5, 60000)) {
      console.warn(`[subscribe] Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { error: "Demasiadas suscripciones. Intenta más tarde." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const email = String(body?.email || "")
      .trim()
      .toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = Number(process.env.BREVO_LIST_ID || 2);
    if (!apiKey) {
      return NextResponse.json(
        { error: "Falta BREVO_API_KEY" },
        { status: 500 },
      );
    }

    console.log("[subscribe] received body:", body);
    console.log("[subscribe] calling Brevo for", email);

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    let data: any = null;
    const text = await res.text().catch(() => "");
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    console.log("[subscribe] brevo status:", res.status, "body:", data);

    // ✅ Manejo explícito de estados
    if (res.status === 201) {
      return NextResponse.json({
        success: true,
        message: "Suscripción creada",
      });
    } else if (res.status === 204) {
      // Ya estaba suscrito → tratamos como éxito
      return NextResponse.json({ success: true, message: "Ya estás suscrito" });
    } else if (res.status >= 400 && res.status < 500) {
      return NextResponse.json(
        { error: "Error de validación o ya suscrito", details: data },
        { status: 400 },
      );
    } else {
      return NextResponse.json(
        { error: "Error del servidor de Brevo", details: data },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("[subscribe] unexpected error:", err);
    return NextResponse.json(
      { error: "Error inesperado del servidor" },
      { status: 500 },
    );
  }
}

export async function OPTIONS() {
  const res = NextResponse.json({ ok: true });
  res.headers.set(
    "Access-Control-Allow-Origin",
    "https://www.nopainnumbing.net",
  );
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
}
