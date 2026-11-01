import type { ComponentType } from "react";
import {
  IconoConstructora,
  IconoFabrica,
  IconoPetrolera,
} from "@/components/ui/iconos";

type Sector = {
  nombre: string;
  texto: string;
  Icono: ComponentType<{ className?: string }>;
};

const sectores: Sector[] = [
  {
    nombre: "Fábricas",
    texto: "Dotación, calzado y protección para el personal de planta.",
    Icono: IconoFabrica,
  },
  {
    nombre: "Petroleras",
    texto: "Ropa de trabajo y elementos de protección para operación en campo.",
    Icono: IconoPetrolera,
  },
  {
    nombre: "Constructoras",
    texto: "Cascos, guantes, botas y señalización para cada obra.",
    Icono: IconoConstructora,
  },
];

export function Sectores() {
  return (
    <section aria-labelledby="titulo-sectores" className="bg-blanco px-4 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h2
          id="titulo-sectores"
          className="font-titulo text-3xl font-extrabold uppercase text-negro sm:text-4xl"
        >
          Sectores que atendemos
        </h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {sectores.map(({ nombre, texto, Icono }) => (
            <li
              key={nombre}
              className="flex flex-col gap-3 rounded border-t-4 border-dorado bg-crema p-6"
            >
              <Icono className="size-9 text-negro" />
              <h3 className="font-titulo text-2xl font-bold uppercase text-negro">
                {nombre}
              </h3>
              <p className="text-gris">{texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
