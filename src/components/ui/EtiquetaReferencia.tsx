import type { ReactNode } from "react";

// Etiqueta pequeña en la esquina de una foto: "Imagen de referencia" (o "Video de referencia")
// mientras la foto NO sea de Fesapy (ver docs/CREDITOS-IMAGENES.md). Va dentro de un marco
// con position: relative. No recibe clics (pointer-events-none) para no estorbar al carrusel.
// Texto blanco sobre negro casi opaco: contraste AA.
export function EtiquetaReferencia({ children }: { children: ReactNode }) {
  return (
    <span className="pointer-events-none absolute bottom-2 left-2 z-10 rounded bg-negro/85 px-2 py-1 text-xs font-bold uppercase tracking-wide text-blanco">
      {children}
    </span>
  );
}
