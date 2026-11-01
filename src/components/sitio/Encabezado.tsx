import { BotonWhatsApp } from "@/components/ui/BotonWhatsApp";
import { Logo } from "./Logo";

// Encabezado negro con borde dorado abajo. Sin menú: la única acción es cotizar.
export function Encabezado() {
  return (
    <header className="border-b-4 border-dorado bg-negro">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Logo preload />
        <BotonWhatsApp variante="dorado" className="px-3 sm:px-5">
          {/* En celular el texto corto cabe al lado del logo. */}
          <span className="sm:hidden">Cotizar</span>
          <span className="hidden sm:inline">Cotizar por WhatsApp</span>
        </BotonWhatsApp>
      </div>
    </header>
  );
}
