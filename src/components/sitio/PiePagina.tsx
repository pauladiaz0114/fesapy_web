import Link from "next/link";
import { contacto, empresa, redes, sede } from "@/lib/contenido";
import { ENLACE_COTIZAR } from "@/lib/whatsapp";
import { enlacesMenu } from "@/lib/menu";
import { Logo } from "./Logo";

// Pie de página negro. Mientras falten datos (dirección, horario, redes), se ve un
// TODO(contenido) a propósito, para que nadie publique sin completarlos.
// Dorado como texto: permitido porque el fondo es negro.
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

function RedSocial({ nombre, url }: { nombre: string; url: string }) {
  return (
    <Dato etiqueta={nombre}>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className={enlaceLinea}>
          {redes.usuario}
        </a>
      ) : (
        <span>TODO(contenido): enlace de {nombre}</span>
      )}
    </Dato>
  );
}

export function PiePagina() {
  return (
    // pb-28: deja espacio abajo para que el botón flotante no tape el texto.
    <footer className="border-t-4 border-dorado bg-negro px-4 pt-12 pb-28 text-blanco">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div className="flex flex-col items-start gap-4">
          <Link href="/" aria-label="Fesapy Distribuciones, ir al inicio">
            <Logo />
          </Link>
          <p className="max-w-xs text-blanco/80">{empresa.lema}.</p>
        </div>

        <nav aria-label="Pie de página">
          <h2 className="font-titulo text-xl font-bold uppercase text-dorado">Páginas</h2>
          <ul className="mt-2 flex flex-col">
            {enlacesMenu.map(({ href, texto }) => (
              <li key={href}>
                <Link href={href} className={enlaceClase}>
                  {texto}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/politica-de-datos" className={enlaceClase}>
                Política de datos
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-titulo text-xl font-bold uppercase text-dorado">Contacto</h2>
          <address className="mt-2 flex min-w-0 flex-col gap-1 break-words not-italic">
            <Dato etiqueta="Sede">{empresa.ciudad}</Dato>
            <Dato etiqueta="Dirección">
              {sede.direccion || <span>TODO(contenido): dirección</span>}
            </Dato>
            <Dato etiqueta="Horario">
              {sede.horario || <span>TODO(contenido): horario</span>}
            </Dato>
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
            <RedSocial nombre="Instagram" url={redes.instagram} />
            <RedSocial nombre="Facebook" url={redes.facebook} />
            <Dato etiqueta="Sitio actual">
              <a
                href={empresa.sitioActualUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={enlaceLinea}
              >
                {empresa.sitioActual}
              </a>
            </Dato>
          </address>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl border-t border-blanco/20 pt-6 text-sm text-blanco/80">
        © {empresa.anioCopyright} {empresa.razonSocial} · {empresa.experiencia}
      </p>
    </footer>
  );
}
