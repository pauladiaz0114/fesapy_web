import type { Metadata } from "next";
import { Suspense } from "react";
import { FormularioCotizacion } from "@/components/cotizacion/FormularioCotizacion";
import { EncabezadoPagina } from "@/components/sitio/EncabezadoPagina";
import { categoriaValida } from "@/lib/contenido";

export const metadata: Metadata = {
  title: "Cotización",
  description:
    "Solicita tu cotización de dotación industrial, elementos de protección personal y calzado de seguridad. Envíala por WhatsApp o por correo.",
};

type ParametrosURL = Promise<{ [clave: string]: string | string[] | undefined }>;

// Lee ?categoria=<slug> de la dirección. Como depende de la petición, va dentro de un
// <Suspense> (así lo pide Next.js con cacheComponents): el resto de la página se
// prepara de antemano y solo esta parte se resuelve al entrar.
// Solo se acepta un slug de categoría conocido; cualquier otro valor se ignora.
async function FormularioConCategoria({ searchParams }: { searchParams: ParametrosURL }) {
  const { categoria } = await searchParams;
  const valor = Array.isArray(categoria) ? categoria[0] : categoria;
  return <FormularioCotizacion categoriaInicial={categoriaValida(valor)} />;
}

export default function Cotizacion({ searchParams }: { searchParams: ParametrosURL }) {
  return (
    <>
      <EncabezadoPagina titulo="Solicita tu cotización">
        <p>
          Cuéntanos qué necesita tu empresa y envíanos la solicitud por WhatsApp o por correo.
          No mostramos precios: cada empresa recibe su propia cotización.
        </p>
      </EncabezadoPagina>

      <section className="bg-blanco px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <Suspense fallback={<div className="min-h-96 text-gris">Cargando formulario…</div>}>
            <FormularioConCategoria searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
