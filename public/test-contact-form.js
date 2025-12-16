// 🧪 TEST SCRIPT - Verifica que el contact form funciona
// Ejecuta esto desde la consola del navegador en https://www.nopainnumbing.net/contact

async function testContactForm() {
  console.log("🔄 Iniciando test de contact form...\n");

  const testData = {
    nombre: "Test User - " + new Date().toLocaleTimeString(),
    email: "test@example.com",
    mensaje: "This is a legitimate test message from contact form testing. It should be processed correctly.",
    newsletter: false,
  };

  try {
    console.log("📤 Enviando request a /api/contact con data:", testData);
    
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    console.log(`📊 Status: ${response.status}`);
    
    const jsonResponse = await response.json();
    console.log("📨 Response JSON:", jsonResponse);

    if (response.ok && jsonResponse.success) {
      console.log("✅ TEST EXITOSO - El formulario está funcionando!");
      console.log("Request ID:", jsonResponse.requestId);
      console.log("Email enviado a soporte:", jsonResponse.support?.ok);
      return true;
    } else {
      console.error("❌ TEST FALLIDO - Respuesta no exitosa:", jsonResponse);
      return false;
    }
  } catch (error) {
    console.error("❌ ERROR en fetch:", error);
    return false;
  }
}

// Ejecuta el test
testContactForm();
