import { AnuncioBarra } from "@/components/sitio/AnuncioBarra";
import { Encabezado } from "@/components/sitio/Encabezado";
import { PiePagina } from "@/components/sitio/PiePagina";
import { WhatsAppFlotante } from "@/components/sitio/WhatsAppFlotante";

// Marco común de todas las páginas públicas: barra de anuncio, encabezado,
// contenido de cada página, pie y botón flotante de WhatsApp.
// "(sitio)" es un grupo de rutas: la carpeta no aparece en la dirección (/nosotros, no /sitio/nosotros).
export default function LayoutSitio({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Enlace para quien navega con teclado: salta el menú e ir directo al contenido.
          Solo se ve cuando recibe el foco (Tab). */}
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-dorado focus:px-4 focus:py-2 focus:font-bold focus:text-negro"
      >
        Saltar al contenido
      </a>
      <AnuncioBarra />
      <Encabezado />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <PiePagina />
      <WhatsAppFlotante />
    </>
  );
}
