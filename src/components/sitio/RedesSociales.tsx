import type { ComponentType } from "react";
import { IconoFacebook, IconoInstagram } from "@/components/ui/iconos";
import { redes } from "@/lib/contenido";

// Enlaces a Instagram y Facebook de Fesapy, con ícono y nombre de la red.
// - Los enlaces salen de src/lib/contenido.ts (sin parámetros de rastreo).
// - target="_blank" + rel="noopener noreferrer": abren en otra pestaña sin que esa página
//   pueda controlar la nuestra ni saber de dónde venía la visita.
// - aria-label empieza con el texto visible ("Instagram…"), así quien usa control por voz
//   puede decir "clic en Instagram", y avisa que se abre otra pestaña.
// - min-h-11 = 44 px: zona cómoda para el dedo. El foco lo da la regla global de globals.css.

type Red = { nombre: string; url: string; Icono: ComponentType<{ className?: string }> };

const lista: Red[] = [
  { nombre: "Instagram", url: redes.instagram, Icono: IconoInstagram },
  { nombre: "Facebook", url: redes.facebook, Icono: IconoFacebook },
];

export function RedesSociales({
  claseLista = "",
  claseEnlace = "",
}: {
  claseLista?: string;
  claseEnlace?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-1 ${claseLista}`}>
      {lista.map(({ nombre, url, Icono }) => (
        <li key={nombre}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${nombre} de Fesapy (se abre en otra pestaña)`}
            className={`inline-flex min-h-11 items-center gap-2 underline underline-offset-4 ${claseEnlace}`}
          >
            <Icono className="size-6 shrink-0" />
            {nombre}
          </a>
        </li>
      ))}
    </ul>
  );
}
