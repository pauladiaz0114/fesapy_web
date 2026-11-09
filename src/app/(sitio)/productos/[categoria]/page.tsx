import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChipsCategorias } from "@/components/catalogo/ChipsCategorias";
import { Migas } from "@/components/catalogo/Migas";
import { TarjetaProducto } from "@/components/catalogo/TarjetaProducto";
import { EncabezadoPagina } from "@/components/sitio/EncabezadoPagina";
import { BotonEnlace } from "@/components/ui/Boton";
import { BotonWhatsApp } from "@/components/ui/BotonWhatsApp";
import { productosDeCategoria } from "@/lib/catalogo";
import { categorias } from "@/lib/contenido";

type Props = { params: Promise<{ categoria: string }> };

// Todas las categorías se preparan al construir el sitio (páginas estáticas).
// Next.js 16 con cacheComponents exige devolver al menos un valor.
export function generateStaticParams() {
  return categorias.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria: slug } = await params;
  const categoria = categorias.find((c) => c.slug === slug);
  if (!categoria) return {};
  return {
    title: categoria.nombre,
    description: `${categoria.nombre} en Fesapy Distribuciones: ${categoria.descripcion} Cotiza por WhatsApp o por correo.`,
  };
}

export default async function PaginaCategoria({ params }: Props) {
  const { categoria: slug } = await params;
  const categoria = categorias.find((c) => c.slug === slug);
  if (!categoria) notFound(); // categoría inválida → 404

  const productos = productosDeCategoria(categoria.slug);

  return (
    <>
      <EncabezadoPagina titulo={categoria.nombre}>
        <p>{categoria.descripcion}</p>
      </EncabezadoPagina>
      <div className="bg-crema px-4 pb-4">
        <div className="mx-auto max-w-6xl">
          <Migas
            items={[
              { texto: "Inicio", href: "/" },
              { texto: "Productos", href: "/productos" },
              { texto: categoria.nombre },
            ]}
          />
        </div>
      </div>
      <ChipsCategorias actual={categoria.slug} />

      <section aria-label={`Productos de ${categoria.nombre}`} className="bg-blanco px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          {productos.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {productos.map((p) => (
                <TarjetaProducto key={p.slug} producto={p} />
              ))}
            </ul>
          ) : (
            // Categoría sin productos en el portafolio: no se inventa ninguno.
            <div className="max-w-2xl rounded border-l-4 border-dorado bg-crema p-6">
              <h2 className="font-titulo text-2xl font-bold uppercase text-negro">
                Pídenos cotización de esta categoría
              </h2>
              <p className="mt-2 text-lg text-gris">
                Todavía no tenemos productos de esta categoría publicados en el sitio. Cuéntanos
                qué necesitas y te cotizamos.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <BotonEnlace href={`/cotizacion?categoria=${categoria.slug}`} variante="negro">
                  Pedir cotización
                </BotonEnlace>
                <BotonWhatsApp variante="contorno" />
              </div>
            </div>
          )}

          {productos.length > 0 && (
            <div className="mt-10 flex flex-col items-start gap-4 rounded border-l-4 border-dorado bg-crema p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-lg text-negro">
                <strong>¿No ves lo que buscas?</strong> Cuéntanos qué necesitas y te cotizamos.
              </p>
              <BotonEnlace
                href={`/cotizacion?categoria=${categoria.slug}`}
                variante="negro"
                className="shrink-0"
              >
                Cuéntanos qué necesitas
              </BotonEnlace>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
