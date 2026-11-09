import Link from "next/link";
import { BotonWhatsApp } from "@/components/ui/BotonWhatsApp";
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
// - Escritorio (lg y más): logo, menú y botón en UNA fila.
// - Celular: fila 1 = logo + botón corto; fila 2 = el menú, que baja de renglón si
//   no cabe. Todo con CSS: no hace falta JavaScript ni un menú "hamburguesa".
export function Encabezado() {
  return (
    <header className="border-b-4 border-dorado bg-negro">
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
                  className="inline-flex min-h-11 items-center font-titulo text-sm font-bold sm:text-base uppercase tracking-wide text-blanco underline-offset-8 hover:text-dorado hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dorado"
                >
                  {texto}
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
    </header>
  );
}
