"use client";

import { useRef, useState, type ReactNode } from "react";

// Lista de categorías que:
// - en celular (menos de 768 px) es un CARRUSEL horizontal con CSS scroll-snap (cada tarjeta "se
//   pega" al soltar el dedo), con las tarjetas al 78 % del ancho para que se asome la siguiente,
//   un contador "2 / 8" con puntos y botones "anterior" / "siguiente";
// - desde 768 px vuelve a ser una grilla normal (sin scroll interno, sin contador ni botones).
// Sin librerías: el desplazamiento y el "pegado" son del navegador (CSS). El JavaScript solo
// calcula el contador y mueve la lista al usar los botones. También funciona con el teclado (al
// tabular hacia una tarjeta, el navegador la trae a la vista).
// Las tarjetas (<li>) llegan como "children" desde el servidor (TarjetaCategoria).

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

const claseBotonFlecha =
  "flex size-11 items-center justify-center rounded-full border-2 border-negro text-negro transition-colors duration-200 hover:bg-negro hover:text-blanco aria-disabled:border-negro/30 aria-disabled:text-negro/30 aria-disabled:hover:bg-transparent";
// Se usa aria-disabled y no "disabled": un botón "disabled" pierde el foco del teclado justo al
// llegar a la última tarjeta. Con aria-disabled el foco se queda y el clic simplemente no hace nada.

export function CarruselCategorias({ total, children }: { total: number; children: ReactNode }) {
  const lista = useRef<HTMLUListElement>(null);
  const pendiente = useRef(false);
  const [actual, setActual] = useState(0);

  // Calcula cuál tarjeta está al frente a partir del desplazamiento (agrupado con
  // requestAnimationFrame para no trabajar de más en cada pixel de scroll).
  const alDesplazar = () => {
    if (pendiente.current) return;
    pendiente.current = true;
    requestAnimationFrame(() => {
      pendiente.current = false;
      const ul = lista.current;
      if (!ul || ul.children.length < 2) return;
      const paso =
        (ul.children[1] as HTMLElement).offsetLeft - (ul.children[0] as HTMLElement).offsetLeft;
      const alFinal = ul.scrollLeft + ul.clientWidth >= ul.scrollWidth - 2;
      const indice = alFinal ? total - 1 : Math.round(ul.scrollLeft / paso);
      setActual(Math.min(total - 1, Math.max(0, indice)));
    });
  };

  // Botones anterior / siguiente: llevan la tarjeta pedida al frente. Con "reducir movimiento"
  // el salto es inmediato (sin desplazamiento suave).
  const irA = (n: number) => {
    const ul = lista.current;
    const destino = ul?.children[Math.min(total - 1, Math.max(0, n))] as HTMLElement | undefined;
    if (!ul || !destino) return;
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const primera = ul.children[0] as HTMLElement;
    ul.scrollTo({ left: destino.offsetLeft - primera.offsetLeft, behavior: suave ? "smooth" : "auto" });
  };

  return (
    <div role="region" aria-roledescription="carrusel" aria-label="Categorías de productos">
      <ul
        ref={lista}
        onScroll={alDesplazar}
        className="relative -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-4 px-4 pb-3 [&>li]:w-[78%] [&>li]:shrink-0 [&>li]:snap-start md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 md:[&>li]:w-auto md:[&>li]:shrink lg:grid-cols-4"
      >
        {children}
      </ul>

      {/* Contador, puntos y botones: solo en celular. */}
      <div className="mt-2 flex items-center justify-between gap-3 md:hidden">
        {/* El lector de pantalla oye "Categoría 2 de 8" cada vez que cambia (al deslizar o con
            los botones); el texto visible "2 / 8" queda oculto para él (sería confuso). */}
        <p className="text-sm font-bold text-negro">
          <span aria-hidden="true">
            {actual + 1} / {total}
          </span>
          <span className="sr-only" aria-live="polite">
            Categoría {actual + 1} de {total}
          </span>
        </p>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className={`block h-2 rounded-full border border-negro transition-[width,background-color] duration-200 ${
                i === actual ? "w-5 bg-negro" : "w-2 bg-transparent"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => irA(actual - 1)}
            aria-disabled={actual === 0}
            aria-label="Categoría anterior"
            className={claseBotonFlecha}
          >
            <Flecha lado="izquierda" />
          </button>
          <button
            type="button"
            onClick={() => irA(actual + 1)}
            aria-disabled={actual === total - 1}
            aria-label="Categoría siguiente"
            className={claseBotonFlecha}
          >
            <Flecha lado="derecha" />
          </button>
        </div>
      </div>
    </div>
  );
}
