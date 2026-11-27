import { ImagenSuave } from "@/components/ui/ImagenSuave";
import Link from "next/link";
import { BotonEnlace, clasesBoton } from "@/components/ui/Boton";
import { portadaDeCategoria, productosDeCategoria, rutaImagen } from "@/lib/catalogo";
import type { categorias } from "@/lib/contenido";

type Categoria = (typeof categorias)[number];

// Tarjeta de una categoría: portada (foto de un producto representativo), nombre y dos botones.
// TODA la tarjeta es clicable: el enlace "Ver productos" se estira sobre la tarjeta con ::after
// (así no hay un enlace dentro de otro). El botón "Cotizar" queda por encima (z-10).
// Si la categoría no tiene productos en el portafolio, la portada es un bloque de color
// y el texto invita a pedir cotización (sin inventar productos).
export function TarjetaCategoria({
  categoria,
  indice,
}: {
  categoria: Categoria;
  indice: number;
}) {
  const portada = portadaDeCategoria(categoria.slug);
  const cantidad = productosDeCategoria(categoria.slug).length;
  const dorado = indice % 2 === 0;

  return (
    <li data-escalon className="group relative flex flex-col overflow-hidden rounded border border-blanco/10 bg-carbon transition-[transform,box-shadow,border-color] duration-200 ease-out motion-safe:hover:-translate-y-[3px] hover:border-dorado/60 hover:shadow-[0_10px_24px_rgba(0,0,0,0.5)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-crema">
        {portada ? (
          <ImagenSuave
            src={rutaImagen(portada.archivo)}
            alt={portada.alt}
            fill
            sizes="(min-width: 1184px) 270px, (min-width: 1024px) 23vw, (min-width: 768px) 46vw, 78vw"
            className="object-contain p-4 transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03]"
          />
        ) : (
          // TODO(contenido): foto de la categoría. Mientras tanto, bloque de color (el dorado va como fondo con texto negro).
          <div
            aria-hidden="true"
            className={`flex h-full items-end p-4 ${dorado ? "bg-dorado text-negro" : "bg-carbon-claro text-blanco"}`}
          >
            <span className="font-titulo text-2xl font-bold uppercase leading-tight">
              Pídenos cotización
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-titulo text-xl font-bold uppercase leading-tight text-blanco">
          {categoria.nombre}
        </h3>
        <p className="text-blanco/75">{categoria.descripcion}</p>
        <p className="flex-1 text-sm font-bold text-blanco">
          {cantidad > 0
            ? `${cantidad} ${cantidad === 1 ? "producto" : "productos"} en el portafolio`
            : "Pídenos cotización de esta categoría"}
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/productos/${categoria.slug}`}
            className={clasesBoton("dorado", "after:absolute after:inset-0", false)}
          >
            Ver productos
            <span className="sr-only"> de {categoria.nombre}</span>
          </Link>
          <BotonEnlace
            href={`/cotizacion?categoria=${categoria.slug}`}
            variante="contornoClaro"
            className="relative z-10"
          >
            Cotizar
            <span className="sr-only"> {categoria.nombre}</span>
          </BotonEnlace>
        </div>
      </div>
    </li>
  );
}
