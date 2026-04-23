export const metadata = {
  title: "Region Restricted | NoPain",
};

export default function BlockedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 py-16 text-center text-white">
      <div className="max-w-2xl space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
          Access Restricted
        </p>
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Access restricted for California visitors.
        </h1>
        <p className="text-base text-gray-300">
          This website is not available in California (United States) at this time.
        </p>
        <div className="rounded-lg border border-gray-700 bg-white/5 p-6 text-left text-sm leading-relaxed text-gray-200">
          <p className="font-semibold text-white">Mensaje en español</p>
          <p>
            El acceso a este sitio no está disponible en California (Estados Unidos)
            por el momento.
          </p>
        </div>
        <p className="text-sm text-gray-400">
          Need support? Contact us through our usual channels.
        </p>
      </div>
    </main>
  );
}
