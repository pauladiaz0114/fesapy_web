"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Aparición suave al hacer scroll: el bloque sube 12 px y se desvanece hacia adentro (500 ms),
// UNA sola vez. Las reglas de CSS están en globals.css ([data-reveal]).
//
// Cómo funciona (y por qué es seguro):
// - Por defecto el contenido es VISIBLE (el servidor no pone ningún atributo). Si JavaScript falla
//   o tarda, nada queda invisible.
// - Ya en el navegador, si el bloque está FUERA de la pantalla, se marca data-reveal="pre"
//   (oculto y 12 px abajo). Cuando entra en pantalla pasa a data-reveal="in" (visible, con transición).
// - Si ya está a la vista al cargar, NO se oculta (evita un parpadeo en lo de arriba).
// - Al terminar la transición se quita el atributo: el elemento vuelve a sus estilos normales
//   (así el hover de las tarjetas no hereda la transición de 500 ms).
// - Con "reducir movimiento" no se hace nada: el contenido se ve normal.
// - Solo cambian opacity y transform: no mueve el diseño (CLS 0).
// El atributo se cambia directamente en el elemento (no con useState) para no re-renderizar.
//
// Entrada escalonada (escalonar): los elementos marcados con el atributo data-escalon dentro del
// bloque (las tarjetas de una grilla) aparecen UNO TRAS OTRO, con PASO_MS de diferencia, en el
// orden de la página. Solo los primeros MAX_ESCALONADOS llevan un retraso propio; los demás ya no
// suman más espera (aparecen con el último). Cada grupo se calcula con las tarjetas que entran a
// la pantalla al mismo tiempo; las que entran después (otra fila) empiezan su propia cuenta.

const PASO_MS = 70;
const MAX_ESCALONADOS = 6;
const DURACION_MS = 500;

export function Reveal({
  children,
  className = "",
  escalonar = false,
}: {
  children: ReactNode;
  className?: string;
  /** Las tarjetas con data-escalon aparecen una tras otra. */
  escalonar?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raiz = ref.current;
    if (!raiz) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const alto = () => window.innerHeight;
    // "Fuera de la pantalla" se mide solo en vertical: una tarjeta escondida a la derecha en el
    // carrusel del celular cuenta como visible si su fila está en pantalla.
    const enVertical = (el: HTMLElement) => {
      const caja = el.getBoundingClientRect();
      return caja.top < alto() && caja.bottom > 0;
    };

    const pendientes = new Set<HTMLElement>();
    const temporizadores: ReturnType<typeof setTimeout>[] = [];

    const marcar = (el: HTMLElement) => {
      if (enVertical(el)) return;
      el.dataset.reveal = "pre";
      pendientes.add(el);
    };
    marcar(raiz);
    if (escalonar) raiz.querySelectorAll<HTMLElement>("[data-escalon]").forEach(marcar);
    if (pendientes.size === 0) return;

    // Al terminar la transición, el elemento vuelve a la normalidad.
    const limpiar = (el: HTMLElement) => {
      delete el.dataset.reveal;
      el.style.transitionDelay = "";
    };

    const mostrar = (el: HTMLElement, retraso: number) => {
      pendientes.delete(el);
      observador.unobserve(el);
      if (retraso) el.style.transitionDelay = `${retraso}ms`;
      el.dataset.reveal = "in";
      // Respaldo por si el evento transitionend no llega (pestaña en segundo plano, etc.).
      temporizadores.push(setTimeout(() => limpiar(el), retraso + DURACION_MS + 100));
    };

    const observador = new IntersectionObserver(
      (entradas) => {
        const entran = new Set<HTMLElement>();
        for (const e of entradas) {
          if (e.isIntersecting && pendientes.has(e.target as HTMLElement)) entran.add(e.target as HTMLElement);
        }
        if (entran.size === 0) return;
        // También las tarjetas de la misma fila que el carrusel esconde a los lados.
        if (escalonar) {
          for (const el of pendientes) if (el !== raiz && enVertical(el)) entran.add(el);
        }
        // Orden de la página (de arriba abajo, de izquierda a derecha).
        const orden = [...entran].sort((a, b) =>
          a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
        );
        let k = 0;
        for (const el of orden) {
          if (el === raiz) {
            mostrar(el, 0);
          } else {
            mostrar(el, Math.min(k, MAX_ESCALONADOS - 1) * PASO_MS);
            k++;
          }
        }
      },
      // threshold 0: se activa apenas asoma (también bloques muy altos); el margen inferior
      // espera a que entre un poco para que se vea la animación.
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    const alTerminar = (e: TransitionEvent) => {
      const el = e.target as HTMLElement;
      if (e.propertyName === "opacity" && el.dataset.reveal === "in") limpiar(el);
    };
    raiz.addEventListener("transitionend", alTerminar);
    pendientes.forEach((el) => observador.observe(el));

    return () => {
      observador.disconnect();
      raiz.removeEventListener("transitionend", alTerminar);
      temporizadores.forEach(clearTimeout);
    };
  }, [escalonar]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
