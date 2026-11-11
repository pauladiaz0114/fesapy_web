"use client";

import type { StaticImageData } from "next/image";
import { ImagenSuave } from "@/components/ui/ImagenSuave";
import { useEffect, useRef, useState, useSyncExternalStore, type PointerEvent } from "react";
import botas from "../../../public/referencia/botas-seguridad.webp";
import casco from "../../../public/referencia/casco-epp.webp";
import dotacion from "../../../public/referencia/dotacion-reflectiva.webp";
import guantes from "../../../public/referencia/guantes-trabajo.webp";

// Carrusel del hero: UNA imagen grande que cambia sola, sin librerías (React + CSS + APIs del navegador).
// TODO(contenido): son fotos de REFERENCIA de Pexels (autores y licencia en
// docs/CREDITOS-IMAGENES.md). Reemplazar por fotos propias de Fesapy.
//
// Comportamiento:
// - Cambia cada 5 s con un fundido cruzado de 700 ms (solo opacidad).
// - El punto activo se llena como una barra de progreso durante esos 5 s. Esa misma animación de
//   CSS es el "reloj": cuando termina, pasa a la siguiente foto. Así, al pausar, la barra se
//   detiene donde iba y sigue desde ahí al reanudar.
// - Se pausa con el mouse encima, con el foco dentro, con el botón de pausa, con la pestaña
//   oculta (visibilitychange) y cuando el hero sale de la pantalla (IntersectionObserver).
// - Se puede deslizar con el dedo o arrastrando con el mouse (pointer events), usar las flechas
//   del teclado cuando tiene el foco, los puntos o las flechas de la imagen.
// - Con "reducir movimiento" (prefers-reduced-motion) NO cambia solo ni anima.
// - Marco de proporción fija (cuadrado): al cambiar de foto el diseño no se mueve (CLS 0).
// - El lector de pantalla oye "Imagen 2 de 4: …" solo cuando la persona cambia la foto, nunca en
//   el cambio automático (no interrumpe).

type Foto = { src: StaticImageData; alt: string };

const fotos: Foto[] = [
  { src: botas, alt: "Botas de seguridad negras sobre piso mojado" },
  { src: casco, alt: "Casco, gafas de seguridad y tapabocas en un maniquí" },
  { src: dotacion, alt: "Trabajadores con dotación reflectiva y botas de caucho" },
  { src: guantes, alt: "Trabajador poniéndose guantes de carnaza" },
];

const INTERVALO_MS = 5000;
// Distancia mínima (en px) para que un arrastre cuente como "deslizar".
const UMBRAL_DESLIZAR = 40;

const CONSULTA_REDUCIR = "(prefers-reduced-motion: reduce)";

// useSyncExternalStore: la forma recomendada por React de leer algo que vive fuera de React
// (aquí, una preferencia del sistema y la visibilidad de la pestaña).
function useReduccionDeMovimiento(): boolean {
  return useSyncExternalStore(
    (avisar) => {
      const mq = window.matchMedia(CONSULTA_REDUCIR);
      mq.addEventListener("change", avisar);
      return () => mq.removeEventListener("change", avisar);
    },
    () => window.matchMedia(CONSULTA_REDUCIR).matches,
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

const claseFlecha =
  "absolute top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-negro/60 text-blanco transition-colors duration-200 hover:bg-negro md:flex";

export function HeroCarrusel() {
  const total = fotos.length;
  const [indice, setIndice] = useState(0);
  const [pausaMouse, setPausaMouse] = useState(false);
  const [pausaFoco, setPausaFoco] = useState(false);
  const [pausadoPorPersona, setPausadoPorPersona] = useState(false);
  const [fueraDePantalla, setFueraDePantalla] = useState(false);
  const [anuncio, setAnuncio] = useState("");
  const reducirMovimiento = useReduccionDeMovimiento();
  const pestanaOculta = usePestanaOculta();
  const raiz = useRef<HTMLDivElement>(null);
  const inicioArrastre = useRef<{ x: number; y: number; id: number } | null>(null);

  const automatico =
    !reducirMovimiento &&
    !pausadoPorPersona &&
    !pausaMouse &&
    !pausaFoco &&
    !pestanaOculta &&
    !fueraDePantalla;

  // Pausa cuando el hero sale de la pantalla (nadie lo está mirando).
  useEffect(() => {
    const el = raiz.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observador = new IntersectionObserver(([entrada]) =>
      setFueraDePantalla(!entrada.isIntersecting),
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  // Cambio hecho por la persona (puntos, flechas, teclado o deslizar): se anuncia.
  const irA = (n: number) => {
    const nuevo = ((n % total) + total) % total;
    setIndice(nuevo);
    setAnuncio(`Imagen ${nuevo + 1} de ${total}: ${fotos[nuevo].alt}`);
  };

  // Cambio automático: cuando la barra de progreso del punto activo termina sus 5 s.
  const alTerminarProgreso = () => {
    // Doble seguro: con "reducir movimiento" nunca avanza solo (aunque la animación alcance a correr).
    if (!automatico || window.matchMedia(CONSULTA_REDUCIR).matches) return;
    setIndice((i) => (i + 1) % total);
  };

  // Deslizar: se compara dónde empezó y dónde terminó el arrastre. "touch-pan-y" deja al
  // navegador el desplazamiento vertical de la página; el horizontal llega aquí.
  const alPresionar = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    inicioArrastre.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
  };
  const alSoltar = (e: PointerEvent<HTMLDivElement>) => {
    const inicio = inicioArrastre.current;
    inicioArrastre.current = null;
    if (!inicio || inicio.id !== e.pointerId) return;
    const dx = e.clientX - inicio.x;
    const dy = e.clientY - inicio.y;
    if (Math.abs(dx) >= UMBRAL_DESLIZAR && Math.abs(dx) > Math.abs(dy) * 1.5) {
      irA(dx < 0 ? indice + 1 : indice - 1);
    }
  };

  const siguiente = (indice + 1) % total;

  return (
    <div
      ref={raiz}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Fotos de productos de seguridad. Usa las flechas del teclado para cambiar de imagen."
      // tabIndex 0: el carrusel puede recibir el foco para usar las flechas ← → del teclado.
      tabIndex={0}
      className="relative rounded"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          irA(indice - 1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          irA(indice + 1);
        }
      }}
      // Solo el mouse pausa al pasar por encima (un toque en el celular no debe dejarlo pausado).
      onPointerEnter={(e) => e.pointerType === "mouse" && setPausaMouse(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setPausaMouse(false)}
      onFocus={() => setPausaFoco(true)}
      onBlur={(e) => {
        // Solo se reanuda si el foco salió de TODO el carrusel (no al pasar de un botón a otro).
        if (!e.currentTarget.contains(e.relatedTarget)) setPausaFoco(false);
      }}
    >
      {/* Aviso para el lector de pantalla: cambia solo cuando la persona navega. */}
      <p aria-live="polite" className="sr-only">
        {anuncio}
      </p>

      <div
        className="relative aspect-square w-full touch-pan-y overflow-hidden rounded bg-crema select-none"
        onPointerDown={alPresionar}
        onPointerUp={alSoltar}
        onPointerCancel={() => (inicioArrastre.current = null)}
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
              <ImagenSuave
                src={foto.src}
                alt={foto.alt}
                fill
                draggable={false}
                // Solo la PRIMERA foto se pide con prioridad (es lo primero que se ve; en Next.js 16
                // "preload" reemplaza a "priority"). La que viene después se pide ya (eager) para
                // que esté lista al cambiar; las demás, cuando el navegador pueda (lazy).
                preload={i === 0}
                loading={i === 0 || i === indice || i === siguiente ? "eager" : "lazy"}
                // En pantallas grandes la foto mide como máximo ~548 px (media columna);
                // en celular y tableta, el ancho de la pantalla menos los márgenes.
                sizes="(min-width: 1024px) 548px, calc(100vw - 32px)"
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
          className={`${claseFlecha} left-2`}
        >
          <Flecha lado="izquierda" />
        </button>
        <button
          type="button"
          onClick={() => irA(indice + 1)}
          aria-label="Imagen siguiente"
          className={`${claseFlecha} right-2`}
        >
          <Flecha lado="derecha" />
        </button>
      </div>

      {/* Pausa y puntos (botones de 44 × 44 px; el punto visible es más pequeño). */}
      <div className="mt-1 flex items-center justify-center gap-1">
        {!reducirMovimiento && (
          <button
            type="button"
            onClick={() => setPausadoPorPersona((p) => !p)}
            aria-label={
              pausadoPorPersona
                ? "Reanudar el cambio automático de imágenes"
                : "Pausar el cambio automático de imágenes"
            }
            className="flex size-11 items-center justify-center rounded text-negro transition-colors duration-200 hover:bg-negro/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="size-4"
            >
              {pausadoPorPersona ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h4v14H7zM13 5h4v14h-4z" />}
            </svg>
          </button>
        )}
        {fotos.map((foto, i) => {
          const activo = i === indice;
          return (
            <button
              key={foto.alt}
              type="button"
              onClick={() => irA(i)}
              aria-label={`Ir a la imagen ${i + 1} de ${total}`}
              aria-current={activo}
              className="flex size-11 items-center justify-center rounded"
            >
              {/* Punto activo: píldora con borde negro que se llena de izquierda a derecha durante
                  los 5 s (barra de progreso). Los demás: anillos. Contraste alto sobre crema. */}
              <span
                aria-hidden="true"
                className={`relative block h-3 overflow-hidden rounded-full border-2 border-negro transition-[width] duration-300 motion-reduce:transition-none ${
                  activo ? "w-8" : "w-3"
                }`}
              >
                {activo &&
                  (reducirMovimiento ? (
                    // Sin movimiento: el punto activo simplemente está lleno.
                    <span className="absolute inset-0 bg-negro" />
                  ) : (
                    <span
                      // key: al cambiar de foto la barra vuelve a empezar desde cero.
                      key={indice}
                      onAnimationEnd={alTerminarProgreso}
                      className="progreso-carrusel absolute inset-0 origin-left bg-negro"
                      style={{
                        animationDuration: `${INTERVALO_MS}ms`,
                        animationPlayState: automatico ? "running" : "paused",
                      }}
                    />
                  ))}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
