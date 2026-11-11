import Image from "next/image";
import emblema from "../../../public/marca/fesapy-emblema.jpg";
import { empresa } from "@/lib/contenido";

// Emblema + nombre. Se usa en el encabezado y en el pie de página (ambos negros:
// el emblema tiene fondo negro, así que se funde con ellos).
//
// "import emblema from ...jpg" (importación estática): Next.js lee el ancho y el
// alto del archivo y reserva el espacio, así la página no "salta" al cargar.

export function Logo() {
  return (
    <span className="flex items-center gap-3">
      <Image
        src={emblema}
        // El nombre ya está escrito al lado, por eso el alt es corto.
        alt={`Emblema de ${empresa.nombre}`}
        sizes="56px"
        // Arriba en la página: se pide de inmediato (eager). Sin "preload": ese aviso al
        // navegador queda solo para la primera foto del hero.
        loading="eager"
        className="size-12 rounded-full sm:size-14"
      />
      <span className="flex flex-col font-titulo uppercase leading-none text-blanco">
        <span className="text-2xl font-extrabold tracking-wide sm:text-3xl">
          {empresa.nombreCorto}
        </span>
        {/* Dorado como texto: permitido porque va sobre fondo negro. */}
        <span className="text-sm font-semibold tracking-[0.2em] text-dorado sm:text-base">
          Distribuciones
        </span>
      </span>
    </span>
  );
}
