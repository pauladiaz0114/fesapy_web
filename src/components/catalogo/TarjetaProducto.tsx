import { ImagenSuave } from "@/components/ui/ImagenSuave";
import Link from "next/link";
import { BotonEnlace, clasesBoton } from "@/components/ui/Boton";
import { rutaImagen, type Producto } from "@/lib/catalogo";

// Tarjeta de un producto: foto, nombre, frase corta y dos botones.
// Toda la tarjeta es clicable (el enlace "Ver detalle" se estira con ::after);
// "Cotizar" queda por encima y lleva el producto ya elegido al formulario.
export function TarjetaProducto({ producto }: { producto: Producto }) {
  const foto = producto.imagenes[0];
  return (
    <li data-escalon className="group relative flex flex-col overflow-hidden rounded border border-blanco/10 bg-carbon transition-[transform,box-shadow,border-color] duration-200 ease-out motion-safe:hover:-translate-y-[3px] hover:border-dorado/60 hover:shadow-[0_10px_24px_rgba(0,0,0,0.5)]">
      {/* Marco claro: las fotos del portafolio tienen fondo transparente y se leen mejor así. */}
      <div className="relative aspect-[4/3] overflow-hidden bg-crema">
        {foto ? (
          <ImagenSuave
            src={rutaImagen(foto.archivo)}
            alt={foto.alt}
            fill
            sizes="(min-width: 1184px) 270px, (min-width: 1024px) 23vw, (min-width: 640px) 46vw, calc(100vw - 32px)"
            className="object-contain p-4 transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03]"
          />
        ) : (
          // TODO(contenido): foto del producto.
          <div className="flex h-full items-end bg-carbon-claro p-4 font-titulo text-2xl font-bold uppercase text-blanco">
            {producto.nombre}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-titulo text-xl font-bold uppercase leading-tight text-blanco">
          {producto.nombre}
        </h3>
        <p className="flex-1 text-blanco/75">{producto.resumen}</p>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/productos/${producto.categoria}/${producto.slug}`}
            className={clasesBoton("dorado", "after:absolute after:inset-0", false)}
          >
            Ver detalle
            <span className="sr-only"> de {producto.nombre}</span>
          </Link>
          <BotonEnlace
            href={`/cotizacion?categoria=${producto.categoria}&producto=${producto.slug}`}
            variante="contornoClaro"
            className="relative z-10"
          >
            Cotizar
            <span className="sr-only"> {producto.nombre}</span>
          </BotonEnlace>
        </div>
      </div>
    </li>
  );
}
