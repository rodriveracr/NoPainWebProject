//src/app/[locale]/xteri-numb/layout.tsx
export default function XteriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="font-franklin bg-black text-white selection:bg-pink-500 selection:text-white"
      lang="es"
    >
      {children}
    </div>
  );
}
