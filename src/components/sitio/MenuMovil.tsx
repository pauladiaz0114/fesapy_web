"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EnlacesMenu } from "./EnlacesMenu";

// Menú del celular y la tableta (menos de 1024 px): un botón "hamburguesa" que abre un panel
// debajo del encabezado. Sin librerías.
//
// - Abre y cierra con una transición corta (200 ms, solo opacidad y un desplazamiento de 8 px).
//   Con "reducir movimiento" aparece y desaparece de una vez (interruptor de globals.css).
// - Se cierra con Escape, al tocar fuera (el fondo oscuro), al tocar un enlace, al cambiar de
//   página por otro camino y al agrandar la ventana a escritorio.
// - Mientras está abierto: el fondo no se desplaza (scroll bloqueado) y el foco del teclado
//   da vueltas solo entre el botón y los enlaces del menú (no se escapa al contenido de atrás).
// - Al cerrar, el foco vuelve al botón.
// - Cerrado, el panel queda "invisible" (visibility: hidden): sus enlaces no reciben el foco.

const ESCRITORIO = "(min-width: 1024px)";

export function MenuMovil() {
  const [abierto, setAbierto] = useState(false);
  const boton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const ruta = usePathname();

  // Si la página cambia (por ejemplo con el botón "atrás"), el menú se cierra.
  // Es el patrón de React para "ajustar un estado cuando cambia un valor", sin efectos.
  const [rutaVista, setRutaVista] = useState(ruta);
  if (ruta !== rutaVista) {
    setRutaVista(ruta);
    setAbierto(false);
  }

  const cerrar = (devolverFoco = true) => {
    setAbierto(false);
    if (devolverFoco) boton.current?.focus();
  };

  useEffect(() => {
    if (!abierto) return;

    // Bloquea el scroll del fondo. (globals.css reserva el espacio de la barra de scroll con
    // scrollbar-gutter, así la página no se corre de lado al bloquearlo.)
    const html = document.documentElement;
    const antes = html.style.overflow;
    html.style.overflow = "hidden";

    // Lleva el foco al primer enlace del menú.
    panel.current?.querySelector<HTMLElement>("a")?.focus();

    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setAbierto(false);
        boton.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      // Trampa de foco: botón → enlaces → botón…
      const enfocables = [
        boton.current,
        ...Array.from(panel.current?.querySelectorAll<HTMLElement>("a") ?? []),
      ].filter((el): el is HTMLElement => el !== null);
      if (enfocables.length === 0) return;
      const i = enfocables.indexOf(document.activeElement as HTMLElement);
      const siguiente = e.shiftKey
        ? i <= 0
          ? enfocables.length - 1
          : i - 1
        : i === -1 || i === enfocables.length - 1
          ? 0
          : i + 1;
      e.preventDefault();
      enfocables[siguiente].focus();
    };

    // Si la ventana pasa a tamaño escritorio, el menú del celular deja de existir: se cierra.
    const mq = window.matchMedia(ESCRITORIO);
    const alCambiarTamano = () => mq.matches && setAbierto(false);

    document.addEventListener("keydown", alTeclear);
    mq.addEventListener("change", alCambiarTamano);
    return () => {
      html.style.overflow = antes;
      document.removeEventListener("keydown", alTeclear);
      mq.removeEventListener("change", alCambiarTamano);
    };
  }, [abierto]);

  return (
    <div className="lg:hidden">
      <button
        ref={boton}
        type="button"
        onClick={() => (abierto ? cerrar() : setAbierto(true))}
        aria-expanded={abierto}
        aria-controls="menu-movil"
        aria-label={abierto ? "Cerrar el menú" : "Abrir el menú"}
        className="flex size-11 items-center justify-center rounded text-blanco transition-colors duration-200 hover:text-dorado"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          aria-hidden="true"
          className="size-7"
        >
          {abierto ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {/* Fondo oscuro: tocarlo cierra el menú (y evita tocar sin querer algo de atrás). Está
          dentro del encabezado con z-index negativo: tapa la página, pero no el encabezado. */}
      <div
        aria-hidden="true"
        onClick={() => cerrar()}
        className={`fixed inset-0 -z-10 bg-negro/50 transition-opacity duration-200 ${
          abierto ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        ref={panel}
        id="menu-movil"
        className={`absolute inset-x-0 top-full border-b-4 border-dorado bg-negro px-4 pt-2 pb-4 shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-[opacity,translate,visibility] duration-200 ease-out ${
          abierto ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav aria-label="Principal">
          <EnlacesMenu
            claseLista="mx-auto flex max-w-6xl flex-col"
            claseEnlace="flex min-h-12 items-center border-b border-blanco/15 font-titulo text-xl font-bold uppercase tracking-wide text-blanco"
            alNavegar={() => cerrar()}
          />
        </nav>
      </div>
    </div>
  );
}
