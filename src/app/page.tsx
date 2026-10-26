// Página provisional mientras se construye el sitio (Día 2 la reemplaza).
export default function Inicio() {
  return (
    <main className="flex flex-1 flex-col bg-negro text-blanco">
      <div
        aria-hidden="true"
        className="h-4 bg-[repeating-linear-gradient(-45deg,var(--amarillo)_0_16px,var(--negro)_16px_32px)]"
      />
      <section className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <h1 className="font-titulo text-5xl font-extrabold uppercase tracking-wide sm:text-7xl">
          <span className="text-amarillo">Fesapy</span> — sitio en construcción
        </h1>
        <p className="max-w-xl text-lg">
          Todo lo que tu empresa necesita en seguridad, en un solo lugar.
        </p>
        <p className="rounded bg-amarillo px-4 py-2 font-titulo text-xl font-bold uppercase text-negro">
          Muy pronto
        </p>
      </section>
      <div
        aria-hidden="true"
        className="h-4 bg-[repeating-linear-gradient(-45deg,var(--amarillo)_0_16px,var(--negro)_16px_32px)]"
      />
    </main>
  );
}
