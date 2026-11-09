import type { Metadata } from "next";
import { BotonEnlace } from "@/components/ui/Boton";
import { EncabezadoPagina } from "@/components/sitio/EncabezadoPagina";
import { empresa, redes } from "@/lib/contenido";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Fesapy Distribuciones: proveedor de dotación y seguridad industrial para empresas, desde Madrid, Cundinamarca.",
};

// Texto basado en la presentación del portafolio de Fesapy (página 2), reescrito.
// Solo se dice lo que está en el portafolio y en docs/BRIEF.md. Lo demás queda como TODO(contenido).
export default function Nosotros() {
  return (
    <>
      <EncabezadoPagina titulo="Nosotros">
        <p>
          {empresa.razonSocial} ({empresa.nombre}) es una empresa de {empresa.ciudad} que
          comercializa elementos de protección personal y soluciones de seguridad industrial para
          empresas.
        </p>
      </EncabezadoPagina>

      <section className="bg-blanco px-4 py-14 sm:py-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-lg text-gris">
          <p>
            Fesapy nació al notar una necesidad real del mercado: la falta de soluciones integrales
            y confiables en protección laboral. Hoy, con {empresa.experiencia.toLowerCase()},
            somos una empresa en crecimiento que se enfoca en ofrecer productos de calidad y
            acompañamiento profesional a cada cliente.
          </p>
          <p>
            Nuestro trabajo es cuidar la integridad y el bienestar de las personas que laboran en
            entornos exigentes. Por eso nuestro portafolio reúne dotación industrial, elementos de
            protección personal, equipos para trabajo en alturas y señalización, con las normas
            que el fabricante indica en cada ficha de producto.
          </p>
          <p>
            Vamos más allá de entregar productos: brindamos asesoría especializada y capacitación
            técnica para que los equipos se usen correctamente y rindan lo máximo en campo.
          </p>

          <section aria-labelledby="titulo-proposito" className="rounded border-l-4 border-dorado bg-crema p-6">
            <h2 id="titulo-proposito" className="font-titulo text-2xl font-bold uppercase text-negro">
              Nuestro propósito
            </h2>
            <p className="mt-2 text-negro">
              Ser el aliado estratégico en seguridad industrial de nuestros clientes, aportando
              soluciones confiables que les permitan operar con tranquilidad, cumplimiento y
              eficiencia.
            </p>
          </section>

          <section aria-labelledby="titulo-sectores-nosotros">
            <h2
              id="titulo-sectores-nosotros"
              className="font-titulo text-2xl font-bold uppercase text-negro"
            >
              Sectores con los que trabajamos
            </h2>
            <p className="mt-2">
              Energético, transporte, petrolero, industrial y logístico, entre otros.
            </p>
          </section>

          <p>
            Puedes seguirnos en redes como {redes.usuario}. Nuestro sitio actual es{" "}
            <a
              href={empresa.sitioActualUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-negro underline underline-offset-4 hover:text-gris focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-negro"
            >
              {empresa.sitioActual}
            </a>
            .
          </p>

          {/* TODO(contenido): año de fundación (el portafolio solo dice "más de 4 años"). */}
          <p className="rounded border-2 border-dashed border-negro/40 p-4 text-center">
            TODO(contenido): año de fundación de Fesapy.
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
