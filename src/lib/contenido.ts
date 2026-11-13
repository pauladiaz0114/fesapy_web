// Datos de la empresa que se muestran en la página.
// Se cambian aquí, en un solo lugar, y se actualizan en todo el sitio.
// Lo que todavía no tenemos queda vacío con un TODO(contenido): NO inventar datos.

export const empresa = {
  nombre: "Fesapy Distribuciones",
  nombreCorto: "Fesapy",
  // Razón social y datos tomados del portafolio de Fesapy (PDF).
  razonSocial: "Fesapy Distribuciones SAS",
  // Confirmado por Sebastián el 2026-11-12 (antes: "Más de 4 años de experiencia", del portafolio).
  experiencia: "4 años en el mercado",
  // Dominio propio de la empresa. Por ahora SOLO se muestra como enlace en el pie.
  // TODO(dominio): cuando www.fesapy.tech esté conectado en Vercel, usarlo también como
  // metadataBase y en los enlaces canónicos (hoy el sitio vive en fesapy-web.vercel.app).
  sitioWeb: "www.fesapy.tech",
  sitioWebUrl: "https://www.fesapy.tech",
  lema: "Dotaciones para tu empresa",
  // Ciudades con sede (confirmado por Sebastián el 2026-11-12). Sin direcciones ni mapas:
  // TODO(contenido): dirección de cada sede, cuando Fesapy decida publicarlas.
  sedes: ["Madrid (Cundinamarca)", "Bogotá", "Villavicencio"],
  // Las mismas ciudades en una frase: "Madrid (Cundinamarca), Bogotá y Villavicencio".
  sedesTexto: "Madrid (Cundinamarca), Bogotá y Villavicencio",
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
  // En minúsculas: así se escribe y se copia sin errores.
  correo: "asistente.fesapy@gmail.com",
  // Horario de atención por WhatsApp y correo (confirmado por Fesapy el 2026-11-12).
  horario: "Todos los días, 7:00 a. m. a 8:00 p. m.",
} as const;

// Redes sociales (confirmadas por Fesapy el 2026-11-12).
// Los enlaces van SIN parámetros de rastreo (?igsh=, ?mibextid=, utm_...): no hace falta
// decirle a la red de dónde viene la visita.
export const redes = {
  usuario: "@fesapydistribuciones",
  instagram: "https://www.instagram.com/fesapydistribuciones",
  // Fesapy compartió https://www.facebook.com/share/19zYB3LRyD/, pero ese enlace corto redirige a
  // esta página agregando "?rdid=..." (un código distinto en cada visita). Se usa la dirección
  // final, limpia: lleva a la misma página sin redirección ni parámetros.
  facebook: "https://www.facebook.com/fesapy.distribuciones/",
} as const;

// Datos legales para la política de tratamiento de datos (Ley 1581 de 2012).
export const legal = {
  // TODO(contenido): razón social exacta según el RUT (el portafolio dice "Fesapy Distribuciones SAS",
  // pero en la política solo va lo confirmado con el documento).
  razonSocial: "",
  // TODO(contenido): domicilio legal de la empresa (ciudad que figura en el RUT).
  domicilio: "",
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
    slug: "senalizacion-y-seguridad-vial",
    nombre: "Señalización y seguridad vial",
    descripcion: "Letreros y señales, conos, cintas de demarcación, barreras y delineadores.",
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
