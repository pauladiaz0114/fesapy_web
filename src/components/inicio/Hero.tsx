import type { ComponentType } from "react";
import { BotonEnlace } from "@/components/ui/Boton";
import { BotonWhatsApp } from "@/components/ui/BotonWhatsApp";
import {
  IconoDocumento,
  IconoEtiqueta,
  IconoPaquete,
  IconoUniforme,
} from "@/components/ui/iconos";
import { empresa } from "@/lib/contenido";
import { HeroCarrusel } from "./HeroCarrusel";

type Beneficio = {
  titulo: string;
  texto: string;
  Icono: ComponentType<{ className?: string }>;
};

// Beneficios que ya están confirmados en docs/BRIEF.md.
const beneficios: Beneficio[] = [
  { titulo: "Dotación industrial", texto: "Uniformes y ropa de trabajo.", Icono: IconoUniforme },
  { titulo: "Con el logo de tu empresa", texto: "Bordado y estampado.", Icono: IconoEtiqueta },
  { titulo: "Un solo proveedor", texto: "Toda tu seguridad en un lugar.", Icono: IconoPaquete },
  { titulo: "Facturación electrónica", texto: "Para tus compras empresariales.", Icono: IconoDocumento },
];

// Primera sección. Aquí está el ÚNICO <h1> de la página de inicio.
export function Hero() {
  return (
    <section className="bg-crema px-4 pt-12 pb-10 sm:pt-16 lg:pt-20">
      {/* Mobile first: una columna en celular; desde lg, texto a la izquierda y fotos a la derecha. */}
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col items-start gap-5">
          {/* Texto gris oscuro sobre crema: el dorado queda solo como borde. */}
          <p className="border-l-4 border-dorado pl-3 font-titulo text-lg font-bold uppercase tracking-wider text-gris">
            {empresa.lema}
          </p>
          <h1 className="font-titulo text-4xl font-bold uppercase leading-tight text-negro sm:text-5xl lg:text-6xl">
            Todo lo que tu empresa necesita en seguridad, en un solo lugar
          </h1>
          <p className="max-w-xl text-lg text-gris">
            Dotación industrial, elementos de protección personal y calzado de seguridad para
            tu equipo, con el logo de tu empresa. Cuéntanos qué necesitas y te enviamos tu
            cotización.
          </p>
          <div className="flex flex-wrap gap-3">
            <BotonWhatsApp variante="negro" />
            <BotonEnlace href="/cotizacion" variante="contorno">
              Solicitar cotización
            </BotonEnlace>
          </div>
        </div>

        <HeroCarrusel />
      </div>

      <ul className="mx-auto mt-12 grid max-w-6xl gap-6 border-t border-negro/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {beneficios.map(({ titulo, texto, Icono }) => (
          <li key={titulo} className="flex items-start gap-3">
            {/* Círculo dorado con ícono negro: el dorado va como fondo. */}
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-dorado text-negro">
              <Icono className="size-6" />
            </span>
            <span className="flex flex-col">
              <span className="font-titulo text-lg font-bold uppercase leading-tight text-negro">
                {titulo}
              </span>
              <span className="text-gris">{texto}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
