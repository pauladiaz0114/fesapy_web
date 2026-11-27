import type { ComponentType } from "react";
import { BotonEnlace } from "@/components/ui/Boton";
import { BotonWhatsApp } from "@/components/ui/BotonWhatsApp";
import { IconoCamion, IconoDocumento, IconoMensaje, IconoReloj } from "@/components/ui/iconos";
import { empresa } from "@/lib/contenido";
import { VideoHero } from "./VideoHero";

type Beneficio = {
  titulo: string;
  Icono: ComponentType<{ className?: string }>;
};

// Beneficios en una fila de íconos con título corto y SIN descripción (2026-11-12).
// Todos están confirmados en docs/BRIEF.md (envíos nacionales, horario,
// facturación electrónica). TODO(contenido): alcance exacto de la asesoría en EPP.
const beneficios: Beneficio[] = [
  { titulo: "Asesoría para tu equipo", Icono: IconoMensaje },
  { titulo: "Envíos nacionales", Icono: IconoCamion },
  { titulo: "Atención todos los días", Icono: IconoReloj },
  { titulo: "Facturación electrónica", Icono: IconoDocumento },
];

// Primera sección, en el diseño oscuro de impacto (2026-11-16, propuesta 2). Aquí está el ÚNICO
// <h1> de la página de inicio. Lleva dos bloques: el hero (fondo negro, con un resplandor dorado
// muy suave arriba a la derecha) y la franja de beneficios (fondo carbón).
export function Hero() {
  return (
    <>
      <section className="bg-negro bg-[radial-gradient(60%_70%_at_88%_0%,rgba(232,181,62,0.16),transparent)] px-4 pt-12 pb-12 text-blanco sm:pt-16 lg:pt-20 lg:pb-16">
        {/* Mobile first: una columna en celular; desde lg, texto a la izquierda y fotos a la derecha. */}
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col items-start gap-5">
            {/* Dorado como texto: permitido porque el fondo es negro. */}
            <p className="border-l-4 border-dorado pl-3 font-titulo text-lg font-bold uppercase tracking-wider text-dorado">
              {empresa.lema}
            </p>
            <h1 className="font-titulo text-4xl font-bold uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
              Todo lo que tu empresa necesita en seguridad,{" "}
              <span className="text-dorado">en un solo lugar</span>
            </h1>
            <p className="max-w-xl text-lg text-blanco/80">
              Dotación industrial, elementos de protección personal y calzado de seguridad para
              tu equipo, con el logo de tu empresa. Cuéntanos qué necesitas y te enviamos tu
              cotización.
            </p>
            <div className="flex flex-wrap gap-3">
              <BotonWhatsApp variante="dorado" />
              <BotonEnlace href="/cotizacion" variante="contornoClaro">
                Solicitar cotización
              </BotonEnlace>
            </div>
          </div>

          <VideoHero />
        </div>
      </section>

      {/* Beneficios: una fila de 4 desde sm; en celular, 2 × 2. Íconos dorados sobre carbón. */}
      <section aria-label="Beneficios de trabajar con Fesapy" className="bg-carbon px-4 text-blanco">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-4">
          {beneficios.map(({ titulo, Icono }) => (
            <li
              key={titulo}
              className="flex items-center gap-3 border-b border-blanco/10 px-2 py-5 odd:border-r sm:border-b-0 sm:border-r sm:px-5 sm:last:border-r-0"
            >
              <Icono className="size-7 shrink-0 text-dorado" />
              <span className="font-titulo text-base font-bold uppercase leading-tight sm:text-lg">
                {titulo}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
