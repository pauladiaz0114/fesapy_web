import type { ComponentType } from "react";
import { IconoCamion, IconoMensaje, IconoReloj } from "@/components/ui/iconos";

type Ventaja = {
  titulo: string;
  texto: string;
  Icono: ComponentType<{ className?: string }>;
};

// Textos prudentes: no se prometen plazos, inventario ni crédito (no están confirmados).
const ventajas: Ventaja[] = [
  {
    titulo: "Asesoría",
    // TODO(contenido): confirmar el alcance de la asesoría en EPP antes de prometer más.
    texto: "Cuéntanos qué necesita tu equipo y te orientamos para armar tu pedido.",
    Icono: IconoMensaje,
  },
  {
    titulo: "Despachos nacionales",
    // TODO(contenido): tiempos y costos de despacho.
    texto: "Enviamos a tu ciudad. Dinos dónde entregar y coordinamos contigo.",
    Icono: IconoCamion,
  },
  {
    titulo: "Atención rápida",
    // TODO(contenido): horario y tiempo de respuesta, cuando la empresa los confirme.
    texto: "Te atendemos por WhatsApp y por correo, sin vueltas.",
    Icono: IconoReloj,
  },
];

export function Ventajas() {
  return (
    <section aria-labelledby="titulo-ventajas" className="bg-blanco px-4 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h2
          id="titulo-ventajas"
          className="font-titulo text-3xl font-bold uppercase text-negro sm:text-4xl"
        >
          Trabajar con Fesapy es más fácil
        </h2>
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {ventajas.map(({ titulo, texto, Icono }) => (
            <li key={titulo} className="flex flex-col gap-3">
              <span className="flex size-14 items-center justify-center rounded-full bg-negro text-dorado">
                <Icono className="size-7" />
              </span>
              <h3 className="font-titulo text-2xl font-bold uppercase text-negro">{titulo}</h3>
              <p className="text-gris">{texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
