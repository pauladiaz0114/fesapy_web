import type { ComponentType } from "react";
import {
  IconoCamion,
  IconoCasco,
  IconoEscudo,
  IconoEtiqueta,
  IconoPaquete,
  IconoUniforme,
} from "@/components/ui/iconos";
import { EtiquetaReferencia } from "@/components/ui/EtiquetaReferencia";
import { ImagenSuave } from "@/components/ui/ImagenSuave";
import { Reveal } from "@/components/ui/Reveal";
import chalecoObra from "../../../public/referencia/chaleco-obra.webp";

// "Problemas que resolvemos": 6 puntos con ícono y SOLO título (sin párrafo ni subtítulo,
// 2026-11-12). Solo se dice lo confirmado en docs/BRIEF.md: un proveedor para todo, productos
// con certificaciones/normas, personalización con logo, envíos nacionales.
// Diseño oscuro (2026-11-16): panel dividido. A la izquierda, una foto de referencia (aquí irá el
// video corto cuando Fesapy lo entregue; la foto quedará como poster); a la derecha, la lista
// sobre carbón con íconos dorados.
const problemas: { titulo: string; Icono: ComponentType<{ className?: string }> }[] = [
  { titulo: "Todo en un solo pedido", Icono: IconoPaquete },
  { titulo: "Productos certificados", Icono: IconoEscudo },
  { titulo: "Pedidos con las tallas de tu equipo", Icono: IconoUniforme },
  { titulo: "Tu logo bordado o estampado", Icono: IconoEtiqueta },
  { titulo: "Envíos nacionales", Icono: IconoCamion },
  { titulo: "EPP, calzado, señalización y más", Icono: IconoCasco },
];

export function Problemas() {
  return (
    <section
      aria-labelledby="titulo-problemas"
      className="grid bg-carbon text-blanco lg:grid-cols-2"
    >
      {/* Marco de proporción fija: la foto no mueve el diseño al cargar (CLS 0). */}
      <div className="relative aspect-[4/3] overflow-hidden bg-carbon-claro lg:aspect-auto lg:min-h-[30rem]">
        <ImagenSuave
          src={chalecoObra}
          alt="Trabajador de espaldas con chaleco reflectivo naranja junto a un andamio"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <EtiquetaReferencia>Imagen de referencia</EtiquetaReferencia>
      </div>

      <Reveal escalonar className="px-4 py-12 sm:px-10 lg:px-14 lg:py-16">
        <h2
          id="titulo-problemas"
          className="font-titulo text-3xl font-bold uppercase leading-tight sm:text-5xl"
        >
          Problemas que <span className="text-dorado">resolvemos</span>
        </h2>
        <ul className="mt-8 flex flex-col">
          {problemas.map(({ titulo, Icono }) => (
            <li
              key={titulo}
              data-escalon
              className="flex items-center gap-4 border-b border-blanco/15 py-4"
            >
              <Icono className="size-7 shrink-0 text-dorado" />
              <h3 className="font-titulo text-xl font-bold uppercase leading-tight">{titulo}</h3>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
