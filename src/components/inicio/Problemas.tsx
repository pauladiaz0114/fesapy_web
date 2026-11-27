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
import { VideoReferencia } from "@/components/ui/VideoReferencia";
import chalecoObra from "../../../public/referencia/chaleco-obra.webp";

// "Problemas que resolvemos": 6 puntos con ícono y SOLO título (sin párrafo ni subtítulo,
// 2026-11-12). Solo se dice lo confirmado en docs/BRIEF.md: un proveedor para todo, productos
// con certificaciones/normas, personalización con logo, envíos nacionales.
// Diseño oscuro (2026-11-16): panel dividido. A la izquierda, un video corto de referencia (con la
// foto del trabajador con chaleco como poster); a la derecha, la lista sobre carbón con íconos dorados.
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
      {/* Video de PRUEBA (2026-11-27, pedido de Sebastián para ver cómo queda): trae marca de agua
          de TikTok y logos de otra marca, sin permiso de uso. Cambiarlo por un video de Fesapy o con
          licencia libre. La foto del trabajador con chaleco queda como poster. Marco de proporción
          fija: nada se mueve al cargar (CLS 0). */}
      <VideoReferencia
        src="/video/prueba-bomberos.mp4"
        poster={chalecoObra.src}
        descripcion="Video de bomberos con equipo de protección personal"
        // El video es vertical: en celular el marco es 4:5 (recorta poco); en escritorio se ve
        // completo, centrado sobre negro, como un reel.
        className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[30rem]"
        claseVideo="object-cover lg:object-contain"
      />

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
