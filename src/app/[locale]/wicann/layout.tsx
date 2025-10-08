// 📄 /src/app/[locale]/wicann/layout.tsx
export default function WicannLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="font-franklin">{children}</div>;
}
