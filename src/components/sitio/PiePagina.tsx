import { contacto, empresa } from "@/lib/contenido";
import { ENLACE_COTIZAR } from "@/lib/whatsapp";
import { Logo } from "./Logo";

// Pie de página negro con el logo, la ciudad y los datos de contacto.
// Mientras falten el número o el correo, se ve un TODO(contenido) a propósito,
// para que nadie publique la página sin esos datos.
export function PiePagina() {
  const enlace = "underline underline-offset-4 hover:text-dorado";

  return (
    // pb-28: deja espacio abajo para que el botón flotante no tape el texto.
    <footer className="border-t-4 border-dorado bg-negro px-4 pt-10 pb-28 text-blanco">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <Logo />

        <address className="flex flex-col gap-2 not-italic">
          <p>{empresa.ciudad}</p>
          <p>
            WhatsApp:{" "}
            {contacto.whatsapp ? (
              <a
                href={ENLACE_COTIZAR}
                target="_blank"
                rel="noopener noreferrer"
                className={enlace}
              >
                {contacto.whatsapp}
              </a>
            ) : (
              <span>TODO(contenido): número de WhatsApp</span>
            )}
          </p>
          <p>
            Correo:{" "}
            {contacto.correo ? (
              <a href={`mailto:${contacto.correo}`} className={enlace}>
                {contacto.correo}
              </a>
            ) : (
              <span>TODO(contenido): correo</span>
            )}
          </p>
        </address>
      </div>

      <p className="mx-auto mt-10 max-w-6xl border-t border-blanco/20 pt-6 text-sm text-blanco/80">
        © {empresa.anioCopyright} {empresa.nombre}
      </p>
    </footer>
  );
}
