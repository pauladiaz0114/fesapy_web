import Link from "next/link";
import { categorias } from "@/lib/contenido";

// Barra de categorías (chips): atajos a /productos/<categoria>.
// "actual" marca la categoría en la que está la persona (aria-current).
export function ChipsCategorias({ actual }: { actual?: string }) {
  return (
    <nav aria-label="Categorías de productos" className="border-b border-negro/10 bg-blanco px-4 py-3">
      <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible md:pb-0">
        {categorias.map((c) => {
          const activa = c.slug === actual;
          return (
            <li key={c.slug} className="shrink-0">
              <Link
                href={`/productos/${c.slug}`}
                aria-current={activa ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full border-2 border-negro px-4 text-sm font-bold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-negro ${
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
