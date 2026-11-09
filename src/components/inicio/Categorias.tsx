import { TarjetaCategoria } from "@/components/catalogo/TarjetaCategoria";
import { BotonEnlace } from "@/components/ui/Boton";
import { categorias } from "@/lib/contenido";
import { Reveal } from "@/components/ui/Reveal";

// Las 8 categorías (docs/BRIEF.md §2). Cada tarjeta lleva a /productos/<categoria> (los productos
// del portafolio) y tiene un botón "Cotizar" que lleva a /cotizacion?categoria=<slug>.
// Se usa en la home y en /productos.
export function Categorias({
  titulo = "Lo que tu empresa puede cotizar",
  id = "titulo-categorias",
}: {
  titulo?: string;
  id?: string;
}) {
  return (
    <section aria-labelledby={id} className="bg-blanco px-4 py-14 sm:py-16">
      <Reveal className="mx-auto max-w-6xl">
        <h2 id={id} className="font-titulo text-3xl font-bold uppercase text-negro sm:text-4xl">
          {titulo}
        </h2>
        <p className="mt-2 max-w-2xl text-lg text-gris">
          Elige una categoría para ver los productos de nuestro portafolio. No mostramos precios:
          cada empresa recibe su cotización.
        </p>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map((categoria, i) => (
            <TarjetaCategoria key={categoria.slug} categoria={categoria} indice={i} />
          ))}
        </ul>

        {/* Para lo que no aparece en las tarjetas. Sin prometer inventario ni plazos. */}
        <div className="mt-10 flex flex-col items-start gap-4 rounded border-l-4 border-dorado bg-crema p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg text-negro">
            <strong>¿No ves lo que buscas?</strong> Cuéntanos qué necesitas y te cotizamos.
          </p>
          <BotonEnlace href="/cotizacion" variante="negro" className="shrink-0">
            Cuéntanos qué necesitas
          </BotonEnlace>
        </div>
      </Reveal>
    </section>
  );
}
