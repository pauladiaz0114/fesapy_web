import Link from "next/link";
import { BotonWhatsApp } from "@/components/ui/BotonWhatsApp";
import { CabeceraPegajosa } from "./CabeceraPegajosa";
import { EnlacesMenu } from "./EnlacesMenu";
import { Logo } from "./Logo";
import { MenuMovil } from "./MenuMovil";

// Encabezado negro con borde dorado abajo.
// - Escritorio (lg y más): logo, menú y botón en UNA fila, pegado arriba al hacer scroll.
// - Celular y tableta: logo + botón corto "Cotizar" + botón de menú (hamburguesa), que abre
//   el panel con los enlaces (MenuMovil).
// El enlace de la página actual lleva aria-current="page" (ver EnlacesMenu).
export function Encabezado() {
  return (
    <CabeceraPegajosa>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-x-6 px-4 py-3">
        <Link href="/" aria-label="Fesapy Distribuciones, ir al inicio" className="rounded">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <EnlacesMenu
            claseLista="flex flex-wrap gap-x-5"
            claseEnlace="inline-flex min-h-11 items-center font-titulo text-base font-bold uppercase tracking-wide text-blanco"
          />
        </nav>

        <div className="flex items-center gap-2">
          <BotonWhatsApp variante="whatsapp" className="px-3 sm:px-5">
            {/* En celular el texto corto cabe al lado del logo. */}
            <span className="sm:hidden">Cotizar</span>
            <span className="hidden sm:inline">Cotizar por WhatsApp</span>
          </BotonWhatsApp>
          <MenuMovil />
        </div>
      </div>
    </CabeceraPegajosa>
  );
}
