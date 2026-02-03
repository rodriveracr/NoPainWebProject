export const metadata = {
  title: "Region Restricted | NoPain",
};

export default function BlockedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 py-16 text-center text-white">
      <div className="max-w-2xl space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
          Maintenance Mode
        </p>
        <h1 className="text-3xl font-semibold sm:text-4xl">
          This page is currently undergoing maintenance.
        </h1>
        <p className="text-base text-gray-300">
          Our team is updating the experience for visitors in this region. Please
          check back soon.
        </p>
        <div className="rounded-lg border border-gray-700 bg-white/5 p-6 text-left text-sm leading-relaxed text-gray-200">
          <p className="font-semibold text-white">Mensaje en español</p>
          <p>
            Esta página se encuentra en mantenimiento para visitantes de esta
            región. Estamos trabajando en mejoras y pronto volverá a estar
            disponible.
          </p>
        </div>
        <p className="text-sm text-gray-400">
          ¿Necesitas soporte? Contáctanos por los canales habituales mientras
          restauramos el servicio.
        </p>
      </div>
    </main>
  );
}
