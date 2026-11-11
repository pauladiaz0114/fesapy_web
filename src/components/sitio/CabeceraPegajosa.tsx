"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Envoltorio del encabezado: desde pantallas grandes (lg) se queda pegado arriba al hacer scroll,
// y cuando la página ya bajó un poco aparece una sombra suave debajo (para separarlo del contenido).
//
// - La sombra se activa con el atributo data-desplazado (se cambia directo en el elemento, sin
//   useState, así no se vuelve a pintar el componente en cada scroll).
// - El evento de scroll es "passive" y se agrupa con requestAnimationFrame (rendimiento).
// - En celular el encabezado NO se queda pegado: ocuparía demasiada pantalla (2 filas).
// - Con "reducir movimiento" la sombra aparece igual pero sin transición (ver globals.css).
export function CabeceraPegajosa({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let pendiente = false;

    const actualizar = () => {
      el.dataset.desplazado = window.scrollY > 4 ? "true" : "false";
      pendiente = false;
    };
    const alDesplazar = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(actualizar);
    };

    actualizar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => window.removeEventListener("scroll", alDesplazar);
  }, []);

  return (
    <header
      ref={ref}
      // relative: el panel del menú del celular se ubica justo debajo del encabezado.
      className="relative z-40 border-b-4 border-dorado bg-negro transition-shadow duration-200 data-[desplazado=true]:shadow-[0_4px_14px_rgba(0,0,0,0.3)] lg:sticky lg:top-0"
    >
      {children}
    </header>
  );
}
