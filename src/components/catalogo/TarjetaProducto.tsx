import Image from "next/image";
import Link from "next/link";
import { BotonEnlace, clasesBoton } from "@/components/ui/Boton";
import { rutaImagen, type Producto } from "@/lib/catalogo";

// Tarjeta de un producto: foto, nombre, frase corta y dos botones.
// Toda la tarjeta es clicable (el enlace "Ver detalle" se estira con ::after);
// "Cotizar" queda por encima y lleva el producto ya elegido al formulario.
export function TarjetaProducto({ producto }: { producto: Producto }) {
  const foto = producto.imagenes[0];
  return (
    <li className="group relative flex flex-col overflow-hidden rounded border border-negro/15 bg-blanco transition-[transform,box-shadow] duration-200 ease-out motion-safe:hover:-translate-y-[3px] hover:shadow-[0_10px_24px_rgba(17,17,17,0.12)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-crema">
        {foto ? (
          <Image
            src={rutaImagen(foto.archivo)}
            alt={foto.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-4 transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03]"
          />
        ) : (
          // TODO(contenido): foto del producto.
          <div className="flex h-full items-end bg-negro p-4 font-titulo text-2xl font-bold uppercase text-blanco">
            {producto.nombre}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-titulo text-xl font-bold uppercase leading-tight text-negro">
          {producto.nombre}
        </h3>
        <p className="flex-1 text-gris">{producto.resumen}</p>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/productos/${producto.categoria}/${producto.slug}`}
            className={clasesBoton("negro", "after:absolute after:inset-0", false)}
          >
            Ver detalle
            <span className="sr-only"> de {producto.nombre}</span>
          </Link>
          <BotonEnlace
            href={`/cotizacion?categoria=${producto.categoria}&producto=${producto.slug}`}
            variante="contorno"
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
