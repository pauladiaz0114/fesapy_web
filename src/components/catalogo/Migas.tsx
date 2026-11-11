import Link from "next/link";

// Migas de pan: muestran dónde está la persona (Inicio › Productos › Categoría › Producto).
// El último elemento es la página actual (sin enlace).
export type Miga = { texto: string; href?: string };

export function Migas({ items }: { items: Miga[] }) {
  return (
    <nav aria-label="Migas de pan" className="text-sm text-gris">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((miga, i) => {
          const ultima = i === items.length - 1;
          return (
            <li key={miga.texto} className="flex items-center gap-2">
              {miga.href && !ultima ? (
                <Link
                  href={miga.href}
                  // El ::before invisible agranda la zona que se puede tocar a 44 px de alto
                  // sin cambiar cómo se ve (las migas siguen compactas).
                  className="relative inline-flex min-h-8 items-center underline underline-offset-4 before:absolute before:-inset-x-1 before:-inset-y-1.5 hover:text-negro"
                >
                  {miga.texto}
                </Link>
              ) : (
                <span aria-current={ultima ? "page" : undefined} className={`inline-flex min-h-8 items-center ${ultima ? "font-bold text-negro" : ""}`}>
                  {miga.texto}
                </span>
              )}
              {!ultima && <span aria-hidden="true">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
