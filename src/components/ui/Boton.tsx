import Link from "next/link";
import type { ReactNode } from "react";

// Estilos compartidos por todos los botones (que en realidad son enlaces <a>).
//
// - min-h-11 = 44 px de alto: tamaño mínimo cómodo para el dedo en el celular.
// - Animaciones discretas: transición de 200 ms en color y sombra, y una leve presión al hacer clic
//   (se desactiva con "reducir movimiento").
// - Foco con el teclado (Tab): lo pone la regla global :focus-visible de globals.css (anillo
//   negro + dorado, visible en cualquier fondo). No hace falta repetirlo aquí.
// - REGLA DE MARCA: el dorado solo va como fondo con texto negro, nunca como
//   texto sobre blanco o crema.

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded px-5 py-2 text-center font-titulo text-lg font-bold uppercase tracking-wide transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out hover:shadow-md";

// Leve presión al hacer clic. OJO: NO usarla en enlaces "estirados" (los que cubren toda una tarjeta
// con ::after). Un elemento con transform/scale pasa a ser el contenedor de sus hijos absolutos:
// al presionar, el ::after se encogería al tamaño del botón y el clic se perdería.
const presion = "motion-safe:active:scale-[0.98]";

const variantes = {
  // Dorado con texto negro: para fondos negros o blancos.
  dorado: "bg-dorado text-negro hover:bg-blanco",
  // Negro con texto blanco: para fondos claros o dorados.
  negro: "bg-negro text-blanco hover:bg-gris",
  // Solo borde negro: botón secundario sobre fondos claros.
  contorno:
    "border-2 border-negro bg-transparent text-negro hover:bg-negro hover:text-blanco",
  // Verde oficial de WhatsApp con texto e ícono negros (excepción a la paleta, solo para
  // el botón de WhatsApp del encabezado). Al pasar el mouse, un verde un poco más oscuro.
  whatsapp: "bg-whatsapp text-negro hover:bg-whatsapp-oscuro",
} as const;

export type VarianteBoton = keyof typeof variantes;

export function clasesBoton(variante: VarianteBoton, extra = "", conPresion = true): string {
  return `${base} ${variantes[variante]} ${conPresion ? presion : ""} ${extra}`.replace(/\s+/g, " ").trim();
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
