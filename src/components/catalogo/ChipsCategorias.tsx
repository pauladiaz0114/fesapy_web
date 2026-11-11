import Link from "next/link";
import { categorias } from "@/lib/contenido";

// Barra de categorías (chips): atajos a /productos/<categoria>.
// "actual" marca la categoría en la que está la persona (aria-current).
export function ChipsCategorias({ actual }: { actual?: string }) {
  return (
    <nav aria-label="Categorías de productos" className="border-b border-negro/10 bg-blanco px-4 py-3">
      {/* py-1.5/px-1.5: la fila se desplaza de lado en celular y, sin ese margen, el anillo de
          foco del teclado quedaría recortado en los bordes. */}
      <ul className="-mx-1.5 flex max-w-6xl gap-2 overflow-x-auto px-1.5 py-1.5 md:mx-auto md:flex-wrap md:overflow-visible md:px-0 md:py-0">
        {categorias.map((c) => {
          const activa = c.slug === actual;
          return (
            <li key={c.slug} className="shrink-0">
              <Link
                href={`/productos/${c.slug}`}
                aria-current={activa ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full border-2 border-negro px-4 text-sm font-bold transition-colors duration-200 ${
                  activa ? "bg-negro text-blanco" : "bg-blanco text-negro hover:bg-negro hover:text-blanco"
                }`}
              >
                {c.nombre}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
