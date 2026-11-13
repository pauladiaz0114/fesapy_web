import type { Metadata } from "next";
import { Suspense } from "react";
import { FormularioCotizacion } from "@/components/cotizacion/FormularioCotizacion";
import { EncabezadoPagina } from "@/components/sitio/EncabezadoPagina";
import { RedesSociales } from "@/components/sitio/RedesSociales";
import { productoPorSlug } from "@/lib/catalogo";
import { categoriaValida, contacto } from "@/lib/contenido";

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
          {/* Mientras llega la parte que lee la dirección, se muestra el MISMO formulario vacío:
              mide lo mismo, así el pie de página no "salta" cuando aparece el definitivo (CLS 0). */}
          <Suspense fallback={<FormularioCotizacion />}>
            <FormularioConCategoria searchParams={searchParams} />
          </Suspense>

          {/* Otros canales. Fesapy no tiene sede física: solo WhatsApp, correo y redes. */}
          <section
            aria-labelledby="titulo-otros-canales"
            className="mt-12 rounded border-l-4 border-dorado bg-crema p-6 text-gris"
          >
            <h2
              id="titulo-otros-canales"
              className="font-titulo text-2xl font-bold uppercase text-negro"
            >
              ¿Prefieres escribirnos directo?
            </h2>
            <p className="mt-2">
              Correo:{" "}
              <a
                href={`mailto:${contacto.correo}`}
                className="font-bold text-negro underline underline-offset-4 hover:text-gris"
              >
                {contacto.correo}
              </a>
            </p>
            <p className="mt-1">Horario de atención: {contacto.horario}</p>
            <RedesSociales
              claseLista="mt-2"
              claseEnlace="font-bold text-negro hover:text-gris"
            />
          </section>
        </div>
      </section>
    </>
  );
}
