import { CarruselCategorias } from "@/components/catalogo/CarruselCategorias";
import { TarjetaCategoria } from "@/components/catalogo/TarjetaCategoria";
import { BotonEnlace } from "@/components/ui/Boton";
import { categorias } from "@/lib/contenido";
import { Reveal } from "@/components/ui/Reveal";

// Las 7 categorías (docs/BRIEF.md §2). Cada tarjeta lleva a /productos/<categoria> (los productos
// del portafolio) y tiene un botón "Cotizar" que lleva a /cotizacion?categoria=<slug>.
// Se usa en la home y en /productos. Todo el sitio es oscuro desde el 2026-11-26.
export function Categorias({
  titulo = "Lo que tu empresa puede cotizar",
  id = "titulo-categorias",
}: {
  titulo?: string;
  id?: string;
}) {
  // Las dos últimas palabras del título van en dorado (permitido: el fondo es negro).
  const palabras = titulo.split(" ");
  const resaltado = palabras.slice(-2).join(" ");
  const inicio = palabras.slice(0, -2).join(" ");

  return (
    <>
      <section aria-labelledby={id} className="bg-negro px-4 py-14 text-blanco sm:py-16">
        <Reveal escalonar className="mx-auto max-w-6xl">
          <h2 id={id} className="font-titulo text-3xl font-bold uppercase sm:text-5xl">
            {inicio && <>{inicio} </>}
            <span className="text-dorado">{resaltado}</span>
          </h2>
          <p className="mt-2 max-w-2xl text-lg text-blanco/80">
            Elige una categoría para ver los productos de nuestro portafolio. No mostramos precios:
            cada empresa recibe su cotización.
          </p>

          <div className="mt-10">
            {/* En celular es un carrusel con scroll-snap; desde 768 px, una grilla. */}
            <CarruselCategorias total={categorias.length}>
              {categorias.map((categoria, i) => (
                <TarjetaCategoria key={categoria.slug} categoria={categoria} indice={i} />
              ))}
            </CarruselCategorias>
          </div>
        </Reveal>
      </section>

      {/* Para lo que no aparece en las tarjetas: franja dorada de lado a lado (texto negro).
          Sin prometer inventario ni plazos. */}
      <section aria-labelledby={`${id}-no-ves`} className="bg-dorado px-4 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              id={`${id}-no-ves`}
              className="font-titulo text-3xl font-bold uppercase text-negro sm:text-4xl"
            >
              ¿No ves lo que buscas?
            </h2>
            <p className="text-lg text-negro">Cuéntanos qué necesitas y te cotizamos.</p>
          </div>
          <BotonEnlace href="/cotizacion" variante="negro" className="shrink-0">
            Cuéntanos qué necesitas
          </BotonEnlace>
        </div>
      </section>
    </>
  );
}
