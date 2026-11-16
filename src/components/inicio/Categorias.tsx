import { CarruselCategorias } from "@/components/catalogo/CarruselCategorias";
import { TarjetaCategoria } from "@/components/catalogo/TarjetaCategoria";
import { BotonEnlace } from "@/components/ui/Boton";
import { categorias } from "@/lib/contenido";
import { Reveal } from "@/components/ui/Reveal";

// Las 7 categorías (docs/BRIEF.md §2). Cada tarjeta lleva a /productos/<categoria> (los productos
// del portafolio) y tiene un botón "Cotizar" que lleva a /cotizacion?categoria=<slug>.
// Se usa en la home (tema "oscuro", 2026-11-16) y en /productos (tema "claro", como antes).
export function Categorias({
  titulo = "Lo que tu empresa puede cotizar",
  id = "titulo-categorias",
  tema = "claro",
}: {
  titulo?: string;
  id?: string;
  tema?: "claro" | "oscuro";
}) {
  const oscuro = tema === "oscuro";
  // En el tema oscuro, las dos últimas palabras del título van en dorado (sobre fondo negro).
  const palabras = titulo.split(" ");
  const resaltado = palabras.slice(-2).join(" ");
  const inicio = palabras.slice(0, -2).join(" ");

  return (
    <>
      <section
        aria-labelledby={id}
        className={`px-4 py-14 sm:py-16 ${oscuro ? "bg-negro text-blanco" : "bg-blanco"}`}
      >
        <Reveal escalonar className="mx-auto max-w-6xl">
          <h2
            id={id}
            className={`font-titulo font-bold uppercase ${
              oscuro ? "text-3xl sm:text-5xl" : "text-3xl text-negro sm:text-4xl"
            }`}
          >
            {oscuro ? (
              <>
                {inicio} <span className="text-dorado">{resaltado}</span>
              </>
            ) : (
              titulo
            )}
          </h2>
          <p className={`mt-2 max-w-2xl text-lg ${oscuro ? "text-blanco/80" : "text-gris"}`}>
            Elige una categoría para ver los productos de nuestro portafolio. No mostramos precios:
            cada empresa recibe su cotización.
          </p>

          <div className="mt-10">
            {/* En celular es un carrusel con scroll-snap; desde 768 px, una grilla. */}
            <CarruselCategorias total={categorias.length} oscuro={oscuro}>
              {categorias.map((categoria, i) => (
                <TarjetaCategoria
                  key={categoria.slug}
                  categoria={categoria}
                  indice={i}
                  oscuro={oscuro}
                />
              ))}
            </CarruselCategorias>
          </div>

          {/* Para lo que no aparece en las tarjetas. Sin prometer inventario ni plazos. */}
          {!oscuro && (
            <div className="mt-10 flex flex-col items-start gap-4 rounded border-l-4 border-dorado bg-crema p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-lg text-negro">
                <strong>¿No ves lo que buscas?</strong> Cuéntanos qué necesitas y te cotizamos.
              </p>
              <BotonEnlace href="/cotizacion" variante="negro" className="shrink-0">
                Cuéntanos qué necesitas
              </BotonEnlace>
            </div>
          )}
        </Reveal>
      </section>

      {/* Tema oscuro: la invitación pasa a ser una franja dorada de lado a lado (texto negro). */}
      {oscuro && (
        <section aria-labelledby="titulo-no-ves" className="bg-dorado px-4 py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                id="titulo-no-ves"
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
      )}
    </>
  );
}
