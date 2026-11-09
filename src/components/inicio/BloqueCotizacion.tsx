import { BotonEnlace } from "@/components/ui/Boton";

// Franja dorada que invita a cotizar. Fondo dorado con texto negro (la combinación permitida).
export function BloqueCotizacion() {
  return (
    <section aria-labelledby="titulo-cotizacion" className="bg-dorado px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2
            id="titulo-cotizacion"
            className="font-titulo text-3xl font-bold uppercase text-negro sm:text-4xl"
          >
            Solicita tu cotización
          </h2>
          <p className="mt-2 text-lg text-negro">
            Llena el formulario con lo que necesita tu equipo y envíanoslo por WhatsApp o por
            correo. Es rápido y no tienes que crear ninguna cuenta.
          </p>
        </div>
        <BotonEnlace href="/cotizacion" variante="negro" className="shrink-0">
          Ir al formulario
        </BotonEnlace>
      </div>
    </section>
  );
}
