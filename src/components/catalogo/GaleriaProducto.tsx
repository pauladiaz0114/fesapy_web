"use client";

import Image from "next/image";
import { useState } from "react";
import { rutaImagen, type ImagenProducto } from "@/lib/catalogo";

// Foto grande del producto y, si hay varias, miniaturas para cambiarla.
// Las fotos vienen del portafolio de Fesapy y tienen fondo transparente: se muestran
// completas (object-contain) sobre un fondo crema, con un marco de proporción fija
// para que la página no "salte" al cambiar de foto.
export function GaleriaProducto({ nombre, imagenes }: { nombre: string; imagenes: ImagenProducto[] }) {
  const [actual, setActual] = useState(0);
  const foto = imagenes[actual];

  if (!foto) {
    // TODO(contenido): foto del producto.
    return (
      <div className="flex aspect-square items-end bg-negro p-6 font-titulo text-3xl font-bold uppercase text-blanco">
        {nombre}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded border border-negro/15 bg-crema">
        <Image
          // key: al cambiar de foto, React crea un <Image> nuevo y no se ve la anterior estirada.
          key={foto.archivo}
          src={rutaImagen(foto.archivo)}
          alt={foto.alt}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-contain p-6"
          preload={actual === 0}
        />
      </div>

      {imagenes.length > 1 && (
        <ul className="flex flex-wrap gap-2" aria-label={`Fotos de ${nombre}`}>
          {imagenes.map((img, i) => (
            <li key={img.archivo}>
              <button
                type="button"
                onClick={() => setActual(i)}
                aria-label={`Ver foto ${i + 1} de ${imagenes.length}`}
                aria-pressed={i === actual}
                className={`relative block size-16 overflow-hidden rounded border-2 bg-crema transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-negro sm:size-20 ${
                  i === actual ? "border-negro" : "border-negro/20 hover:border-negro/60"
                }`}
              >
                <Image
                  src={rutaImagen(img.archivo)}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-contain p-1"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
