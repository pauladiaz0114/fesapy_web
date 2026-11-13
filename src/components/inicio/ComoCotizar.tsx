import type { ReactNode } from "react";
import { BotonEnlace } from "@/components/ui/Boton";
import { ImagenSuave } from "@/components/ui/ImagenSuave";
import { Reveal } from "@/components/ui/Reveal";
import { rutaImagen } from "@/lib/catalogo";
import { contacto } from "@/lib/contenido";

// "Cómo cotizar": 3 pasos con imagen arriba, número y un título de una línea (sin párrafos).
// Reemplaza la franja dorada "Solicita tu cotización" y la sección "Trabajar con Fesapy es
// más fácil" (2026-11-12, inicio con menos texto).
// - El número va en un círculo dorado con texto negro: la regla de marca no permite texto
//   dorado sobre blanco o crema.
// - Cada imagen vive en un marco de proporción fija (4:3): nada se mueve al cargar (CLS 0).
// - Las ilustraciones son SVG escritos aquí (sin librerías), con los colores de la marca.

// Fotos del mosaico del paso 1: elegidas SIN marcas visibles (el permiso de uso de las fotos
// del portafolio sigue como TODO(contenido); las botas muestran Kondor, SAGA o Westland).
const mosaico = [
  { archivo: "cascos-dielectricos-tipo-1-2.webp", alt: "Casco de seguridad amarillo" },
  { archivo: "overol-en-dril.webp", alt: "Overol de dotación azul oscuro" },
  { archivo: "arnes-in-8004.webp", alt: "Arnés de seguridad naranja para trabajo en alturas" },
];

function Mosaico() {
  return (
    <div className="grid h-full grid-cols-3 gap-2 p-3">
      {mosaico.map(({ archivo, alt }) => (
        <div key={archivo} className="relative overflow-hidden rounded bg-blanco">
          <ImagenSuave
            src={rutaImagen(archivo)}
            alt={alt}
            fill
            sizes="(min-width: 1184px) 120px, (min-width: 768px) 10vw, 30vw"
            className="object-contain p-2"
          />
        </div>
      ))}
    </div>
  );
}

/** Celular con burbujas de chat (paso 2). */
function IlustracionCelular() {
  return (
    <svg
      viewBox="0 0 240 180"
      role="img"
      aria-label="Ilustración de un celular con una conversación de chat"
      className="size-full"
    >
      {/* Celular */}
      <rect x="80" y="14" width="80" height="152" rx="14" className="fill-negro" />
      <rect x="87" y="28" width="66" height="120" rx="4" className="fill-crema" />
      <rect x="110" y="20" width="20" height="3" rx="1.5" className="fill-gris" />
      {/* Mensaje de la persona (blanco) y respuesta (dorado) */}
      <rect x="93" y="40" width="44" height="18" rx="8" className="fill-blanco" />
      <rect x="99" y="47" width="30" height="4" rx="2" className="fill-gris" />
      <rect x="103" y="66" width="44" height="18" rx="8" className="fill-dorado" />
      <rect x="109" y="73" width="30" height="4" rx="2" className="fill-negro" />
      <rect x="93" y="92" width="34" height="18" rx="8" className="fill-blanco" />
      <rect x="99" y="99" width="20" height="4" rx="2" className="fill-gris" />
      {/* Burbuja grande que sale del celular, con "escribiendo…" */}
      <path d="M150 52h56a12 12 0 0 1 12 12v24a12 12 0 0 1-12 12h-30l-14 12v-12h-12a12 12 0 0 1-12-12V64a12 12 0 0 1 12-12z" className="fill-dorado stroke-negro" strokeWidth="3" />
      <circle cx="166" cy="76" r="5" className="fill-negro" />
      <circle cx="182" cy="76" r="5" className="fill-negro" />
      <circle cx="198" cy="76" r="5" className="fill-negro" />
    </svg>
  );
}

/** Documento de cotización con check (paso 3). */
function IlustracionCotizacion() {
  return (
    <svg
      viewBox="0 0 240 180"
      role="img"
      aria-label="Ilustración de un documento de cotización aprobado con un check"
      className="size-full"
    >
      {/* Hoja con esquina doblada */}
      <path d="M78 16h62l26 26v118a6 6 0 0 1-6 6H78a6 6 0 0 1-6-6V22a6 6 0 0 1 6-6z" className="fill-blanco stroke-negro" strokeWidth="4" />
      <path d="M140 16v20a6 6 0 0 0 6 6h20" className="fill-crema stroke-negro" strokeWidth="4" />
      {/* Renglones: título y líneas de la cotización */}
      <rect x="86" y="34" width="40" height="8" rx="2" className="fill-negro" />
      <rect x="86" y="58" width="64" height="5" rx="2.5" className="fill-gris" />
      <rect x="86" y="72" width="56" height="5" rx="2.5" className="fill-gris" />
      <rect x="86" y="86" width="64" height="5" rx="2.5" className="fill-gris" />
      <rect x="86" y="100" width="44" height="5" rx="2.5" className="fill-gris" />
      {/* Sello con check */}
      <circle cx="160" cy="128" r="30" className="fill-dorado stroke-negro" strokeWidth="4" />
      <path d="m145 128 10 10 20-20" fill="none" className="stroke-negro" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const pasos: { titulo: string; imagen: ReactNode }[] = [
  { titulo: "Elige lo que necesitas", imagen: <Mosaico /> },
  { titulo: "Cuéntanos por WhatsApp o correo", imagen: <IlustracionCelular /> },
  { titulo: "Recibe tu cotización", imagen: <IlustracionCotizacion /> },
];

export function ComoCotizar() {
  return (
    <section aria-labelledby="titulo-como-cotizar" className="bg-blanco px-4 py-14 sm:py-16">
      <Reveal escalonar className="mx-auto max-w-6xl">
        <h2
          id="titulo-como-cotizar"
          className="font-titulo text-3xl font-bold uppercase text-negro sm:text-4xl"
        >
          Cómo cotizar
        </h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {pasos.map(({ titulo, imagen }, i) => (
            <li key={titulo} data-escalon className="flex flex-col gap-4">
              <div className="aspect-[4/3] overflow-hidden rounded bg-crema">{imagen}</div>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-dorado font-titulo text-3xl font-bold text-negro"
                >
                  {i + 1}
                </span>
                <h3 className="font-titulo text-xl font-bold uppercase leading-tight text-negro">
                  <span className="sr-only">Paso {i + 1}: </span>
                  {titulo}
                </h3>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <BotonEnlace href="/cotizacion" variante="negro">
            Cotizar ahora
          </BotonEnlace>
          <p className="text-sm text-gris">Sin crear cuenta · {contacto.horario}</p>
        </div>
      </Reveal>
    </section>
  );
}
