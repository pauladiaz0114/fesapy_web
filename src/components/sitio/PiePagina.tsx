import { contacto, empresa } from "@/lib/contenido";
import { ENLACE_COTIZAR } from "@/lib/whatsapp";
import { enlacesMenu } from "@/lib/menu";
import { Logo } from "./Logo";
import { RedesSociales } from "./RedesSociales";

// Pie de página negro. Muestra las ciudades con sede, sin direcciones ni mapas (aún no se
// publican), y el contacto por WhatsApp, correo y redes.
// Dorado como texto: permitido porque el fondo es negro.
// Los enlaces del pie son <a> normales (no <Link> de Next.js) desde el 2026-11-27: en un iPhone
// tocarlos no llevaba a la página. Con <a> el navegador carga la página completa desde arriba,
// lo que funciona igual en cualquier celular (el sitio es estático y carga rápido).
const enlaceClase =
  "inline-flex min-h-11 items-center underline underline-offset-4 hover:text-dorado";

// Enlaces dentro de una línea de contacto: van en línea, sin altura extra.
const enlaceLinea =
  "underline underline-offset-4 hover:text-dorado";

function Dato({ etiqueta, children }: { etiqueta: string; children: React.ReactNode }) {
  return (
    <p>
      <span className="text-blanco/70">{etiqueta}: </span>
      {children}
    </p>
  );
}

export function PiePagina() {
  return (
    // pb-28: deja espacio abajo para que el botón flotante no tape el texto.
    <footer className="border-t-4 border-dorado bg-negro px-4 pt-12 pb-28 text-blanco">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div className="flex flex-col items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- <a> a propósito: ver arriba (iPhone) */}
          <a href="/" aria-label="Fesapy Distribuciones, ir al inicio">
            <Logo />
          </a>
          <p className="max-w-xs text-blanco/80">{empresa.lema}.</p>
        </div>

        <nav aria-label="Pie de página">
          <h2 className="font-titulo text-xl font-bold uppercase text-dorado">Páginas</h2>
          <ul className="mt-2 flex flex-col">
            {enlacesMenu.map(({ href, texto }) => (
              <li key={href}>
                <a href={href} className={enlaceClase}>
                  {texto}
                </a>
              </li>
            ))}
            <li>
              <a href="/politica-de-datos" className={enlaceClase}>
                Política de datos
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-titulo text-xl font-bold uppercase text-dorado">Contacto</h2>
          <address className="mt-2 flex min-w-0 flex-col gap-1 break-words not-italic">
            <Dato etiqueta="Sedes">{empresa.sedesTexto}</Dato>
            <Dato etiqueta="Horario">{contacto.horario}</Dato>
            <Dato etiqueta="WhatsApp">
              <a href={ENLACE_COTIZAR} target="_blank" rel="noopener noreferrer" className={enlaceLinea}>
                {contacto.whatsappTexto}
              </a>
            </Dato>
            <Dato etiqueta="Correo">
              <a href={`mailto:${contacto.correo}`} className={enlaceLinea}>
                {contacto.correo}
              </a>
            </Dato>
            <Dato etiqueta="Sitio web">
              {/* TODO(dominio): hoy es solo un enlace; el sitio sigue publicado en Vercel. */}
              <a
                href={empresa.sitioWebUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={enlaceLinea}
              >
                {empresa.sitioWeb}
              </a>
            </Dato>
            <RedesSociales claseEnlace="hover:text-dorado" />
          </address>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl border-t border-blanco/20 pt-6 text-sm text-blanco/80">
        © {empresa.anioCopyright} {empresa.razonSocial} · {empresa.experiencia}
      </p>
    </footer>
  );
}
