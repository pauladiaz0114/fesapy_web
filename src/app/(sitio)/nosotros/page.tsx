import type { Metadata } from "next";
import { BotonEnlace } from "@/components/ui/Boton";
import { EncabezadoPagina } from "@/components/sitio/EncabezadoPagina";
import { empresa } from "@/lib/contenido";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Fesapy Distribuciones: proveedor de dotación y seguridad industrial para empresas, desde Madrid, Cundinamarca.",
};

// Solo se dice lo confirmado en docs/BRIEF.md. Lo demás queda como TODO(contenido).
export default function Nosotros() {
  return (
    <>
      <EncabezadoPagina titulo="Nosotros">
        <p>
          {empresa.nombre} es un proveedor de dotación y seguridad industrial para empresas,
          con sede en {empresa.ciudad}.
        </p>
      </EncabezadoPagina>

      <section className="bg-blanco px-4 py-14 sm:py-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-lg text-gris">
          <p>
            Fabricamos dotación y ropa de trabajo, y la personalizamos con el logo de tu
            empresa. También distribuimos elementos de protección personal, calzado de
            seguridad, señalización y seguridad vial, botiquines y más.
          </p>
          <p>
            Nuestra idea es sencilla: que tu empresa resuelva toda su seguridad con un solo
            proveedor. Atendemos a fábricas, petroleras y constructoras, y trabajamos con
            productos certificados y facturación electrónica.
          </p>
          {/* TODO(contenido): año de fundación e historia de la empresa. */}
          <p className="rounded border-2 border-dashed border-negro/40 p-4 text-center">
            TODO(contenido): historia de Fesapy y año de fundación.
          </p>
          <div>
            <BotonEnlace href="/cotizacion" variante="negro">
              Solicitar cotización
            </BotonEnlace>
          </div>
        </div>
      </section>
    </>
  );
}
