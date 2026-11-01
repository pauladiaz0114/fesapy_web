import { ENLACE_COTIZAR } from "@/lib/whatsapp";
import { IconoWhatsApp } from "@/components/ui/iconos";

// Botón redondo que queda fijo en la esquina inferior derecha mientras se baja.
// Solo tiene ícono, por eso aria-label: es el texto que leen los lectores de
// pantalla (personas ciegas) para saber qué hace el botón.
// Borde negro: así se distingue también cuando pasa sobre la franja dorada.
export function WhatsAppFlotante() {
  return (
    <a
      href={ENLACE_COTIZAR}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Cotizar por WhatsApp (se abre en una pestaña nueva)"
      className="fixed right-4 bottom-4 z-50 flex size-14 items-center justify-center rounded-full border-2 border-negro bg-dorado text-negro shadow-lg transition-colors hover:bg-blanco focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-negro sm:right-6 sm:bottom-6 sm:size-16"
    >
      <IconoWhatsApp className="size-7 sm:size-8" />
    </a>
  );
}
