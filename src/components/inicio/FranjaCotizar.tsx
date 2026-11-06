import { BotonWhatsApp } from "@/components/ui/BotonWhatsApp";

// Franja dorada final: repite la acción principal antes del pie de página.
// Fondo dorado con texto negro (la combinación permitida).
export function FranjaCotizar() {
  return (
    <section aria-labelledby="titulo-franja" className="bg-dorado px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <h2
          id="titulo-franja"
          className="font-titulo text-3xl font-extrabold uppercase text-negro sm:text-4xl"
        >
          ¿Necesitas dotación para tu equipo?
        </h2>
        <BotonWhatsApp variante="negro" />
      </div>
    </section>
  );
}
