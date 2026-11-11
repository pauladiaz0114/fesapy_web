"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { enlacesMenu } from "@/lib/menu";

// ¿Este enlace es la página donde está la persona? "/" solo cuenta en el inicio exacto;
// los demás también cuentan en sus subpáginas (/productos/calzado-de-seguridad → Productos).
export function esActual(href: string, ruta: string): boolean {
  if (href === "/") return ruta === "/";
  return ruta === href || ruta.startsWith(`${href}/`);
}

// Enlaces del menú principal. Es un Client Component solo porque necesita saber en qué página
// está la persona (usePathname) para marcar el enlace activo:
// - aria-current="page": el lector de pantalla dice "página actual";
// - el subrayado dorado queda fijo en el enlace activo (dorado sobre negro: permitido).
export function EnlacesMenu({
  claseLista,
  claseEnlace,
  alNavegar,
}: {
  claseLista: string;
  claseEnlace: string;
  /** Se llama al tocar un enlace (el menú del celular lo usa para cerrarse). */
  alNavegar?: () => void;
}) {
  const ruta = usePathname();

  return (
    <ul className={claseLista}>
      {enlacesMenu.map(({ href, texto }) => {
        const actual = esActual(href, ruta);
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={actual ? "page" : undefined}
              onClick={alNavegar}
              className={`group ${claseEnlace}`}
            >
              {/* Subrayado dorado que crece de izquierda a derecha al pasar el mouse o enfocar
                  con el teclado; en la página actual queda completo. */}
              <span
                className={`bg-[image:linear-gradient(var(--dorado),var(--dorado))] bg-[position:0_100%] bg-no-repeat pb-1 transition-[background-size] duration-200 ease-out group-hover:bg-[length:100%_2px] group-focus-visible:bg-[length:100%_2px] ${
                  actual ? "bg-[length:100%_2px]" : "bg-[length:0%_2px]"
                }`}
              >
                {texto}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
