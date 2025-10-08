//src/app/[locale]/no-pain-numbing-cream/layout.tsx
export default function ProductLayout({
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
