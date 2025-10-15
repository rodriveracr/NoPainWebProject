// src/app/api/subscribe/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
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
