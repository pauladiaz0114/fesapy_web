import { ENLACE_COTIZAR } from "@/lib/whatsapp";
import { IconoWhatsApp } from "@/components/ui/iconos";

// Burbuja redonda que queda fija en la esquina inferior derecha mientras se baja.
// - Verde oficial de WhatsApp con el logo en blanco (como la marca lo usa), sin borde.
//   Excepción a la paleta de Fesapy: ver globals.css y docs/DECISIONES.md (2026-11-12).
// - Solo tiene ícono, por eso aria-label: es el texto que leen los lectores de pantalla
//   (personas ciegas) para saber qué hace el botón.
// - La sombra la separa del fondo (también cuando pasa sobre la franja dorada del pie).
// - El foco del teclado lo da la regla global :focus-visible (anillo negro + dorado).
// Entra suave UNA vez al cargar la página (clase entrada-flotante, en globals.css); no hay pulso permanente.
export function WhatsAppFlotante() {
  return (
    <a
      href={ENLACE_COTIZAR}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Cotizar por WhatsApp (se abre en una pestaña nueva)"
      className="fixed right-4 bottom-4 z-50 flex size-14 items-center justify-center rounded-full bg-whatsapp text-blanco entrada-flotante shadow-lg transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-whatsapp-oscuro hover:shadow-xl motion-safe:active:scale-95 sm:right-6 sm:bottom-6 sm:size-16"
    >
      <IconoWhatsApp className="size-8 sm:size-9" />
    </a>
  );
}
