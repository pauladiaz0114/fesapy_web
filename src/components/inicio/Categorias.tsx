import { BotonEnlace } from "@/components/ui/Boton";
import { categorias } from "@/lib/contenido";

// Las 8 categorías de docs/BRIEF.md. Cada tarjeta lleva a /cotizacion?categoria=<slug>,
// y el formulario la deja preseleccionada.
// Sin fotos propias todavía: cada tarjeta tiene un bloque de color con el nombre.
// TODO(contenido): foto de cada categoría (propia o con autorización del fabricante).
export function Categorias({ titulo = "Lo que tu empresa puede cotizar" }: { titulo?: string }) {
  return (
    <section aria-labelledby="titulo-categorias" className="bg-blanco px-4 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h2
          id="titulo-categorias"
          className="font-titulo text-3xl font-bold uppercase text-negro sm:text-4xl"
        >
          {titulo}
        </h2>
        <p className="mt-2 max-w-2xl text-lg text-gris">
          Elige una categoría y cuéntanos qué necesitas. No mostramos precios: cada empresa
          recibe su cotización.
        </p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map((categoria, i) => {
            // Fondos alternados tipo tablero: dorado con texto negro, o negro con texto blanco.
            const dorado = (i + Math.floor(i / 4)) % 2 === 0;
            return (
              <li
                key={categoria.slug}
                className="flex flex-col overflow-hidden rounded border border-negro/15 bg-blanco"
              >
                {/* TODO(contenido): foto de la categoría (se reemplaza este bloque). */}
                <div
                  className={`flex aspect-video items-end p-4 ${
                    dorado ? "bg-dorado text-negro" : "bg-negro text-blanco"
                  }`}
                >
                  <span className="font-titulo text-2xl font-bold uppercase leading-tight">
                    {categoria.nombre}
                  </span>
                </div>
                <div className="flex flex-1 flex-col items-start gap-4 p-4">
                  <p className="flex-1 text-gris">{categoria.descripcion}</p>
                  <BotonEnlace
                    href={`/cotizacion?categoria=${categoria.slug}`}
                    variante="contorno"
                  >
                    Cotizar
                    <span className="sr-only"> {categoria.nombre}</span>
                  </BotonEnlace>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
