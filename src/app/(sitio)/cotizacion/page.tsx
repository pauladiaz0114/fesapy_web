import type { Metadata } from "next";
import { Suspense } from "react";
import { FormularioCotizacion } from "@/components/cotizacion/FormularioCotizacion";
import { EncabezadoPagina } from "@/components/sitio/EncabezadoPagina";
import { productoPorSlug } from "@/lib/catalogo";
import { categoriaValida } from "@/lib/contenido";

export const metadata: Metadata = {
  title: "Cotización",
  description:
    "Solicita tu cotización de dotación industrial, elementos de protección personal y calzado de seguridad. Envíala por WhatsApp o por correo.",
};

type ParametrosURL = Promise<{ [clave: string]: string | string[] | undefined }>;

const primero = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

// Lee ?categoria=<slug>&producto=<slug> de la dirección. Como depende de la petición, va dentro
// de un <Suspense> (así lo pide Next.js con cacheComponents): el resto de la página se
// prepara de antemano y solo esta parte se resuelve al entrar.
// Ambos valores se validan contra el catálogo: si no existen, se ignoran (sin error).
// Si el producto existe, manda: su categoría queda preseleccionada y el mensaje arranca con
// "Quiero cotizar: <producto>" (la persona puede editarlo).
async function FormularioConCategoria({ searchParams }: { searchParams: ParametrosURL }) {
  const { categoria, producto } = await searchParams;
  const prod = productoPorSlug(primero(producto) ?? "");
  const cat = prod ? prod.categoria : categoriaValida(primero(categoria));
  return (
    <FormularioCotizacion
      // key: si cambia la dirección sin recargar, el formulario se reinicia con los valores nuevos.
      key={`${cat ?? ""}|${prod?.slug ?? ""}`}
      categoriaInicial={cat}
      mensajeInicial={prod ? `Quiero cotizar: ${prod.nombre}` : undefined}
    />
  );
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
