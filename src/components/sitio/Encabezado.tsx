import Link from "next/link";
import { BotonWhatsApp } from "@/components/ui/BotonWhatsApp";
import { CabeceraPegajosa } from "./CabeceraPegajosa";
import { EnlacesMenu } from "./EnlacesMenu";
import { Logo } from "./Logo";

// Encabezado negro con borde dorado abajo.
// - Escritorio (lg y más): logo, menú y botón en UNA fila, pegado arriba al hacer scroll.
// - Celular: fila 1 = logo + botón corto; fila 2 = el menú, que baja de renglón si
//   no cabe. Todo con CSS: no hace falta un menú "hamburguesa".
// El enlace de la página actual lleva aria-current="page" (ver EnlacesMenu).
export function Encabezado() {
  return (
    <CabeceraPegajosa>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-3">
        <Link href="/" aria-label="Fesapy Distribuciones, ir al inicio" className="rounded">
          <Logo preload />
        </Link>

        <nav
          aria-label="Principal"
          className="order-3 w-full border-t border-blanco/20 pt-1 lg:order-none lg:w-auto lg:border-0 lg:pt-0"
        >
          <EnlacesMenu
            claseLista="flex flex-wrap gap-x-3 sm:gap-x-5"
            claseEnlace="inline-flex min-h-11 items-center font-titulo text-sm font-bold uppercase tracking-wide text-blanco sm:text-base"
          />
        </nav>

        <BotonWhatsApp variante="dorado" className="px-3 sm:px-5">
          {/* En celular el texto corto cabe al lado del logo. */}
          <span className="sm:hidden">Cotizar</span>
          <span className="hidden sm:inline">Cotizar por WhatsApp</span>
        </BotonWhatsApp>
      </div>
    </CabeceraPegajosa>
  );
}
