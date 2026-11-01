import type { ComponentType } from "react";
import {
  IconoCalidad,
  IconoDotacion,
  IconoSeguridad,
  IconoUniforme,
} from "@/components/ui/iconos";

type Punto = {
  titulo: string;
  texto: string;
  Icono: ComponentType<{ className?: string }>;
};

// Textos basados en docs/BRIEF.md (secciones 1 y 2). No agregar datos sin confirmar.
const puntos: Punto[] = [
  {
    titulo: "Uniformes industriales",
    texto: "Overoles y ropa de trabajo con el logo de tu empresa, bordado o estampado.",
    Icono: IconoUniforme,
  },
  {
    titulo: "Dotaciones empresariales",
    texto: "La dotación completa de tu equipo con un solo proveedor.",
    Icono: IconoDotacion,
  },
  {
    titulo: "Elementos de seguridad",
    texto: "Elementos de protección personal, calzado de seguridad, señalización y botiquines.",
    Icono: IconoSeguridad,
  },
  {
    titulo: "Calidad y confianza",
    texto: "Productos certificados y facturación electrónica.",
    Icono: IconoCalidad,
  },
];

export function LoQueOfrecemos() {
  return (
    <section
      aria-labelledby="titulo-ofrecemos"
      className="bg-negro px-4 py-14 text-blanco sm:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="titulo-ofrecemos"
          className="font-titulo text-3xl font-extrabold uppercase sm:text-4xl"
        >
          Lo que ofrecemos
        </h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {puntos.map(({ titulo, texto, Icono }) => (
            <li key={titulo} className="flex flex-col gap-3">
              {/* Círculo dorado con ícono negro. */}
              <span className="flex size-14 items-center justify-center rounded-full bg-dorado text-negro">
                <Icono className="size-7" />
              </span>
              <h3 className="font-titulo text-xl font-bold uppercase">{titulo}</h3>
              <p className="text-blanco/80">{texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
