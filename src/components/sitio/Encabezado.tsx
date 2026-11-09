import Link from "next/link";
import { BotonWhatsApp } from "@/components/ui/BotonWhatsApp";
import { CabeceraPegajosa } from "./CabeceraPegajosa";
import { Logo } from "./Logo";

// Los enlaces del menú. Todas son páginas del propio sitio (sin menús desplegables).
export const enlacesMenu = [
  { href: "/", texto: "Inicio" },
  { href: "/productos", texto: "Productos" },
  { href: "/personalizacion", texto: "Personalización" },
  { href: "/nosotros", texto: "Nosotros" },
  { href: "/cotizacion", texto: "Cotización" },
] as const;

// Encabezado negro con borde dorado abajo.
// - Escritorio (lg y más): logo, menú y botón en UNA fila, pegado arriba al hacer scroll.
// - Celular: fila 1 = logo + botón corto; fila 2 = el menú, que baja de renglón si
//   no cabe. Todo con CSS: no hace falta un menú "hamburguesa".
export function Encabezado() {
  return (
    <CabeceraPegajosa>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-3">
        <Link
          href="/"
          aria-label="Fesapy Distribuciones, ir al inicio"
          className="rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dorado"
        >
          <Logo preload />
        </Link>

        <nav
          aria-label="Principal"
          className="order-3 w-full border-t border-blanco/20 pt-1 lg:order-none lg:w-auto lg:border-0 lg:pt-0"
        >
          <ul className="flex flex-wrap gap-x-3 sm:gap-x-5">
            {enlacesMenu.map(({ href, texto }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group inline-flex min-h-11 items-center font-titulo text-sm font-bold uppercase tracking-wide text-blanco focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dorado sm:text-base"
                >
                  {/* Subrayado dorado que crece de izquierda a derecha al pasar el mouse o
                      enfocar con el teclado (dorado como acento sobre negro: permitido). */}
                  <span className="bg-[image:linear-gradient(var(--dorado),var(--dorado))] bg-[length:0%_2px] bg-[position:0_100%] bg-no-repeat pb-1 transition-[background-size] duration-200 ease-out group-hover:bg-[length:100%_2px] group-focus-visible:bg-[length:100%_2px]">
                    {texto}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
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
