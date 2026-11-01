import type { ReactNode } from "react";
import { ENLACE_COTIZAR } from "@/lib/whatsapp";
import { IconoWhatsApp } from "./iconos";

// Botón (en realidad un enlace <a>) que abre WhatsApp con el mensaje de cotización.
//
// - target="_blank": abre en otra pestaña o en la app de WhatsApp.
// - rel="noopener noreferrer": la página nueva no puede controlar la nuestra
//   (noopener) y no se le envía de qué página venía (noreferrer).
// - min-h-11 = 44 px de alto: tamaño mínimo cómodo para el dedo en el celular.
// - Sin animaciones: en hover solo cambia el color.
// - focus-visible: borde visible cuando se navega con el teclado (Tab).

const variantes = {
  // Fondo dorado con texto negro (nunca texto dorado sobre blanco).
  dorado:
    "bg-dorado text-negro hover:bg-blanco focus-visible:outline-blanco",
  negro: "bg-negro text-blanco hover:bg-gris focus-visible:outline-negro",
} as const;

type Props = {
  variante?: keyof typeof variantes;
  className?: string;
  children?: ReactNode;
};

export function BotonWhatsApp({
  variante = "negro",
  className = "",
  children = "Cotizar por WhatsApp",
}: Props) {
  return (
    <a
      href={ENLACE_COTIZAR}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded px-5 py-2 font-titulo text-lg font-bold uppercase tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${variantes[variante]} ${className}`}
    >
      <IconoWhatsApp className="size-5 shrink-0" />
      {children}
    </a>
  );
}
