import Link from "next/link";
import type { ReactNode } from "react";

// Estilos compartidos por todos los botones (que en realidad son enlaces <a>).
//
// - min-h-11 = 44 px de alto: tamaño mínimo cómodo para el dedo en el celular.
// - Animaciones discretas: transición de 200 ms en color y sombra, y una leve presión al hacer clic
//   (se desactiva con "reducir movimiento").
// - focus-visible: borde visible cuando se navega con el teclado (Tab).
// - REGLA DE MARCA: el dorado solo va como fondo con texto negro, nunca como
//   texto sobre blanco o crema.

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded px-5 py-2 text-center font-titulo text-lg font-bold uppercase tracking-wide transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out hover:shadow-md motion-safe:active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2";

const variantes = {
  // Dorado con texto negro: para fondos negros o blancos.
  dorado: "bg-dorado text-negro hover:bg-blanco focus-visible:outline-blanco",
  // Negro con texto blanco: para fondos claros o dorados.
  negro: "bg-negro text-blanco hover:bg-gris focus-visible:outline-negro",
  // Solo borde negro: botón secundario sobre fondos claros.
  contorno:
    "border-2 border-negro bg-transparent text-negro hover:bg-negro hover:text-blanco focus-visible:outline-negro",
} as const;

export type VarianteBoton = keyof typeof variantes;

export function clasesBoton(variante: VarianteBoton, extra = ""): string {
  return `${base} ${variantes[variante]} ${extra}`.trim();
}

/** Botón que lleva a otra página del mismo sitio. */
export function BotonEnlace({
  href,
  variante = "negro",
  className = "",
  children,
}: {
  href: string;
  variante?: VarianteBoton;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={clasesBoton(variante, className)}>
      {children}
    </Link>
  );
}
