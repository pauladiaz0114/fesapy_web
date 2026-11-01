import Image, { type StaticImageData } from "next/image";
import botas from "../../../public/referencia/botas-seguridad.webp";
import casco from "../../../public/referencia/casco-epp.webp";
import dotacion from "../../../public/referencia/dotacion-reflectiva.webp";
import guantes from "../../../public/referencia/guantes-trabajo.webp";

// Collage quieto de 2x2 fotos (sin carrusel ni animaciones).
// TODO(contenido): son fotos de REFERENCIA de Pexels (autores y licencia en
// docs/CREDITOS-IMAGENES.md). Reemplazar por fotos propias de Fesapy,
// sobre todo la de dotación por un overol con logo bordado.
// Si una foto se quita (src: null), se ve un recuadro gris con su nombre.

type Foto = { src: StaticImageData | null; alt: string; etiqueta: string };

const fotos: Foto[] = [
  { src: botas, etiqueta: "Botas de seguridad", alt: "Botas de seguridad negras sobre piso mojado" },
  { src: casco, etiqueta: "Casco y EPP", alt: "Casco, gafas de seguridad y tapabocas en un maniquí" },
  { src: dotacion, etiqueta: "Dotación", alt: "Trabajadores con dotación reflectiva y botas de caucho" },
  { src: guantes, etiqueta: "Guantes", alt: "Trabajador poniéndose guantes de carnaza" },
];

export function CollageFotos() {
  return (
    <ul className="grid grid-cols-2 gap-3" aria-label="Productos que ofrecemos">
      {fotos.map((foto) => (
        <li
          key={foto.etiqueta}
          className="relative aspect-square overflow-hidden rounded bg-negro/10"
        >
          {foto.src ? (
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              // En celular cada foto ocupa ~la mitad de la pantalla; en
              // escritorio, ~una cuarta parte. Así no se descargan fotos gigantes.
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
            />
          ) : (
            <span className="flex h-full items-center justify-center p-3 text-center font-titulo text-lg font-bold uppercase text-gris">
              {foto.etiqueta}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
