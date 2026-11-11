"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef } from "react";

// Imagen de next/image que aparece con un fundido corto (300 ms) cuando termina de cargar.
// Mientras carga se ve el fondo del marco que la contiene (crema): nunca un hueco blanco.
//
// Por qué es seguro:
// - El servidor no pone nada que la oculte: si JavaScript falla, la imagen se ve normal.
// - Ya en el navegador, SOLO si la imagen todavía no ha cargado, se marca data-carga="pendiente"
//   (transparente). Al cargar (o si falla) pasa a "lista" con la transición y luego se quita el
//   atributo (así el hover de las tarjetas, que agranda la foto, conserva su propia transición).
// - Solo cambia la opacidad: el tamaño lo reserva el marco (fill + aspect-ratio), CLS 0.
// - Con "reducir movimiento" aparece de una vez (interruptor general de globals.css).
// Las reglas de CSS están en globals.css ([data-carga]).
export function ImagenSuave(props: ImageProps) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (!img || (img.complete && img.naturalWidth > 0)) return;

    img.dataset.carga = "pendiente";
    let temporizador: ReturnType<typeof setTimeout> | undefined;
    const lista = () => {
      img.dataset.carga = "lista";
      temporizador = setTimeout(() => delete img.dataset.carga, 400);
    };
    img.addEventListener("load", lista, { once: true });
    img.addEventListener("error", lista, { once: true });
    return () => {
      img.removeEventListener("load", lista);
      img.removeEventListener("error", lista);
      clearTimeout(temporizador);
      delete img.dataset.carga;
    };
  }, [props.src]);

  // alt llega en props (next/image lo exige); la regla de lint no lo ve dentro del spread.
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image ref={ref} {...props} />;
}
