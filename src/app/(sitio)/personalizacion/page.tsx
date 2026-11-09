import type { Metadata } from "next";
import { BotonWhatsApp } from "@/components/ui/BotonWhatsApp";
import { BotonEnlace } from "@/components/ui/Boton";
import { EncabezadoPagina } from "@/components/sitio/EncabezadoPagina";

export const metadata: Metadata = {
  title: "Personalización",
  description:
    "Dotación industrial con el logo de tu empresa: bordado y estampado. Cuéntanos qué necesitas y te enviamos tu cotización.",
};

const pasos = [
  {
    titulo: "Cuéntanos qué necesitas",
    texto: "Dinos qué prendas o productos quieres personalizar y para cuántas personas.",
  },
  {
    titulo: "Envíanos tu logo",
    texto: "Mándanoslo por WhatsApp o por correo, junto con la solicitud de cotización.",
    // TODO(contenido): formatos de archivo que sirven para bordar y estampar.
  },
  {
    titulo: "Recibe tu cotización",
    texto: "Te respondemos con la cotización para tu empresa.",
  },
];

export default function Personalizacion() {
  return (
    <>
      <EncabezadoPagina titulo="Personalización con el logo de tu empresa">
        <p>
          Fabricamos dotación y la personalizamos con <strong>bordado</strong> y{" "}
          <strong>estampado</strong>, para que tu equipo lleve la identidad de tu empresa.
        </p>
      </EncabezadoPagina>

      <section aria-labelledby="titulo-pasos" className="bg-blanco px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2
            id="titulo-pasos"
            className="font-titulo text-3xl font-bold uppercase text-negro sm:text-4xl"
          >
            Cómo pedirlo
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {pasos.map(({ titulo, texto }, i) => (
              <li key={titulo} className="rounded border-t-4 border-dorado bg-crema p-6">
                <span className="font-titulo text-4xl font-bold text-negro">{i + 1}</span>
                <h3 className="mt-2 font-titulo text-xl font-bold uppercase text-negro">
                  {titulo}
                </h3>
                <p className="mt-2 text-gris">{texto}</p>
              </li>
            ))}
          </ol>

          {/* TODO(contenido): cantidad mínima para personalizar, tiempos de entrega y fotos
              de trabajos bordados y estampados (docs/BRIEF.md §7). */}
          <div className="mt-10 flex flex-wrap gap-3">
            <BotonEnlace href="/cotizacion?categoria=dotacion-ropa-de-trabajo" variante="negro">
              Solicitar cotización
            </BotonEnlace>
            <BotonWhatsApp variante="contorno" />
          </div>
        </div>
      </section>
    </>
  );
}
