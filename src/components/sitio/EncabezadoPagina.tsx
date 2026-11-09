import type { ReactNode } from "react";

// Franja crema con el título (h1) de las páginas internas. Cada página tiene UN solo h1.
export function EncabezadoPagina({ titulo, children }: { titulo: string; children?: ReactNode }) {
  return (
    <section className="bg-crema px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="border-l-4 border-dorado pl-4 font-titulo text-4xl font-bold uppercase leading-tight text-negro sm:text-5xl">
          {titulo}
        </h1>
        {children && <div className="mt-4 max-w-2xl text-lg text-gris">{children}</div>}
      </div>
    </section>
  );
}
