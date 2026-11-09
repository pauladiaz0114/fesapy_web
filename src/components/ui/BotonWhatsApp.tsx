import type { ReactNode } from "react";
import { ENLACE_COTIZAR } from "@/lib/whatsapp";
import { clasesBoton, type VarianteBoton } from "./Boton";
import { IconoWhatsApp } from "./iconos";

// Botón (en realidad un enlace <a>) que abre WhatsApp con el mensaje de cotización.
//
// - target="_blank": abre en otra pestaña o en la app de WhatsApp.
// - rel="noopener noreferrer": la página nueva no puede controlar la nuestra
//   (noopener) y no se le envía de qué página venía (noreferrer).

type Props = {
  variante?: VarianteBoton;
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
      className={clasesBoton(variante, className)}
    >
      <IconoWhatsApp className="size-5 shrink-0" />
      {children}
    </a>
  );
}
