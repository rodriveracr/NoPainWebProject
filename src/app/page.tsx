// 📄 /src/app/page.tsx
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const h = await headers();
  const accept = h.get("accept-language") || "";
  const preferred = accept.split(",")[0]?.split(";")[0]?.split("-")[0] || "es";
  const lang = preferred === "en" ? "en" : "es";

  redirect(`/${lang}`);
}
