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
  politicaVersion: "0.2 (borrador)",
  politicaFecha: "27 de noviembre de 2026",
} as const;

// 9 categorías: las 7 de docs/BRIEF.md §2 y, desde el 2026-11-27, Emergencias y Aseo (otros
// productos que vende Fesapy, confirmados por WhatsApp con capturas de referencia).
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
    // Une "Elementos de protección personal" y "Trabajo en alturas e izaje" (2026-11-12).
    // La dirección vieja /productos/trabajo-en-alturas redirige aquí (308, next.config.ts).
    slug: "proteccion-personal",
    nombre: "Protección personal",
    descripcion:
      "Cascos, guantes, gafas, protección auditiva y respiratoria, arneses, eslingas y demás elementos de seguridad.",
  },
  {
    slug: "botiquines",
    nombre: "Botiquines y primeros auxilios",
    descripcion: "Botiquines y elementos de primeros auxilios.",
  },
  {
    // TODO(contenido): productos con foto y ficha cuando Fesapy los entregue.
    slug: "emergencias",
    nombre: "Emergencias y control de derrames",
    descripcion:
      "Avisos industriales, camillas, extintores, salvavidas, inmovilizadores y kits para control de derrames.",
  },
  {
    slug: "senalizacion-y-seguridad-vial",
    nombre: "Señalización y seguridad vial",
    descripcion: "Letreros y señales, conos, cintas de demarcación, barreras y delineadores.",
  },
  {
    // TODO(contenido): productos con foto y ficha cuando Fesapy los entregue.
    slug: "aseo",
    nombre: "Aseo y recolección de residuos",
    descripcion:
      "Puntos ecológicos, canecas y baldes, carros de aseo, hidrolavadoras y aspiradoras.",
  },
  {
    slug: "stickers-personalizacion",
    nombre: "Stickers y personalización",
    descripcion: "Stickers con tu logo, avisos reflectivos para vehículos y logos bordados o estampados.",
  },
  {
    slug: "lubricantes-mantenimiento",
    nombre: "Lubricantes y mantenimiento",
    descripcion: "Lubricantes y productos de mantenimiento como WD-40 y CRC.",
  },
] as const;

export type CategoriaSlug = (typeof categorias)[number]["slug"];

// Foto de portada para categorías que todavía no tienen productos en el catálogo (sin productos no
// hay foto de producto que usar). Son fotos de REFERENCIA de Pexels (ver docs/CREDITOS-IMAGENES.md):
// la tarjeta lleva la etiqueta "Imagen de referencia".
export const fotosCategoria: Partial<Record<CategoriaSlug, { src: string; alt: string }>> = {
  emergencias: {
    src: "/referencia/emergencias-extintor.webp",
    alt: "Extintor rojo apoyado contra una pared gris",
  },
  aseo: {
    src: "/referencia/aseo-punto-ecologico.webp",
    alt: "Cuatro canecas de reciclaje de colores contra una pared de ladrillo",
  },
};

// Slugs viejos que ya no existen, con la categoría que los reemplaza.
// Así un enlace guardado como /cotizacion?categoria=trabajo-en-alturas sigue eligiendo la categoría.
const slugsAnteriores: Record<string, CategoriaSlug> = {
  "trabajo-en-alturas": "proteccion-personal",
};

/** Devuelve el slug si es una categoría conocida (o uno viejo que la reemplaza); si no, undefined. */
export function categoriaValida(valor: unknown): CategoriaSlug | undefined {
  if (typeof valor === "string" && valor in slugsAnteriores) return slugsAnteriores[valor];
  return categorias.find((c) => c.slug === valor)?.slug;
}
