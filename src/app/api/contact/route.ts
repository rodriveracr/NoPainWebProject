// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

type Body = {
  nombre?: string;
  email?: string;
  mensaje?: string;
  newsletter?: boolean;
  website?: string;
};

// --- UTILIDADES ---
function now() {
  return new Date().toISOString();
}
function makeRequestId() {
  return `${Date.now().toString(36)}-${Math.floor(Math.random() * 100000).toString(36)}`;
}
function escapeHtml(s: string) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 🚨 Detecta patrones típicos de spam/bot
function isLikelySpam(nombre: string, mensaje: string): boolean {
  const lowerMsg = mensaje.toLowerCase();
  const lowerNombre = nombre.toLowerCase();
  
  // Patterns de spam comunes
  const spamPatterns = [
    /^[a-z0-9]+$/i, // Solo caracteres sin sentido (WMFjnWZpIXOdjK)
    /^[a-z]{10,}$/i, // Palabra larga sin vocales
    /^[a-z0-9]{15,}$/, // Cadena muy larga sin espacios
  ];
  
  // Nombre sospechoso
  if (spamPatterns.some(p => p.test(nombre))) {
    return true;
  }
  
  // Mensaje muy corto + nombre extraño (típico de bots)
  if (mensaje.length < 10 && /^[a-z0-9]+$/i.test(nombre)) {
    return true;
  }
  
  // Muy pocas palabras reales en el mensaje
  const wordCount = mensaje.split(/\s+/).length;
  if (wordCount < 2 && mensaje.length > 5) {
    return true; // Ej: "JEJmPuIXBITkvOSA"
  }
  
  return false;
}

// --- RATE LIMIT ---
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minuto
const MAX_REQUESTS_PER_IP = 5;
const ipHits = new Map<string, { count: number; firstHit: number }>();

function rateLimit(ip: string): boolean {
  const nowMs = Date.now();
  const record = ipHits.get(ip);
  if (!record) {
    ipHits.set(ip, { count: 1, firstHit: nowMs });
    return false;
  }
  if (nowMs - record.firstHit > RATE_LIMIT_WINDOW_MS) {
    ipHits.set(ip, { count: 1, firstHit: nowMs });
    return false;
  }
  record.count += 1;
  if (record.count > MAX_REQUESTS_PER_IP) return true;
  return false;
}

// --- FUNCIÓN ENVÍO EMAIL ---
async function sendBrevoEmail(
  senderName: string,
  fromEmail: string,
  toEmail: string,
  subject: string,
  html: string,
) {
  const url = "https://api.brevo.com/v3/smtp/email";
  const apiKey = String(process.env.BREVO_API_KEY || "");

  const payload = {
    sender: { name: senderName, email: fromEmail },
    to: [{ email: toEmail }],
    subject,
    htmlContent: html,
  };

  if (!apiKey) {
    return {
      ok: false,
      status: 401,
      body: { message: "Missing BREVO_API_KEY" },
    };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text().catch(() => "");
    let parsed: any = text;
    try {
      parsed = JSON.parse(text);
    } catch {
      /* keep text */
    }

    return { ok: res.ok, status: res.status, body: parsed };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

// --- HANDLER POST ---
export async function POST(req: Request) {
  const reqId = makeRequestId();
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    // 🔐 Validar origen (solo desde tu dominio o localhost)
    const origin = req.headers.get("origin") || req.headers.get("referer") || "";
    const allowedOrigins = [
      "https://www.nopainnumbing.net",
      "https://nopainnumbing.net",
      "http://localhost:3000",
      "http://localhost",
    ];
    const isValidOrigin = allowedOrigins.some(allowed => origin.includes(allowed));
    
    if (origin && !isValidOrigin) {
      console.warn(`[${now()}] [${reqId}] 🔐 Origen rechazado: ${origin}`);
      return NextResponse.json(
        { error: "Origen no permitido" },
        { status: 403 }
      );
    }

    // 🚫 Rate limit por IP
    if (rateLimit(ip)) {
      console.warn(`[${now()}] [${reqId}] 🚫 Rate limit exceeded for ${ip}`);
      return NextResponse.json(
        { error: "Too many requests. Try again later." },
        { status: 429 },
      );
    }

    // leer el body como texto
    const raw = await req.text().catch(() => "");
    console.log(
      `[${now()}] [${reqId}] 📩 RAW body length: ${raw?.length ?? 0}`,
    );

    if (!raw || raw.trim() === "") {
      console.log(`[${now()}] [${reqId}] ⚠️ Body vacío recibido.`);
      return NextResponse.json(
        { error: "Body vacío o inválido" },
        { status: 400 },
      );
    }

    // parsear JSON
    let body: Body = {};
    try {
      body = JSON.parse(raw) as Body;
    } catch (err) {
      console.error(`[${now()}] [${reqId}] ❌ JSON inválido`);
      return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
    }

    const { nombre, email, mensaje, newsletter, website } = body;
    console.log(`[${now()}] [${reqId}] 📩 /api/contact received:`, {
      nombre,
      email: email ? "****" : undefined,
      mensaje: mensaje ? `(${mensaje.length} chars)` : undefined,
    });

    // --- DEBUG LOGS (temporary) ---
    // NOTE: moved below emailRegex declaration to avoid TDZ ReferenceError in production
    // --- end debug logs ---

    // honeypot
    if (website) {
      console.log(`[${now()}] [${reqId}] 🕵️ Honeypot triggered`);
      return NextResponse.json({ success: true });
    }

    // 🚨 Detección de spam/bot
    if (isLikelySpam(nombre || "", mensaje || "")) {
      console.log(`[${now()}] [${reqId}] 🤖 Spam detectado - Nombre: "${nombre}", Mensaje: "${mensaje}"`);
      // Responder como si fuera válido (sin revelar que es spam)
      return NextResponse.json({ success: true });
    }

    // Validación fuerte
    if (!nombre || !email || !mensaje) {
      console.log(`[${now()}] [${reqId}] ⚠️ Datos incompletos`);
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // --- DEBUG LOGS (temporary) ---
    try {
      console.log(
        `[${now()}] [${reqId}] 🔍 Debug: emailValid=${emailRegex.test(
          String(email || ""),
        )}, nombreType=${typeof nombre}, nombreLen=${String(
          nombre || "",
        ).length}, mensajeType=${typeof mensaje}, mensajeLen=${String(
          mensaje || "",
        ).length}`,
      );
      console.log(
        `[${now()}] [${reqId}] 🔍 mensaje sample: ${String(mensaje || "").slice(
          0,
          300,
        )}`,
      );
    } catch (e) {
      console.warn(`[${now()}] [${reqId}] ⚠️ Debug log failed:`, String(e));
    }
    // --- end debug logs ---
    if (
      !emailRegex.test(email) ||
      mensaje.length > 5000 ||
      nombre.length > 200
    ) {
      console.log(`[${now()}] [${reqId}] ⚠️ Validación fallida`);
      return NextResponse.json(
        { error: "Formato de datos inválido" },
        { status: 400 },
      );
    }

    // Sanitizar
    const safeNombre = escapeHtml(nombre);
    const safeEmail = escapeHtml(email);
    const safeMensaje = escapeHtml(mensaje);
    const safeEmailLog = safeEmail.replace(/(.{2}).+(@.*)/, "$1***$2");

    const FROM_EMAIL = String(
      process.env.CONTACT_EMAIL || "customercare@nopainnumbing.net",
    );
    const CONTACT_EMAIL = FROM_EMAIL;

    const supportHtml = `
      <h3>Nuevo mensaje recibido</h3>
      <p><b>Nombre:</b> ${safeNombre}</p>
      <p><b>Email:</b> ${safeEmail}</p>
      <p><b>Mensaje:</b></p>
      <p>${safeMensaje}</p>
    `;

    console.log(`[${now()}] [${reqId}] ⏳ Enviando email soporte a Brevo...`);
    const supportRes = await sendBrevoEmail(
      "No Pain Contact",
      FROM_EMAIL,
      CONTACT_EMAIL,
      `📩 Nuevo mensaje - ${safeNombre}`,
      supportHtml,
    );
    console.log(
      `[${now()}] [${reqId}] 📨 Respuesta Brevo (soporte):`,
      supportRes,
    );

    let clientRes: any = null;
    if (supportRes && supportRes.ok) {
      console.log(
        `[${now()}] [${reqId}] ⏳ Enviando confirmación al cliente (${safeEmailLog})...`,
      );
      const clientHtml = `<p>Hola ${safeNombre},</p>
        <p>Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos lo antes posible.</p>
        <br/><p>— Equipo No Pain</p>`;
      clientRes = await sendBrevoEmail(
        "No Pain Team",
        FROM_EMAIL,
        safeEmail,
        "✅ Hemos recibido tu mensaje",
        clientHtml,
      );
    } else {
      console.warn(
        `[${now()}] [${reqId}] ⚠️ Soporte no aceptado por Brevo, omitida confirmación cliente.`,
      );
    }

    // newsletter
    let newsletterRes: any = null;
    if (newsletter) {
      try {
        console.log(`[${now()}] [${reqId}] ⏳ Añadiendo a newsletter...`);
        const contactsRes = await fetch("https://api.brevo.com/v3/contacts", {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "api-key": String(process.env.BREVO_API_KEY),
          },
          body: JSON.stringify({
            email: safeEmail,
            attributes: { NOMBRE: safeNombre },
            listIds: [parseInt(process.env.BREVO_LIST_ID || "2")],
            updateEnabled: true,
          }),
        });
        const text = await contactsRes.text().catch(() => "");
        try {
          newsletterRes = JSON.parse(text);
        } catch {
          newsletterRes = text;
        }
        console.log(
          `[${now()}] [${reqId}] 📨 Respuesta newsletter:`,
          contactsRes.status,
        );
      } catch (err) {
        console.error(`[${now()}] [${reqId}] ❌ Error newsletter:`, err);
      }
    }

    console.log(`[${now()}] [${reqId}] ✅ Finalizando /api/contact`);

    // Respuesta segura
    const response = NextResponse.json({
      success: true,
      requestId: reqId,
      support: supportRes,
      client: clientRes,
      newsletter: newsletterRes,
    });

    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://www.nopainnumbing.net",
    );
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    response.headers.set("Cache-Control", "no-store, max-age=0");

    return response;
  } catch (error) {
    console.error(`[${now()}] [${reqId}] ❌ Error en /api/contact:`, error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 },
    );
  }
}

// --- HANDLER OPTIONS (preflight CORS) ---
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
