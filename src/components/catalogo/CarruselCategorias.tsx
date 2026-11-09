"use client";

import { useRef, useState, type ReactNode } from "react";

// Lista de categorías que:
// - en celular (menos de 768 px) es un CARRUSEL horizontal con CSS scroll-snap (cada tarjeta "se
//   pega" al soltar el dedo), con las tarjetas al 78 % del ancho para que se asome la siguiente,
//   y un contador "2 / 8" con puntos que muestra en cuál va;
// - desde 768 px vuelve a ser una grilla normal (sin scroll interno).
// Sin librerías: el desplazamiento y el "pegado" son del navegador (CSS). El único JavaScript es
// el contador. Funciona con el dedo y con el teclado (al tabular hacia una tarjeta, el navegador
// la trae a la vista).
// Las tarjetas (<li>) llegan como "children" desde el servidor (TarjetaCategoria).
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

  return (
    <div role="region" aria-label="Categorías de productos">
      <ul
        ref={lista}
        onScroll={alDesplazar}
        className="relative -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-4 px-4 pb-3 [&>li]:w-[78%] [&>li]:shrink-0 [&>li]:snap-start md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 md:[&>li]:w-auto md:[&>li]:shrink lg:grid-cols-4"
      >
        {children}
      </ul>

      {/* Contador y puntos: solo en celular. Son informativos (aria-hidden): la persona se mueve
          deslizando o con Tab entre las tarjetas. */}
      <div className="mt-2 flex items-center justify-between md:hidden" aria-hidden="true">
        <p className="text-sm font-bold text-negro">
          {actual + 1} / {total}
        </p>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className={`block h-2 rounded-full border border-negro transition-[width,background-color] duration-200 ${
                i === actual ? "w-5 bg-negro" : "w-2 bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
