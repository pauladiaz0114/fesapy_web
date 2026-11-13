import type { ComponentType } from "react";
import {
  IconoCamion,
  IconoCasco,
  IconoEscudo,
  IconoEtiqueta,
  IconoPaquete,
  IconoUniforme,
} from "@/components/ui/iconos";
import { Reveal } from "@/components/ui/Reveal";

// "Problemas que resolvemos": 6 tarjetas con ícono y SOLO título (sin párrafo ni subtítulo,
// 2026-11-12). Solo se dice lo confirmado en docs/BRIEF.md: un proveedor para todo, productos
// con certificaciones/normas, personalización con logo, envíos nacionales e internacionales.
const problemas: { titulo: string; Icono: ComponentType<{ className?: string }> }[] = [
  { titulo: "Todo en un solo pedido", Icono: IconoPaquete },
  { titulo: "Productos certificados", Icono: IconoEscudo },
  { titulo: "Pedidos con las tallas de tu equipo", Icono: IconoUniforme },
  { titulo: "Tu logo bordado o estampado", Icono: IconoEtiqueta },
  { titulo: "Envíos nacionales e internacionales", Icono: IconoCamion },
  { titulo: "EPP, calzado, señalización y más", Icono: IconoCasco },
];

export function Problemas() {
  return (
    <section aria-labelledby="titulo-problemas" className="bg-crema px-4 py-14 sm:py-16">
      <Reveal escalonar className="mx-auto max-w-6xl">
        <h2
          id="titulo-problemas"
          className="font-titulo text-3xl font-bold uppercase text-negro sm:text-4xl"
        >
          Problemas que resolvemos
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problemas.map(({ titulo, Icono }) => (
            <li
              key={titulo}
              data-escalon
              className="flex items-center gap-4 rounded border-t-4 border-dorado bg-blanco p-5"
            >
              {/* Dorado sobre negro: combinación permitida. */}
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-negro text-dorado">
                <Icono className="size-6" />
              </span>
              <h3 className="font-titulo text-xl font-bold uppercase leading-tight text-negro">
                {titulo}
              </h3>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
