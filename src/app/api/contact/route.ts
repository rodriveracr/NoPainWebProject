// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

type Body = {
  nombre?: string;
  email?: string;
  mensaje?: string;
  newsletter?: boolean;
  website?: string;
};

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

async function sendBrevoEmail(
  senderName: string,
  fromEmail: string,
  toEmail: string,
  subject: string,
  html: string
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
    return { ok: false, status: 401, body: { message: "Missing BREVO_API_KEY" } };
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
    try { parsed = JSON.parse(text); } catch { /* keep text */ }

    return { ok: res.ok, status: res.status, body: parsed };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

export async function POST(req: Request) {
  const reqId = makeRequestId();
  try {
    // lee el body como texto primero (más robusto)
    const raw = await req.text().catch(() => "");
    console.log(`[${now()}] [${reqId}] 📩 RAW body length: ${raw?.length ?? 0}`);

    // parsear con manejo de errores
    let body: Body = {};
    if (!raw || raw.trim() === "") {
      console.log(`[${now()}] [${reqId}] ⚠️ Body vacío recibid0.`);
      return NextResponse.json({ error: "Body vacío o inválido" }, { status: 400 });
    }
    try {
      body = JSON.parse(raw) as Body;
    } catch (err) {
      console.error(`[${now()}] [${reqId}] ❌ JSON inválido:`, raw);
      return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
    }

    console.log(`[${now()}] [${reqId}] 📩 /api/contact received:`, { ...body, mensaje: body.mensaje ? `<<${String(body.mensaje).length} chars>>` : undefined });

    const { nombre, email, mensaje, newsletter, website } = body;

    // honeypot
    if (website) {
      console.log(`[${now()}] [${reqId}] 🕵️ Honeypot triggered`);
      return NextResponse.json({ success: true });
    }

    if (!nombre || !email || !mensaje) {
      console.log(`[${now()}] [${reqId}] ⚠️ Datos incompletos`);
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    // sanitize
    const safeNombre = escapeHtml(nombre);
    const safeEmail = escapeHtml(email);
    const safeMensaje = escapeHtml(mensaje);

    const FROM_EMAIL = String(process.env.CONTACT_EMAIL || "customercare@nopainnumbing.net");
    const CONTACT_EMAIL = FROM_EMAIL;

    const supportHtml = `
      <h3>Nuevo mensaje recibido</h3>
      <p><b>Nombre:</b> ${safeNombre}</p>
      <p><b>Email:</b> ${safeEmail}</p>
      <p><b>Mensaje:</b></p>
      <p>${safeMensaje}</p>
    `;

    console.log(`[${now()}] [${reqId}] ⏳ Enviando email soporte a Brevo...`);
    const supportRes = await sendBrevoEmail("No Pain Contact", FROM_EMAIL, CONTACT_EMAIL, `📩 Nuevo mensaje - ${safeNombre}`, supportHtml);
    console.log(`[${now()}] [${reqId}] 📨 Respuesta Brevo (soporte):`, supportRes);

    let clientRes: any = null;
    if (supportRes && supportRes.ok) {
      console.log(`[${now()}] [${reqId}] ⏳ Enviando confirmación al cliente...`);
      const clientHtml = `<p>Hola ${safeNombre},</p>
        <p>Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos lo antes posible.</p>
        <br/><p>— Equipo No Pain</p>`;
      clientRes = await sendBrevoEmail("No Pain Team", FROM_EMAIL, safeEmail, "✅ Hemos recibido tu mensaje", clientHtml);
      console.log(`[${now()}] [${reqId}] 📨 Respuesta Brevo (client):`, clientRes);
    } else {
      console.warn(`[${now()}] [${reqId}] ⚠️ Soporte NO aceptado por Brevo, omitida confirmación cliente.`);
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
        try { newsletterRes = JSON.parse(text); } catch { newsletterRes = text; }
        console.log(`[${now()}] [${reqId}] 📨 Respuesta newsletter:`, contactsRes.status, newsletterRes);
      } catch (err) {
        console.error(`[${now()}] [${reqId}] ❌ Error newsletter:`, err);
      }
    }

    console.log(`[${now()}] [${reqId}] ✅ Finalizando /api/contact`);
    return NextResponse.json({
      success: true,
      requestId: reqId,
      support: supportRes,
      client: clientRes,
      newsletter: newsletterRes,
    });
  } catch (error) {
    console.error(`[${now()}] [${reqId}] ❌ Error en /api/contact:`, error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
