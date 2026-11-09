import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GaleriaProducto } from "@/components/catalogo/GaleriaProducto";
import { ItemConTitulo } from "@/components/catalogo/ItemConTitulo";
import { Migas } from "@/components/catalogo/Migas";
import { TarjetaProducto } from "@/components/catalogo/TarjetaProducto";
import { BotonEnlace } from "@/components/ui/Boton";
import { productoDeCategoria, productos, productosRelacionados } from "@/lib/catalogo";
import { categorias } from "@/lib/contenido";

type Props = { params: Promise<{ categoria: string; producto: string }> };

// Todos los productos se preparan al construir el sitio (páginas estáticas).
export function generateStaticParams() {
  return productos.map((p) => ({ categoria: p.categoria, producto: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria, producto: slug } = await params;
  const producto = productoDeCategoria(categoria, slug);
  if (!producto) return {};
  return {
    title: producto.nombre,
    description: `${producto.resumen} Cotiza ${producto.nombre} en Fesapy Distribuciones por WhatsApp o por correo.`,
  };
}

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-titulo text-2xl font-bold uppercase text-negro">{titulo}</h2>
      {children}
    </section>
  );
}

function Vinetas({ items }: { items: string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-6 text-gris marker:text-negro">
      {items.map((t) => (
        <li key={t}>
          <ItemConTitulo texto={t} />
        </li>
      ))}
    </ul>
  );
}

export default async function PaginaProducto({ params }: Props) {
  const { categoria: slugCategoria, producto: slugProducto } = await params;
  const producto = productoDeCategoria(slugCategoria, slugProducto);
  const categoria = categorias.find((c) => c.slug === slugCategoria);
  if (!producto || !categoria) notFound(); // categoría o producto inválido → 404

  const relacionados = productosRelacionados(producto);
  const hrefCotizar = `/cotizacion?categoria=${producto.categoria}&producto=${producto.slug}`;

  return (
    <>
      <section className="bg-crema px-4 pt-8 pb-10 sm:pt-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4">
          <Migas
            items={[
              { texto: "Inicio", href: "/" },
              { texto: "Productos", href: "/productos" },
              { texto: categoria.nombre, href: `/productos/${categoria.slug}` },
              { texto: producto.nombre },
            ]}
          />
          <h1 className="border-l-4 border-dorado pl-4 font-titulo text-3xl font-bold uppercase leading-tight text-negro sm:text-5xl">
            {producto.nombre}
          </h1>
        </div>
      </section>

      <section className="bg-blanco px-4 py-10 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-start">
          <GaleriaProducto nombre={producto.nombre} imagenes={producto.imagenes} />

          <div className="flex flex-col gap-6">
            {producto.descripcion.length > 0 ? (
              <div className="flex flex-col gap-4 text-lg text-gris">
                {producto.descripcion.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            ) : (
              <p className="text-lg text-gris">{producto.resumen}</p>
            )}

            {producto.usos && (
              <Seccion titulo="Usos recomendados">
                <p className="text-gris">{producto.usos.intro}</p>
                <Vinetas items={producto.usos.items} />
              </Seccion>
            )}

            <div className="flex flex-wrap gap-3">
              <BotonEnlace href={hrefCotizar} variante="negro">
                Cotizar este producto
              </BotonEnlace>
              <BotonEnlace href={`/productos/${categoria.slug}`} variante="contorno">
                Ver más de {categoria.nombre}
              </BotonEnlace>
            </div>
            <p className="text-sm text-gris">
              No mostramos precios: cada empresa recibe su cotización por WhatsApp o por correo.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-10">
          {producto.modelos.length > 0 && (
            <Seccion titulo="Referencias del portafolio">
              <ul className="grid gap-4 md:grid-cols-2">
                {producto.modelos.map((m) => (
                  <li key={m.nombre} className="flex flex-col gap-3 rounded border-t-4 border-dorado bg-crema p-5">
                    <h3 className="font-titulo text-xl font-bold uppercase leading-tight text-negro">
                      {m.nombre}
                    </h3>
                    <p className="text-gris">{m.descripcion}</p>
                    {m.caracteristicas && <Vinetas items={m.caracteristicas} />}
                  </li>
                ))}
              </ul>
            </Seccion>
          )}

          {(producto.caracteristicas.length > 0 || producto.diferenciadores.length > 0) && (
            <div
              className={`grid gap-10 ${
                producto.caracteristicas.length > 0 && producto.diferenciadores.length > 0 ? "md:grid-cols-2" : ""
              }`}
            >
              {producto.caracteristicas.length > 0 && (
                <Seccion titulo="Características">
                  <Vinetas items={producto.caracteristicas} />
                </Seccion>
              )}
              {producto.diferenciadores.length > 0 && (
                <Seccion titulo="Diferenciadores">
                  <Vinetas items={producto.diferenciadores} />
                </Seccion>
              )}
            </div>
          )}

          {producto.normas && (
            <Seccion titulo="Normas">
              <p className="text-sm font-bold text-negro">Normas indicadas en el portafolio de Fesapy</p>
              <p className="text-gris">{producto.normas}</p>
            </Seccion>
          )}
        </div>
      </section>

      {relacionados.length > 0 && (
        <section aria-labelledby="titulo-relacionados" className="bg-crema px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <h2
              id="titulo-relacionados"
              className="font-titulo text-3xl font-bold uppercase text-negro sm:text-4xl"
            >
              Productos relacionados
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relacionados.map((p) => (
                <TarjetaProducto key={p.slug} producto={p} />
              ))}
            </ul>
            <p className="mt-6">
              <Link
                href={`/productos/${categoria.slug}`}
                className="inline-flex min-h-11 items-center font-bold text-negro underline underline-offset-4 hover:text-gris focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-negro"
              >
                Ver todos los productos de {categoria.nombre}
              </Link>
            </p>
          </div>
        </section>
      )}
    </>
  );
}
