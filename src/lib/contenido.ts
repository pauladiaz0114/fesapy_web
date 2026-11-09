// Datos de la empresa que se muestran en la página.
// Se cambian aquí, en un solo lugar, y se actualizan en todo el sitio.
// Lo que todavía no tenemos queda vacío con un TODO(contenido): NO inventar datos.

export const empresa = {
  nombre: "Fesapy Distribuciones",
  nombreCorto: "Fesapy",
  lema: "Dotaciones para tu empresa",
  ciudad: "Madrid, Cundinamarca",
  // Año que aparece en el pie de página (© 2026). Se escribe fijo a propósito:
  // así la página puede ser 100 % estática y no depende de la fecha del servidor.
  anioCopyright: 2026,
} as const;

export const contacto = {
  // Número de WhatsApp con indicativo de país (57), solo dígitos, sin "+" ni espacios:
  // así lo exige wa.me. Si se deja vacío, el botón abre WhatsApp sin destinatario.
  whatsapp: "573123329422",
  // El mismo número, escrito para que lo lean las personas (pie de página).
  whatsappTexto: "+57 312 332 9422",
  correo: "asistente.fesapy@gmail.com",
} as const;

// Solo hay UNA sede (Madrid, Cundinamarca).
export const sede = {
  // TODO(contenido): dirección completa de la sede de Madrid.
  direccion: "",
  // TODO(contenido): horario de atención.
  horario: "",
} as const;

// Redes sociales. Si el enlace está vacío, el pie de página muestra un TODO(contenido).
export const redes = {
  // TODO(contenido): enlace del Instagram de Fesapy (https://instagram.com/...).
  instagram: "",
  // TODO(contenido): enlace del Facebook de Fesapy (https://facebook.com/...).
  facebook: "",
} as const;

// Datos legales para la política de tratamiento de datos (Ley 1581 de 2012).
export const legal = {
  // TODO(contenido): razón social completa, tal como aparece en el RUT.
  razonSocial: "",
  // TODO(contenido): NIT de la empresa.
  nit: "",
  // Versión de la política: sube el número cuando el texto cambie.
  politicaVersion: "0.1 (borrador)",
  politicaFecha: "9 de noviembre de 2026",
} as const;

// Las 8 categorías de docs/BRIEF.md §2.
// El "slug" es el nombre que viaja en la dirección: /cotizacion?categoria=<slug>
export const categorias = [
  {
    slug: "dotacion-ropa-de-trabajo",
    nombre: "Dotación y ropa de trabajo",
    descripcion: "Overoles, camisas, chaquetas y uniformes para tu equipo.",
  },
  {
    slug: "calzado-de-seguridad",
    nombre: "Calzado de seguridad",
    descripcion: "Botas de seguridad de varias marcas.",
  },
  {
    slug: "proteccion-personal",
    nombre: "Elementos de protección personal",
    descripcion: "Cascos, guantes, gafas y protección auditiva y respiratoria.",
  },
  {
    slug: "trabajo-en-alturas",
    nombre: "Trabajo en alturas e izaje",
    descripcion: "Eslingas y arneses.",
  },
  {
    slug: "botiquines",
    nombre: "Botiquines y primeros auxilios",
    descripcion: "Botiquines y elementos de primeros auxilios.",
  },
  {
    slug: "senalizacion",
    nombre: "Señalización y letreros",
    descripcion: "Letreros y señales para tu planta u obra.",
  },
  {
    slug: "stickers-personalizacion",
    nombre: "Stickers y personalización",
    descripcion: "Stickers y piezas con la identidad de tu empresa.",
  },
  {
    slug: "lubricantes-mantenimiento",
    nombre: "Lubricantes y mantenimiento",
    descripcion: "Lubricantes y productos de mantenimiento como WD-40 y CRC.",
  },
] as const;

export type CategoriaSlug = (typeof categorias)[number]["slug"];

/** Devuelve el slug si es una categoría conocida; si no, undefined. */
export function categoriaValida(valor: unknown): CategoriaSlug | undefined {
  return categorias.find((c) => c.slug === valor)?.slug;
}
