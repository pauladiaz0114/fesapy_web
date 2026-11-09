"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import botas from "../../../public/referencia/botas-seguridad.webp";
import casco from "../../../public/referencia/casco-epp.webp";
import dotacion from "../../../public/referencia/dotacion-reflectiva.webp";
import guantes from "../../../public/referencia/guantes-trabajo.webp";

// Carrusel del hero: UNA imagen grande que cambia sola, sin librerías (React + CSS).
// TODO(contenido): son fotos de REFERENCIA de Pexels (autores y licencia en
// docs/CREDITOS-IMAGENES.md). Reemplazar por fotos propias de Fesapy.
//
// Comportamiento:
// - Cambia cada 5 s con un fundido cruzado de 700 ms (solo opacidad).
// - Se pausa con el mouse encima, con el foco dentro, con la pestaña oculta y con el botón de pausa.
// - Con "reducir movimiento" (prefers-reduced-motion) NO cambia solo ni anima: solo puntos y flechas.
// - Marco de proporción fija (cuadrado): al cambiar de foto el diseño no se mueve.

type Foto = { src: StaticImageData; alt: string };

const fotos: Foto[] = [
  { src: botas, alt: "Botas de seguridad negras sobre piso mojado" },
  { src: casco, alt: "Casco, gafas de seguridad y tapabocas en un maniquí" },
  { src: dotacion, alt: "Trabajadores con dotación reflectiva y botas de caucho" },
  { src: guantes, alt: "Trabajador poniéndose guantes de carnaza" },
];

const INTERVALO_MS = 5000;

// useSyncExternalStore: la forma recomendada por React de leer algo que vive fuera de React
// (aquí, una preferencia del sistema y la visibilidad de la pestaña).
function useReduccionDeMovimiento(): boolean {
  return useSyncExternalStore(
    (avisar) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", avisar);
      return () => mq.removeEventListener("change", avisar);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

function usePestanaOculta(): boolean {
  return useSyncExternalStore(
    (avisar) => {
      document.addEventListener("visibilitychange", avisar);
      return () => document.removeEventListener("visibilitychange", avisar);
    },
    () => document.visibilityState === "hidden",
    () => false,
  );
}

function Flecha({ lado }: { lado: "izquierda" | "derecha" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-5"
    >
      <path d={lado === "izquierda" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}

export function HeroCarrusel() {
  const total = fotos.length;
  const [indice, setIndice] = useState(0);
  const [pausaMouse, setPausaMouse] = useState(false);
  const [pausaFoco, setPausaFoco] = useState(false);
  const [pausadoPorPersona, setPausadoPorPersona] = useState(false);
  const reducirMovimiento = useReduccionDeMovimiento();
  const pestanaOculta = usePestanaOculta();

  const automatico =
    !reducirMovimiento && !pausadoPorPersona && !pausaMouse && !pausaFoco && !pestanaOculta;

  // El temporizador se reinicia cada vez que cambia la foto (también al elegirla a mano),
  // así la persona siempre tiene los 5 s completos para mirarla.
  useEffect(() => {
    if (!automatico) return;
    const temporizador = setInterval(() => setIndice((i) => (i + 1) % total), INTERVALO_MS);
    return () => clearInterval(temporizador);
  }, [automatico, indice, total]);

  const irA = (n: number) => setIndice(((n % total) + total) % total);

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label="Fotos de productos de seguridad"
      className="relative"
      onMouseEnter={() => setPausaMouse(true)}
      onMouseLeave={() => setPausaMouse(false)}
      onFocus={() => setPausaFoco(true)}
      onBlur={(e) => {
        // Solo se reanuda si el foco salió de TODO el carrusel (no al pasar de un botón a otro).
        if (!e.currentTarget.contains(e.relatedTarget)) setPausaFoco(false);
      }}
    >
      {/* aria-live="off" mientras se mueve solo (no interrumpir al lector de pantalla);
          "polite" cuando la persona lo controla. */}
      <div
        aria-live={automatico ? "off" : "polite"}
        className="relative aspect-square w-full overflow-hidden rounded bg-crema"
      >
        {fotos.map((foto, i) => {
          const activa = i === indice;
          return (
            <div
              key={foto.alt}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${total}`}
              aria-hidden={!activa}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
                activa ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                // La primera foto se pide con prioridad (es lo primero que se ve); las demás
                // son perezosas. En Next.js 16, "preload" reemplaza a "priority".
                preload={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
                sizes="(min-width: 1024px) 548px, 100vw"
                className="object-cover"
              />
            </div>
          );
        })}

        {/* Flechas: discretas y solo en pantallas medianas y grandes. */}
        <button
          type="button"
          onClick={() => irA(indice - 1)}
          aria-label="Imagen anterior"
          className="absolute top-1/2 left-2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-negro/60 text-blanco transition-colors duration-200 hover:bg-negro focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blanco md:flex"
        >
          <Flecha lado="izquierda" />
        </button>
        <button
          type="button"
          onClick={() => irA(indice + 1)}
          aria-label="Imagen siguiente"
          className="absolute top-1/2 right-2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-negro/60 text-blanco transition-colors duration-200 hover:bg-negro focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blanco md:flex"
        >
          <Flecha lado="derecha" />
        </button>
      </div>

      {/* Puntos indicadores (botones de 44 px de alto; el punto visible es más pequeño). */}
      <div className="mt-1 flex items-center justify-center gap-1">
        {!reducirMovimiento && (
          <button
            type="button"
            onClick={() => setPausadoPorPersona((p) => !p)}
            aria-label={pausadoPorPersona ? "Reanudar el cambio automático de imágenes" : "Pausar el cambio automático de imágenes"}
            className="flex size-11 items-center justify-center rounded text-negro transition-colors duration-200 hover:bg-negro/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-negro"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="size-4"
            >
              {pausadoPorPersona ? (
                <path d="M8 5v14l11-7z" />
              ) : (
                <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
              )}
            </svg>
          </button>
        )}
        {fotos.map((foto, i) => (
          <button
            key={foto.alt}
            type="button"
            onClick={() => irA(i)}
            aria-label={`Ir a la imagen ${i + 1} de ${total}`}
            aria-current={i === indice}
            className="flex size-11 items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-negro"
          >
            {/* El punto activo es negro y alargado; los demás, anillos. Contraste alto sobre crema/blanco. */}
            <span
              aria-hidden="true"
              className={`block h-3 rounded-full border-2 border-negro transition-[width,background-color] duration-300 motion-reduce:transition-none ${
                i === indice ? "w-6 bg-negro" : "w-3 bg-transparent"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
