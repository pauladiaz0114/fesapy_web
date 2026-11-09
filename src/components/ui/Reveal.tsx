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
// - Con "reducir movimiento" no se hace nada: el contenido se ve normal.
// - Solo cambian opacity y transform: no mueve el diseño (CLS 0).
// El atributo se cambia directamente en el elemento (no con useState) para no re-renderizar.
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const caja = el.getBoundingClientRect();
    const yaALaVista = caja.top < window.innerHeight && caja.bottom > 0;
    if (yaALaVista) return;

    el.dataset.reveal = "pre";
    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          el.dataset.reveal = "in";
          observador.disconnect(); // una sola vez
        }
      },
      // threshold 0: se activa apenas asoma (también bloques muy altos); el margen inferior
      // espera a que entre un poco para que se vea la animación.
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
