import type { CategoriaSlug } from "./contenido";

// Catálogo estático de productos, TRANSCRITO del "Portafolio" de Fesapy (PDF, 40 páginas).
// No hay base de datos: para agregar o cambiar un producto se edita este archivo.
//
// REGLAS:
// - descripcion, caracteristicas, diferenciadores, modelos y normas se copian del portafolio.
//   No inventes nada (ni precios, ni tallas, ni colores, ni existencias, ni certificaciones).
// - "resumen" (frase de la tarjeta) y los textos "alt" de las fotos sí son redacción propia.
// - Lo que no esté en el portafolio queda como TODO(contenido) (o se omite).
// - Las fotos están en public/catalogo/<slug>.webp (la primera es la principal).
//   Vienen del portafolio de Fesapy; ver docs/CREDITOS-IMAGENES.md.

export type ImagenProducto = {
  /** Nombre del archivo dentro de public/catalogo/ */
  archivo: string;
  alt: string;
};

/** Cuando un producto del portafolio reúne varias referencias (por ejemplo 9009 / 9309 / 8609). */
export type ModeloProducto = {
  nombre: string;
  descripcion: string;
  caracteristicas?: string[];
};

export type Producto = {
  slug: string;
  categoria: CategoriaSlug;
  nombre: string;
  /** 1–2 frases cortas para la tarjeta (redacción propia, basada en el portafolio). */
  resumen: string;
  /** Párrafos de descripción, tal cual el portafolio. */
  descripcion: string[];
  caracteristicas: string[];
  diferenciadores: string[];
  modelos: ModeloProducto[];
  /** "Ideal para…" y su lista (señalización vial). */
  usos?: { intro: string; items: string[] };
  /** Normas tal como las imprime el portafolio. Si no aparecen allí, se omite. */
  normas?: string;
  imagenes: ImagenProducto[];
};

export const productos: Producto[] = [
  // ───────────── Dotación y ropa de trabajo ─────────────
  {
    slug: "camisas-oxford",
    categoria: "dotacion-ropa-de-trabajo",
    nombre: "Camisas Oxford",
    resumen:
      "Camisa de dotación en tejido Oxford, mezcla de 80% algodón y 20% poliéster, para oficina, ventas, campo y atención al cliente.",
    descripcion: [
      "Camisas Oxford de dotación, diseñadas para ofrecer una combinación perfecta entre elegancia, resistencia y confort.",
    ],
    caracteristicas: [
      "Mezcla de 80% algodón y 20% poliéster que brinda frescura, suavidad y transpirabilidad.",
      "Tejido Oxford de calidad premium que conserva su forma y apariencia lavado tras lavado.",
      "Perfecta para oficina, ventas, campo, retail y atención al cliente.",
      "Diseño estructurado que mantiene un look profesional en todo momento.",
      "Variedad de tallas y colores que se adaptan a la identidad de su empresa.",
    ],
    diferenciadores: [
      "Material nacional de alto estándar: Oxford de última generación con acabado uniforme.",
      "Confección reforzada: Costuras de alta resistencia para mayor vida útil.",
      "Detalles premium: Botones tipo nácar y acabados fusionados en cuello, puños y pechera.",
      "Ergonomía laboral: Corte diseñado para facilitar el movimiento sin perder la estructura.",
    ],
    modelos: [],
    normas: "13688:2013/A1:2021 · D3775-03 · NTC 427, 481, 786, 1155, 1213",
    imagenes: [{ archivo: "camisas-oxford.webp", alt: "Camisa Oxford blanca de manga larga, con cuello y pechera con botones" }],
  },
  {
    slug: "camisa-tipo-polo",
    categoria: "dotacion-ropa-de-trabajo",
    nombre: "Camisa tipo Polo",
    resumen:
      "Polo de dotación empresarial en mezcla poliéster/algodón, tela liviana (210–220 g) y pechera de 3 botones.",
    descripcion: [
      "Prenda de dotación empresarial, ideal para compañías que buscan proyectar una imagen profesional, uniforme y cómoda en cualquier entorno laboral.",
    ],
    caracteristicas: [
      "Prenda versátil que se adapta a diferentes áreas y niveles operativos.",
      "Resistente a lavados frecuentes sin perder intensidad.",
      "Gracias a su composición con poliéster.",
      "Tela liviana (210–220 g) ideal para uso diario.",
      "Funciona en ambientes operativos, comerciales y administrativos.",
    ],
    diferenciadores: [
      "Tejido de alto rendimiento: Mezcla poliéster/algodón que equilibra frescura y resistencia.",
      "Gramaje ideal (210–220 g): Liviano, transpirable y duradero.",
      "Pechera de 3 botones: Ajuste práctico y presentación formal-casual.",
      "Cuello y puños: Mayor estabilidad y estética uniforme.",
      "Confección nacional: Control de calidad y consistencia en producción.",
    ],
    modelos: [],
    normas: "4045:2019, 4048 · D4704 · NTC 1042:1998, 1077:1998",
    imagenes: [{ archivo: "camisa-tipo-polo.webp", alt: "Camisa tipo polo azul con cuello y pechera de botones" }],
  },
  {
    slug: "camisa-en-jean",
    categoria: "dotacion-ropa-de-trabajo",
    nombre: "Camisa en Jean",
    resumen:
      "Camisa en jean de 7 onzas con prelavado y bolsillos para herramientas, para múltiples sectores productivos.",
    descripcion: [],
    caracteristicas: [
      "Tela en jean de 7 onzas que soporta fricción, uso continuo y condiciones exigentes.",
      "Proceso de prelavado que elimina rigidez y reduce el encogimiento.",
      "Mantiene su estructura y apariencia tras múltiples ciclos de lavado.",
      "Bolsillos estratégicos para herramientas y elementos de trabajo.",
      "Ideal para múltiples sectores productivos.",
    ],
    diferenciadores: [
      "Denim prelavado de alto desempeño: Mayor suavidad al tacto sin comprometer resistencia.",
      "Gramaje óptimo (7 oz): Balance perfecto entre protección y frescura.",
      "Confección reforzada: Costuras de alta resistencia para uso intensivo.",
      "Sistema de cierre seguro: Botones robustos que garantizan firmeza y durabilidad.",
      "Diseño ergonómico: Permite libertad de movimiento en actividades operativas.",
    ],
    modelos: [],
    normas: "13688:2013/A1:2021 · D1424, D2261, D1776, D737 · NTC 2260",
    imagenes: [{ archivo: "camisa-en-jean.webp", alt: "Camisa en jean azul de manga larga con bolsillos frontales" }],
  },
  {
    slug: "chaqueta-en-jean",
    categoria: "dotacion-ropa-de-trabajo",
    nombre: "Chaqueta en Jean",
    resumen:
      "Chaqueta en jean pesado de 14 oz con prelavado y costuras reforzadas, para uso intensivo.",
    descripcion: ["Jean pesado de 14 oz que soporta condiciones extremas y uso intensivo."],
    caracteristicas: [
      "Ideal para labores como soldadura y trabajos en contacto con calor moderado.",
      "Proceso prelavado que elimina rigidez y mejora la adaptabilidad al cuerpo.",
      "Diseñada para resistir lavados frecuentes sin perder forma ni funcionalidad.",
      "Prenda funcional con estética industrial clásica.",
    ],
    diferenciadores: [
      "Denim de alto gramaje (14 oz): Mayor densidad, resistencia al desgaste y protección.",
      "Proceso de prelavado: Reduce encogimiento, mejora la suavidad y permite uso inmediato.",
      "Costuras reforzadas: Mayor soporte en puntos críticos de tensión.",
      "Botonería metálica industrial: Alta durabilidad y cierre seguro.",
      "Bolsillos funcionales: Frontales y laterales para herramientas y elementos de trabajo.",
      "Diseño ergonómico: Facilita movilidad sin comprometer protección.",
    ],
    modelos: [],
    normas: "13688:2013/A1:2021 · D1424, D2261, D1776, D737 · NTC 2260",
    imagenes: [{ archivo: "chaqueta-en-jean.webp", alt: "Chaqueta en jean azul oscuro con botones metálicos y bolsillos en el pecho" }],
  },
  {
    slug: "pantalon-en-jean",
    categoria: "dotacion-ropa-de-trabajo",
    nombre: "Pantalón en Jean",
    resumen:
      "Pantalón en jean índigo elástico (licrado), de tiro medio y bota recta, con múltiples bolsillos.",
    descripcion: [],
    caracteristicas: [
      "Tela índigo elástica (licrada) que facilita movimientos constantes y prolongados.",
      "Ideal para uso intensivo en ambientes industriales y operativos.",
      "Diseño de tiro medio y bota recta que se adapta al cuerpo sin restringir.",
      "Múltiples bolsillos para herramientas y elementos de trabajo.",
      "Apto para diferentes sectores y condiciones laborales.",
    ],
    diferenciadores: [
      "Índigo licrado de alto rendimiento: Mayor elasticidad sin perder estructura ni resistencia.",
      "Confección reforzada: Puntadas de seguridad que prolongan la vida útil de la prenda.",
      "Diseño funcional: Dos bolsillos frontales; bolsillo relojero; dos bolsillos posteriores tipo parche.",
      "Cierre metálico industrial: Mayor durabilidad y seguridad en el uso diario.",
      "Corte recto: Equilibrio entre comodidad, estética y adaptabilidad laboral.",
    ],
    modelos: [],
    normas: "13688:2013/A1:2021 · D1424, D2261, D1776, D737 · NTC 2260",
    imagenes: [{ archivo: "pantalon-en-jean.webp", alt: "Pantalón en jean azul de bota recta" }],
  },
  {
    slug: "overol-en-dril",
    categoria: "dotacion-ropa-de-trabajo",
    nombre: "Overol en Dril",
    resumen:
      "Overol en dril industrial 100% algodón, con triple costura en zonas críticas, cremallera frontal y 6 bolsillos.",
    descripcion: [],
    caracteristicas: [
      "Tela en dril industrial que soporta uso intensivo y condiciones exigentes.",
      "Composición en algodón que permite frescura durante largas jornadas.",
      "Diseño ergonómico que facilita el movimiento continuo.",
      "Ideal para múltiples sectores industriales.",
      "Resguarda al trabajador frente a suciedad, salpicaduras y agentes externos.",
    ],
    diferenciadores: [
      "Dril industrial nacional (100% algodón): Alta durabilidad y confort en condiciones reales de trabajo.",
      "Confección reforzada: Triple costura y doble pespunte en zonas críticas (hombros, mangas, bolsillos y tiros).",
      "Sistema de cierre frontal: Cremallera resistente (reversible) para fácil postura y retiro.",
      "Diseño funcional de 6 bolsillos: 2 superiores; 2 frontales; 2 posteriores.",
      "Cuello sport y manga larga: Mayor cobertura y protección.",
    ],
    modelos: [],
    normas: "13688:2013/A1:2021",
    imagenes: [{ archivo: "overol-en-dril.webp", alt: "Overol de dril azul oscuro, de manga larga y cierre frontal" }],
  },
  {
    slug: "overol-con-reflectivos",
    categoria: "dotacion-ropa-de-trabajo",
    nombre: "Overol con Reflectivos",
    resumen:
      "Overol 100% algodón con cintas reflectivas bicolor para mejorar la visibilidad del trabajador en campo.",
    descripcion: [
      "Este overol está diseñado para reducir riesgos laborales asociados a baja visibilidad, mejorando la identificación del trabajador y fortaleciendo los protocolos de seguridad en campo.",
    ],
    caracteristicas: [
      "Cintas reflectivas bicolor que mejoran la detección del trabajador en entornos de riesgo.",
      "Cobertura completa con materiales resistentes y térmicos.",
      "Diseño amplio que facilita el movimiento durante largas jornadas.",
      "Refuerzos estratégicos que prolongan la vida útil de la prenda.",
      "Múltiples bolsillos para herramientas y elementos de trabajo.",
    ],
    diferenciadores: [
      "Tela industrial de alto gramaje (290 g/m²): 100% algodón, resistente y transpirable.",
      "Cinta reflectiva bicolor (amarillo/plata de 5 cm): Ubicada en mangas, pecho, espalda y piernas para máxima visibilidad.",
      "Confección reforzada de alto desempeño: Doble costura en bolsillos con presillas en extremos; costura de cadeneta en mangas y costados; 18 presillas de refuerzo en puntos críticos; tiro reforzado en pantalón.",
      "Diseño ergonómico: Corte amplio en piernas, bajos y cuerpo para mayor movilidad.",
      "Ajuste funcional: Elástico en cintura para mejor adaptación.",
    ],
    modelos: [],
    imagenes: [
      {
        archivo: "overol-con-reflectivos.webp",
        alt: "Overol azul oscuro con cintas reflectivas amarillas y plateadas en mangas, pecho y piernas",
      },
    ],
  },
  {
    slug: "overol-ignifugo",
    categoria: "dotacion-ropa-de-trabajo",
    nombre: "Overol Ignífugo",
    resumen:
      "Overol ignífugo con resistencia permanente a la llama (FR), apto para niveles HRC 1 y HRC 2.",
    descripcion: [
      "Los overoles ignífugos son una solución avanzada dentro de los elementos de protección personal (EPP), diseñados para proteger al trabajador frente a riesgos térmicos, fuego repentino y arco eléctrico. Su confección especializada y cumplimiento de normativas internacionales los convierten en una prenda indispensable para operaciones de alto riesgo.",
    ],
    caracteristicas: [],
    diferenciadores: [
      "Resistencia permanente a la llama (FR): No se pierde con los lavados ni el uso continuo.",
      "Clasificación de riesgo: Apta para niveles HRC 1 y HRC 2 (riesgo bajo a medio).",
      "Sistema de cierre industrial: Cremallera resistente con doble slider para mayor funcionalidad.",
      "Cinta reflectiva ignífuga: Mantiene propiedades de seguridad incluso en condiciones térmicas.",
      "Diseño funcional de 7 bolsillos: Mayor capacidad para herramientas y elementos operativos.",
      "Material técnico de alto desempeño: Balance entre protección, ligereza y durabilidad.",
    ],
    modelos: [],
    normas: "13688:2013/A1:2021",
    imagenes: [{ archivo: "overol-ignifugo.webp", alt: "Overol ignífugo rojo con cintas reflectivas blancas en mangas y piernas" }],
  },

  // ───────────── Calzado de seguridad ─────────────
  {
    slug: "bota-safety-tridensidad",
    categoria: "calzado-de-seguridad",
    nombre: "Bota Safety Tridensidad",
    resumen:
      "Bota de seguridad en micropiel, con puntera de policarbonato y suela de poliuretano tridensidad.",
    descripcion: [
      "La bota de seguridad safety tridensidad está diseñada para ofrecer máxima protección y comodidad en jornadas laborales intensas. Su construcción en micropiel, puntera de policarbonato y suela en poliuretano tridensidad garantiza un equilibrio ideal entre resistencia, estabilidad y ligereza.",
      "Esta bota combina protección certificada, ligereza y ergonomía, permitiendo al trabajador desempeñarse con mayor seguridad y menor fatiga durante toda la jornada.",
    ],
    caracteristicas: [
      "Protección integral: Puntera de seguridad que resguarda contra impactos.",
      "Aislamiento eléctrico: Propiedad dieléctrica para trabajos con riesgo eléctrico.",
      "Alta durabilidad: Materiales resistentes a hidrocarburos y condiciones industriales.",
      "Confort prolongado: Diseño liviano con plantilla microporosa.",
      "Versatilidad operativa: Ideal para múltiples sectores industriales y logísticos.",
    ],
    diferenciadores: [],
    modelos: [],
    imagenes: [
      { archivo: "bota-safety-tridensidad.webp", alt: "Bota de seguridad Safety Tridensidad de color café, vista lateral" },
      { archivo: "bota-safety-tridensidad-2.webp", alt: "Bota de seguridad Safety Tridensidad de color negro, vista lateral" },
    ],
  },
  {
    slug: "bota-dakar-tridensidad",
    categoria: "calzado-de-seguridad",
    nombre: "Bota Dakar Tridensidad",
    resumen:
      "Bota Dakar en cuero y textil, con puntera de policarbonato y suela tridensidad, para trabajo con movilidad constante.",
    descripcion: [
      "Las Botas Dakar de seguridad están diseñadas para brindar protección efectiva, comodidad y movilidad, siendo ideales para entornos laborales donde el trabajador requiere desplazamiento constante. Su construcción en cuero y textil, junto con su suela tridensidad, ofrece un equilibrio óptimo entre resistencia, ventilación y ergonomía. Recomendadas para operaciones con movilidad constante y exigencia moderada-alta.",
    ],
    caracteristicas: [
      "Protección contra impacto: Puntera en policarbonato liviana y segura.",
      "Mayor confort térmico: Combinación de cuero y textil que mejora la transpirabilidad.",
      "Ligereza operativa: Reduce la fatiga en jornadas prolongadas.",
      "Resistencia industrial: Apta para contacto con hidrocarburos y derivados.",
      "Versatilidad: Ideal para múltiples sectores productivos.",
    ],
    diferenciadores: [],
    modelos: [],
    imagenes: [
      { archivo: "bota-dakar-tridensidad.webp", alt: "Bota Dakar de seguridad en tono gris oscuro, vista lateral" },
      { archivo: "bota-dakar-tridensidad-2.webp", alt: "Bota Dakar de seguridad en tono beige, vista lateral" },
      { archivo: "bota-dakar-tridensidad-3.webp", alt: "Bota Dakar de seguridad de color café, vista lateral" },
    ],
  },
  {
    slug: "bota-4059-4059-w",
    categoria: "calzado-de-seguridad",
    nombre: "Bota 4059 / 4059 W",
    resumen:
      "Bota SAGA en cuero nobuck con puntera composite y suela con adherencia y absorción de impacto.",
    descripcion: [
      "La bota de seguridad SAGA está diseñada para ofrecer máxima protección, durabilidad y ergonomía, incorporando materiales de alto nivel como cuero nobuck y puntera composite, junto con sistemas de suela que garantizan adherencia, absorción de impacto y resistencia al calor.",
      "Diseñada para trabajadores que requieren un calzado que responda en ambientes donde la temperatura, el desgaste y la exigencia son constantes.",
    ],
    caracteristicas: [
      "Protección avanzada: Puntera composite liviana, sin conductividad térmica ni eléctrica.",
      "Alta durabilidad: Cuero nobuck de alto calibre resistente al desgaste.",
      "Confort prolongado: Diseño ergonómico ideal para jornadas extensas.",
      "Desempeño en condiciones exigentes: Suela con alta adherencia y absorción de impacto.",
      "Versatilidad industrial: Apta para múltiples sectores de alto riesgo.",
    ],
    diferenciadores: [],
    modelos: [],
    imagenes: [
      { archivo: "bota-4059-4059-w.webp", alt: "Bota de seguridad 4059 café con detalles reflectivos y naranja" },
      { archivo: "bota-4059-4059-w-2.webp", alt: "Bota de seguridad 4059 W café con detalles rosados" },
    ],
  },
  {
    slug: "bota-9009-9309-8609",
    categoria: "calzado-de-seguridad",
    nombre: "Bota 9009 / 9309 / 8609 (Westland)",
    resumen:
      "Tres referencias de bota Westland (9009, 9309 y 8609) para ambientes industriales exigentes.",
    descripcion: [],
    caracteristicas: [],
    diferenciadores: [],
    modelos: [
      {
        nombre: "Ref. 9009",
        descripcion:
          "La Bota Westland Ref. 9009 está diseñada para ofrecer un equilibrio ideal entre seguridad, resistencia y comodidad, integrando materiales de alto desempeño y tecnologías que garantizan protección en operaciones de alto riesgo. Su construcción robusta y ergonómica la convierte en una solución confiable para sectores industriales que requieren calzado resistente al desgaste, impacto, hidrocarburos y condiciones operativas intensivas.",
      },
      {
        nombre: "Ref. 9309",
        descripcion:
          "La Bota Westland Ref. 9309 ha sido desarrollada para brindar un alto nivel de protección, confort y desempeño en ambientes industriales exigentes. Su fabricación incorpora materiales técnicos de última generación que ofrecen mayor durabilidad, estabilidad y seguridad durante largas jornadas de trabajo. Diseñada para sectores donde la resistencia mecánica, dieléctrica y el confort operativo son fundamentales.",
      },
      {
        nombre: "Ref. 8609",
        descripcion:
          "La Bota Westland Ref. 8609 ha sido desarrollada para brindar un alto nivel de seguridad, ergonomía y resistencia en ambientes industriales de alta exigencia. Su diseño incorpora tecnologías de amortiguación y materiales técnicos de alto desempeño que optimizan la comodidad, estabilidad y protección del trabajador. Gracias a su sistema de diseño ergonómico, ayuda a disminuir la fatiga, mejorar la estabilidad y aumentar el bienestar del trabajador durante operaciones prolongadas.",
      },
    ],
    normas: "20345:2012 · F2413:18 · NTC 456 - 467 - 4811 - 632",
    imagenes: [
      // TODO(contenido): confirmar cuál foto corresponde a cada referencia (9009, 9309 y 8609).
      { archivo: "bota-9009-9309-8609.webp", alt: "Bota de seguridad Westland café con suela gris, vista lateral" },
      { archivo: "bota-9009-9309-8609-2.webp", alt: "Bota de seguridad Westland café y gris con cordones, vista lateral" },
      { archivo: "bota-9009-9309-8609-3.webp", alt: "Bota de seguridad Westland de caña alta, de color oscuro" },
    ],
  },
  {
    slug: "bota-alta-soldador-indiana-extrema",
    categoria: "calzado-de-seguridad",
    nombre: "Bota alta para soldador Indiana / Extrema",
    resumen:
      "Bota de caña alta para soldadura y metalmecánica, con protección contra chispas, calor e impacto.",
    descripcion: [
      "La bota alta para soldador está diseñada para brindar máxima protección en entornos de alta temperatura, incorporando materiales resistentes al calor, chispas y condiciones industriales exigentes. Su estructura de caña alta ofrece mayor cobertura y seguridad, ideal para labores de soldadura y metalmecánica. Especialmente recomendada para entornos de alto riesgo térmico y mecánico.",
      "Diseñada para proteger en entornos donde el calor, las chispas y el desgaste son constantes.",
    ],
    caracteristicas: [
      "Protección contra impacto: Puntera de seguridad que resguarda frente a compresión y golpes.",
      "Alta resistencia térmica: Suela diseñada para soportar contacto con superficies calientes.",
      "Protección contra chispas: Ideal para trabajos de soldadura.",
      "Mayor cobertura: Diseño de caña alta que protege parte de la pierna.",
      "Durabilidad industrial: Materiales resistentes a hidrocarburos y uso intensivo.",
    ],
    diferenciadores: [],
    modelos: [],
    imagenes: [
      // TODO(contenido): confirmar cuál foto es la Indiana y cuál la Extrema.
      { archivo: "bota-alta-soldador-indiana-extrema.webp", alt: "Bota alta de soldador de color café oscuro, vista lateral" },
      { archivo: "bota-alta-soldador-indiana-extrema-2.webp", alt: "Bota alta de soldador de color café, vista de tres cuartos" },
    ],
  },
  {
    slug: "bota-3046-cana-alta",
    categoria: "calzado-de-seguridad",
    nombre: "Bota 3046 (caña alta)",
    resumen:
      "Bota SAGA de caña alta en cuero napa, con puntera composite y suela técnica bidensidad o bicomponente.",
    descripcion: [
      "La bota SAGA caña alta Ref. 3046 está diseñada para brindar máxima seguridad, ergonomía y durabilidad, incorporando materiales de alto desempeño como cuero napa de alto calibre, puntera composite y suela técnica bidensidad o bicomponente. Su diseño eleva la protección sin sacrificar comodidad durante largas jornadas.",
      "Esta bota está diseñada para trabajadores que requieren protección real, estabilidad y comodidad durante toda la jornada, sin comprometer desempeño.",
    ],
    caracteristicas: [
      "Protección avanzada: Puntera composite liviana, resistente a impacto y compresión.",
      "Mayor cobertura: Diseño de caña alta para protección extendida.",
      "Confort superior: Plantilla LITE con rebote en el talón que reduce la fatiga.",
      "Desempeño en condiciones exigentes: Alta adherencia y resistencia térmica.",
      "Imagen profesional: Acabado en cuero napa que combina resistencia y estética.",
    ],
    diferenciadores: [],
    modelos: [],
    imagenes: [
      { archivo: "bota-3046-cana-alta.webp", alt: "Bota de caña alta en cuero café con puntera negra, vista de tres cuartos" },
      { archivo: "bota-3046-cana-alta-2.webp", alt: "Bota de caña alta en cuero oscuro, vista lateral" },
    ],
  },

  // ───────────── Elementos de protección personal ─────────────
  {
    slug: "cascos-v-gard",
    categoria: "proteccion-personal",
    nombre: "Cascos V-Gard",
    resumen:
      "Casco de seguridad V-Gard® en polietileno de alta densidad (HDPE), diseño tipo I, con suspensión interna ajustable.",
    descripcion: [
      "Los cascos de seguridad V-Gard® están diseñados para ofrecer máxima protección contra impactos, penetración y riesgos eléctricos, convirtiéndose en un referente global dentro de los elementos de protección personal (EPP). Su estructura robusta y sistema de suspensión avanzado garantizan seguridad, estabilidad y comodidad durante toda la jornada laboral.",
    ],
    caracteristicas: [],
    diferenciadores: [
      "Estructura en polietileno de alta densidad (HDPE): Alta resistencia a impactos y condiciones exigentes.",
      "Sistema de suspensión interno: Absorbe y distribuye la energía del impacto.",
      "Ajuste personalizado: Arnés con regulación en altura para mejor adaptación al usuario.",
      "Diseño tipo I: Protección contra impactos verticales (superiores).",
      "Protección dieléctrica: Apto para entornos con riesgo eléctrico (según configuración).",
      "Diseño V-Gard®: Reconocido por su desempeño y confiabilidad a nivel mundial.",
    ],
    modelos: [],
    imagenes: [
      { archivo: "cascos-v-gard.webp", alt: "Casco de seguridad V-Gard amarillo, vista lateral" },
      { archivo: "cascos-v-gard-2.webp", alt: "Casco de seguridad V-Gard rojo con suspensión interna, vista lateral" },
    ],
  },
  {
    slug: "cascos-dielectricos-tipo-1",
    categoria: "proteccion-personal",
    nombre: "Cascos dieléctricos Tipo 1",
    resumen:
      "Casco dieléctrico Tipo I IN 1406-R, en polietileno de alta densidad, con suspensión de 6 apoyos IN 406-R.",
    descripcion: [
      "Los cascos de seguridad dieléctrico Tipo I IN 1406-R está diseñado para brindar protección integral de la cabeza, combinando resistencia a impactos verticales con aislamiento eléctrico certificado. Fabricado en polietileno de alta densidad, es una solución confiable para operaciones en ambientes exigentes donde la seguridad es crítica.",
      "La suspensión de 6 apoyos IN 406-R es un elemento que realmente disipa la energía del impacto, además de definir el nivel de comodidad del usuario. Un buen sistema de suspensión reduce la fatiga y mejora el cumplimiento en el uso del EPP. Mejora la ergonomía, estabilidad y distribución del impacto en cascos tipo I clase E y G. Su estructura garantiza mayor seguridad y confort en jornadas prolongadas.",
    ],
    caracteristicas: [
      "Protección contra impacto vertical: Absorbe y reduce la fuerza de golpes en la parte superior.",
      "Aislamiento eléctrico: Apto para trabajos con riesgo eléctrico (Clase E y G).",
      "Alta resistencia ambiental: Protección frente a químicos, agua, viento y radiación solar.",
      "Confort superior: Sistema ergonómico con ajuste rápido y componentes acolchados.",
      "Versatilidad industrial: Compatible con accesorios de seguridad adicionales.",
      "Este casco no solo protege contra impactos, sino que actúa como una barrera frente a múltiples riesgos: choques eléctricos; golpes contra objetos fijos; exposición a líquidos y clima; chispas y radiación térmica.",
    ],
    diferenciadores: [],
    modelos: [],
    normas: "ANSI Z.89.1-2014 TIPO I Clase E y G",
    imagenes: [
      { archivo: "cascos-dielectricos-tipo-1.webp", alt: "Casco de seguridad blanco, vista lateral" },
      { archivo: "cascos-dielectricos-tipo-1-2.webp", alt: "Casco de seguridad amarillo, vista lateral" },
      { archivo: "cascos-dielectricos-tipo-1-3.webp", alt: "Casco de seguridad rojo, vista lateral" },
      { archivo: "cascos-dielectricos-tipo-1-4.webp", alt: "Suspensión interna de 6 apoyos del casco, vista desde arriba" },
    ],
  },
  {
    slug: "protector-auditivo-in-9092",
    categoria: "proteccion-personal",
    nombre: "Protector Auditivo IN-9092",
    resumen:
      "Protector auditivo tipo tapón en silicona termoplástica hipoalergénica, con nivel NRR de 27 dB, cordón y estuche.",
    descripcion: [
      "El protector auditivo tipo tapón IN 9092 está diseñado para brindar atenuación efectiva del ruido en entornos industriales, combinando ergonomía, durabilidad y facilidad de uso. Fabricado en silicona termoplástica hipoalergénica, ofrece un ajuste seguro y cómodo durante jornadas prolongadas.",
      "Gracias a su diseño ergonómico de múltiples membranas, el tapón proporciona un sellado efectivo sin generar presión excesiva, mejorando la experiencia del usuario y el cumplimiento en el uso del EPP.",
    ],
    caracteristicas: [
      "Alta atenuación del ruido: Nivel NRR de 27 dB para entornos de exposición moderada a alta.",
      "Confort prolongado: Material suave, flexible y libre de irritaciones.",
      "Reutilizable y económico: Diseñado para múltiples usos con fácil mantenimiento.",
      "Higiene y portabilidad: Incluye cordón y estuche para almacenamiento seguro.",
      "Alta visibilidad: Reduce el riesgo de pérdida y facilita su control en campo.",
    ],
    diferenciadores: [],
    modelos: [],
    normas: "NF EN 352-2 11-2020, ANSI/ASA S3.19-1974, ANSI/ASA S12.6-2016 · NTC 2272",
    imagenes: [{ archivo: "protector-auditivo-in-9092.webp", alt: "Tapones auditivos naranja con cordón y estuche naranja" }],
  },
  {
    slug: "mascaras-y-respiradores",
    categoria: "proteccion-personal",
    nombre: "Máscaras y respiradores",
    resumen:
      "Máscaras 3M 6200S y 6800S, MSA Advantage® 200LS y respiradores N95 INSAFE® IN1020 / IN1020V.",
    descripcion: [],
    caracteristicas: [],
    diferenciadores: [],
    modelos: [
      {
        nombre: "Máscara 3M™ 6200S (media cara)",
        descripcion:
          "La Máscara Respiratoria 3M™ 6200S de Media Cara está diseñada para brindar una protección eficiente y cómoda frente a una amplia variedad de contaminantes presentes en entornos industriales. Su sistema de doble cartucho permite utilizar diferentes filtros y cartuchos reemplazables para proteger al trabajador contra gases, vapores, polvo, neblinas y humos, adaptándose a múltiples aplicaciones y niveles de exposición.",
      },
      {
        nombre: "Máscara 3M™ 6800S (rostro completo)",
        descripcion:
          "La Máscara Respiratoria 3M™ 6800S Full Face está diseñada para ofrecer una protección completa del rostro frente a partículas, gases, vapores y otros contaminantes presentes en entornos industriales exigentes. Su diseño de rostro completo combina protección respiratoria avanzada con un amplio visor panorámico, brindando seguridad, comodidad y excelente visibilidad durante toda la jornada laboral.",
      },
      {
        nombre: "Máscara MSA Advantage® 200LS",
        descripcion:
          "La Máscara Respiratoria MSA Advantage® 200LS ha sido desarrollada para ofrecer una protección respiratoria eficiente, cómoda y adaptable a las exigencias de los entornos industriales modernos. Gracias a su innovador diseño ergonómico y a la tecnología patentada Multiflex®, proporciona un ajuste superior, mayor comodidad y un sellado facial confiable que mejora la seguridad del trabajador durante toda la jornada laboral.",
      },
      {
        nombre: "Respiradores N95 INSAFE® IN1020 / IN1020V",
        descripcion:
          "Los Respiradores Contra Partículas N95 INSAFE® IN1020 / IN1020V han sido diseñados para brindar una protección respiratoria confiable frente a partículas sólidas y líquidas sin presencia de aceite, ofreciendo una eficiencia de filtración superior para trabajadores expuestos a polvo, partículas suspendidas y agentes biológicos en diferentes entornos laborales. Su estructura de 5 capas de protección, diseño ergonómico y materiales de alta calidad proporcionan un ajuste cómodo, excelente respirabilidad y mayor confort durante jornadas prolongadas de trabajo.",
      },
    ],
    normas: "EN 140, NIOSH 42CFR84, EN 149:2001 + A1:2009",
    imagenes: [
      { archivo: "mascaras-y-respiradores.webp", alt: "Máscara respiratoria de media cara 3M 6200S con dos cartuchos" },
      { archivo: "mascaras-y-respiradores-2.webp", alt: "Máscara respiratoria de rostro completo 3M 6800S con visor panorámico" },
      { archivo: "mascaras-y-respiradores-3.webp", alt: "Máscara respiratoria MSA Advantage 200LS de color azul" },
      { archivo: "mascaras-y-respiradores-4.webp", alt: "Dos respiradores N95, uno blanco y uno negro con válvula" },
    ],
  },
  {
    slug: "guantes",
    categoria: "proteccion-personal",
    nombre: "Guantes",
    resumen:
      "Guantes de nitrilo, lona tipo petrolero, carnaza para soldador (incluido Kodiak 16”) e ingeniero en vaqueta.",
    descripcion: [],
    caracteristicas: [],
    diferenciadores: [],
    modelos: [
      {
        nombre: "Guantes de nitrilo con puño abierto",
        descripcion:
          "Los Guantes de Nitrilo con Puño Abierto están diseñados para brindar una excelente protección en labores industriales que requieren resistencia mecánica, agarre seguro y desempeño en ambientes húmedos o agresivos. Su recubrimiento total en nitrilo ofrece una barrera eficiente frente a la abrasión, tensión y contacto con superficies de trabajo exigentes.",
      },
      {
        nombre: "Guantes en lona tipo petrolero Ref. 110K",
        descripcion:
          "Los Guantes en Lona Tipo Petrolero Ref. 110K están diseñados para brindar protección y confort en actividades de manipulación general, trabajos operativos y manejo de materiales. Su fabricación en lona con forro interno tipo dulce abrigo proporciona mayor suavidad, comodidad térmica y resistencia durante la jornada laboral.",
      },
      {
        nombre: "Guantes en carnaza reforzado tipo soldador Ref. 174 LG",
        descripcion:
          "Los Guantes en Carnaza Reforzado Tipo Soldador Ref. 174 LG REF está diseñado para brindar máxima protección en labores de soldadura y trabajos industriales de alta exigencia. Fabricado en cuero cromado tipo carnaza de alta calidad, ofrece excelente resistencia al desgaste, calor por contacto y fricción constante.",
      },
      {
        nombre: "Guantes en carnaza reforzado tipo soldador Kodiak 16”",
        descripcion:
          "Los Guantes en Carnaza Reforzado Tipo Soldador KODIAK 16” está diseñado para brindar una protección superior en operaciones de soldadura, fundición y trabajos industriales de alta temperatura. Fabricado 100% en carnaza de alta resistencia y cosido con hilo Kevlar®, ofrece mayor durabilidad frente al calor, fricción y desgaste continuo.",
      },
      {
        nombre: "Guantes ingeniero en vaqueta corto reforzado",
        descripcion:
          "Los Guantes Ingeniero en Vaqueta Corto reforzado está diseñado para brindar una excelente combinación de protección, confort y flexibilidad en labores industriales que requieren manipulación constante de materiales, herramientas y superficies abrasivas.",
      },
    ],
    normas: "EN 12477, EN 388:2016, EN 407",
    imagenes: [
      { archivo: "guantes.webp", alt: "Par de guantes de nitrilo azul con puño abierto" },
      // TODO(contenido): confirmar a qué referencia corresponde cada foto (el portafolio las muestra en este orden).
      { archivo: "guantes-2.webp", alt: "Par de guantes de cuero claro con puño tejido blanco" },
      { archivo: "guantes-3.webp", alt: "Par de guantes largos de carnaza en color gris claro" },
      { archivo: "guantes-4.webp", alt: "Par de guantes largos de carnaza color naranja para soldador" },
      { archivo: "guantes-5.webp", alt: "Par de guantes cortos de vaqueta amarilla" },
    ],
  },
  {
    slug: "trajes-impermeables-y-tyvek",
    categoria: "proteccion-personal",
    nombre: "Trajes: impermeables y overol Tyvek",
    resumen:
      "Impermeables en PVC (abrigo Ref. 500 y de dos piezas Ref. 101) y overol Tyvek 400 contra partículas.",
    descripcion: [
      "Fabricados en PVC de alta resistencia, es una solución confiable para operaciones industriales, logísticas y actividades exteriores donde las condiciones climáticas requieren protección permanente.",
    ],
    caracteristicas: [],
    diferenciadores: [],
    modelos: [
      {
        nombre: "Impermeable abrigo en PVC Ref. 500",
        descripcion:
          "El Impermeable Abrigo en PVC Ref. 500 está diseñado para brindar protección eficiente contra lluvia, humedad y salpicaduras, permitiendo al trabajador desempeñar sus labores con mayor seguridad y comodidad en ambientes exteriores e industriales.",
      },
      {
        nombre: "Impermeable de dos piezas Ref. 101",
        descripcion:
          "El Impermeable de Dos Piezas Ref. 101 compuesto por chaqueta y pantalón permite mayor cobertura, comodidad y libertad de movimiento durante largas jornadas de trabajo.",
      },
      {
        nombre: "Overol Tyvek 400",
        descripcion:
          "El Overol Tyvek 400 está diseñado para brindar una barrera confiable contra partículas y riesgos industriales ligeros, combinando protección, comodidad y libertad de movimiento. Su tecnología Tyvek® permite ofrecer un equilibrio ideal entre resistencia, transpirabilidad y confort operativo.",
        caracteristicas: [
          "Protección contra partículas y salpicaduras ligeras",
          "Diseño ergonómico para mayor movilidad",
          "Material liviano y confortable",
          "Excelente manejo de humedad y transpirabilidad",
          "Ajuste seguro en rostro, muñecas y tobillos",
          "Mayor resistencia al rasgado y desgaste",
        ],
      },
    ],
    normas: "D1777 - D3776 - D774 - D1683 - D5034",
    imagenes: [
      { archivo: "trajes-impermeables-y-tyvek.webp", alt: "Impermeable largo tipo abrigo de color negro, con capucha" },
      { archivo: "trajes-impermeables-y-tyvek-2.webp", alt: "Impermeable amarillo de dos piezas, chaqueta con capucha y pantalón" },
      { archivo: "trajes-impermeables-y-tyvek-3.webp", alt: "Overol blanco Tyvek con capucha" },
    ],
  },

  // ───────────── Trabajo en alturas e izaje ─────────────
  {
    slug: "arnes-in-8004",
    categoria: "trabajo-en-alturas",
    nombre: "Arnés Poliéster IN 8004",
    resumen:
      "Arnés de cuerpo completo en reata de poliéster con tratamiento ignífugo y estructura tipo “X”, para sistemas de detención de caídas.",
    descripcion: [
      "El arnés IN-8004 es un componente esencial dentro de los sistemas de detención de caídas, diseñado con una estructura ergonómica tipo “X” en reata de poliéster de alta tenacidad. Incorpora tratamiento ignífugo (retardante al fuego) y herrajes en acero de alta resistencia, garantizando seguridad, durabilidad y confiabilidad en entornos industriales exigentes. Protección certificada con resistencia térmica y alto desempeño estructural.",
    ],
    caracteristicas: [
      "Protección integral en alturas: Sistema completo para detención, posicionamiento y acceso controlado.",
      "Resistencia térmica: Reata con tratamiento ignífugo que mejora el desempeño en ambientes con exposición a calor.",
      "Alta durabilidad: Materiales diseñados para uso intensivo y condiciones exigentes.",
      "Ergonomía funcional: Ajuste preciso que mejora la comodidad y reduce la fatiga.",
      "Diseño en X de cuerpo completo: Distribución eficiente de cargas y mayor estabilidad del usuario.",
    ],
    diferenciadores: [],
    modelos: [],
    normas: "ANSI Z359.1, ANSI Z359.12, CSA Z259.12, ANSI/ASSP Z359.11-2021",
    imagenes: [
      { archivo: "arnes-in-8004.webp", alt: "Arnés de cuerpo completo naranja y negro, visto de frente sobre un maniquí" },
      { archivo: "arnes-in-8004-2.webp", alt: "Arnés de cuerpo completo naranja y negro, visto por la espalda" },
    ],
  },
  {
    slug: "arnes-in-8004-1",
    categoria: "trabajo-en-alturas",
    nombre: "Arnés Poliéster IN 8004-1",
    resumen:
      "Arnés para detención de caídas en reata de poliéster con tratamiento ignífugo y soporte lumbar ergonómico.",
    descripcion: [
      "El arnés IN-8004-1 es una solución ideal para operaciones que requieren seguridad certificada, confort continuo y desempeño en condiciones exigentes, está diseñado para sistemas de detención de caídas, en reata de poliéster de alta tenacidad con tratamiento ignífugo, junto con un soporte lumbar ergonómico que mejora la postura y reduce la fatiga en jornadas prolongadas.",
    ],
    caracteristicas: [
      "Protección integral en alturas: Sistema completo para detención, posicionamiento y acceso controlado.",
      "Ergonomía superior: Soporte lumbar que reduce la carga en la zona baja de la espalda.",
      "Resistencia térmica: Reata con tratamiento retardante al fuego para entornos con exposición a calor.",
      "Mayor confort operativo: Ideal para trabajos prolongados y en suspensión.",
      "Soporte lumbar ergonómico: Mejora la postura del usuario.",
    ],
    diferenciadores: [],
    modelos: [],
    normas: "ANSI Z359.1, ANSI Z359.12, CSA Z259.12, ANSI/ASSP Z359.11-2021",
    imagenes: [
      { archivo: "arnes-in-8004-1.webp", alt: "Arnés de cuerpo completo naranja y negro con soporte lumbar, visto de frente" },
      { archivo: "arnes-in-8004-1-2.webp", alt: "Arnés naranja y negro con soporte lumbar, visto por la espalda" },
    ],
  },
  {
    slug: "arnes-in-8004-p",
    categoria: "trabajo-en-alturas",
    nombre: "Arnés Poliuretano IN 8004-P",
    resumen:
      "Arnés de 4 argollas, cuerpo completo, con reata recubierta en poliuretano para ambientes con hidrocarburos, humedad y grasas.",
    descripcion: [
      "El Arnés de 4 Argollas en Poliuretano de cuerpo completo está diseñado para sistemas de protección contra caídas, ofreciendo un equilibrio óptimo entre seguridad, ergonomía y desempeño en ambientes industriales exigentes. Su estructura tipo “X” en reata de alta tenacidad con recubrimiento en poliuretano lo convierte en una solución ideal para condiciones con presencia de hidrocarburos, humedad, grasas y agentes contaminantes.",
    ],
    caracteristicas: [
      "Protección integral en alturas: Sistema completo para detención, posicionamiento y acceso controlado.",
      "Alta resistencia en condiciones agresivas: Recubrimiento en poliuretano que prolonga la vida útil.",
      "Versatilidad operativa: 4 puntos de conexión para múltiples aplicaciones.",
      "Comodidad ergonómica: Distribución eficiente de cargas que reduce la fatiga.",
      "Cumplimiento normativo: Alineado con estándares internacionales y legislación colombiana.",
    ],
    diferenciadores: [],
    modelos: [],
    normas: "ANSI Z359.1, ANSI Z359.12, CSA Z259.12, ANSI/ASSP Z359.11-2021",
    imagenes: [
      { archivo: "arnes-in-8004-p.webp", alt: "Arnés de cuerpo completo rojo y negro con 4 argollas, visto de frente" },
      { archivo: "arnes-in-8004-p-2.webp", alt: "Arnés de cuerpo completo rojo y negro, visto por la espalda" },
    ],
  },
  {
    slug: "arnes-in-8004-p1",
    categoria: "trabajo-en-alturas",
    nombre: "Arnés Poliuretano IN 8004-P1",
    resumen:
      "Arnés de 4 argollas en poliuretano con soporte lumbar, para ambientes agresivos y trabajos prolongados.",
    descripcion: [
      "El Arnés de 4 Argollas en Poliuretano con Soporte Lumbar con estructura en reata de alta densidad con recubrimiento en poliuretano lo hace ideal para ambientes agresivos, mientras que su soporte lumbar mejora significativamente la comodidad en trabajos prolongados. Está diseñado para sistemas de detención de caídas, integrando protección certificada, resistencia industrial y ergonomía avanzada.",
    ],
    caracteristicas: [
      "Ergonomía superior: Soporte lumbar que reduce la fatiga y mejora la postura del usuario.",
      "Mayor confort operativo: Ideal para jornadas extensas y trabajos continuos.",
      "Alta resistencia en ambientes exigentes: Recubrimiento en poliuretano contra agentes contaminantes.",
      "Cumplimiento normativo: Certificado bajo estándares internacionales y legislación colombiana.",
      "Protección integral en alturas: Sistema completo para detención, posicionamiento y acceso controlado.",
    ],
    diferenciadores: [],
    modelos: [],
    normas: "ANSI Z359.1, ANSI Z359.12, CSA Z259.12, ANSI/ASSP Z359.11-2021",
    imagenes: [
      { archivo: "arnes-in-8004-p1.webp", alt: "Arnés rojo y negro con soporte lumbar y 4 argollas, visto de frente" },
      { archivo: "arnes-in-8004-p1-2.webp", alt: "Arnés rojo y negro con soporte lumbar, visto por la espalda" },
    ],
  },
  {
    slug: "eslingas-con-absorbedor-in-8021-1se",
    categoria: "trabajo-en-alturas",
    nombre: "Eslingas con absorbedor IN 8021-1SE / IN 8020-SE / IN 8041-RSE",
    resumen:
      "Eslinga en Y y eslinga sencilla con absorbedor de energía, y eslinga de posicionamiento regulable, con herrajes en acero inoxidable.",
    descripcion: [],
    caracteristicas: [],
    diferenciadores: [],
    modelos: [
      {
        nombre: "Eslinga en Y con absorbedor y mosquetones en acero inoxidable (IN 8021-1SE)",
        descripcion:
          "La eslinga en Y IN 8021-1SE con absorbedor de energía es un componente esencial en los sistemas de protección contra caídas, diseñada para garantizar seguridad continua, movilidad y reducción del impacto en caso de accidente. Su configuración de doble terminal permite conexión permanente, minimizando riesgos durante desplazamientos en altura.",
      },
      {
        nombre: "Eslinga sencilla con absorbedor y ganchos en acero inoxidable (IN 8020-SE)",
        descripcion:
          "La eslinga IN 8020-SE sencilla con absorbedor de energía es un componente fundamental dentro de los sistemas de protección contra caídas, diseñada para ofrecer una conexión segura, resistencia estructural y reducción efectiva del impacto en caso de caída. Es ideal para trabajos donde no se requiere doble conexión, garantizando protección con un sistema práctico y eficiente.",
      },
      {
        nombre: "Eslinga de posicionamiento regulable con gancho en acero inoxidable (IN 8041-RSE)",
        descripcion:
          "La eslinga de posicionamiento IN 8041-RSE es esencial en sistemas de trabajo en alturas, diseñada para brindar estabilidad y control al usuario mientras ejecuta labores en puntos fijos. Su sistema regulable permite ajustar la longitud de forma rápida y segura, optimizando la postura y la eficiencia operativa.",
      },
    ],
    normas: "ANSI Z359.1, ANSI Z359.12, CSA Z259.12, ANSI/ASSE A10.32-2012, ANSI/ASSE Z359.3-2019",
    imagenes: [
      { archivo: "eslingas-con-absorbedor-in-8021-1se.webp", alt: "Eslinga en Y con absorbedor de energía y dos mosquetones de acero" },
      { archivo: "eslingas-con-absorbedor-in-8021-1se-2.webp", alt: "Eslinga sencilla con absorbedor de energía y ganchos de acero" },
      { archivo: "eslingas-con-absorbedor-in-8021-1se-3.webp", alt: "Eslinga de posicionamiento regulable con gancho de acero" },
    ],
  },
  {
    slug: "eslingas-con-absorbedor-in-8020",
    categoria: "trabajo-en-alturas",
    nombre: "Eslingas con absorbedor IN 8020 / IN 8020-R / IN 8020-1",
    resumen:
      "Eslinga sencilla con absorbedor, en versión fija (IN 8020), regulable (IN 8020-R) y regulable con gancho mixto de gran apertura (IN 8020-1).",
    descripcion: [],
    caracteristicas: [],
    diferenciadores: [],
    modelos: [
      {
        nombre: "Eslinga sencilla con absorbedor (IN 8020)",
        descripcion:
          "La eslinga sencilla IN 8020 está diseñada para actuar como un elemento crítico dentro del sistema de protección, absorbiendo la energía generada en una caída y reduciendo significativamente el impacto sobre el trabajador, proporcionando una conexión segura y reduciendo la fuerza del impacto en caso de accidente. Su configuración simple la convierte en una solución práctica y confiable para trabajos en altura con punto de anclaje fijo.",
      },
      {
        nombre: "Eslinga sencilla regulable con absorbedor (IN 8020-R)",
        descripcion:
          "La eslinga IN 8020-R a diferencia de una eslinga sencilla convencional, permite regular la longitud, optimizando la posición del trabajador y reduciendo riesgos asociados a holguras innecesarias. Su absorbedor integrado actúa como un sistema crítico que disipa la energía de la caída, protegiendo la integridad del usuario.",
      },
      {
        nombre: "Eslinga sencilla regulable con absorbedor y mosquetón mixto (IN 8020-1)",
        descripcion:
          "La eslinga IN 8020-1 gracias a su gancho de gran apertura (2 1/4\"), permite conexiones rápidas y seguras en estructuras donde un mosquetón estándar no es suficiente, mejorando la eficiencia operativa y reduciendo riesgos, diseñada para ofrecer seguridad certificada, absorción de impacto y mayor adaptabilidad en puntos de anclaje gracias a su configuración de gancho mixto.",
      },
    ],
    normas: "ANSI Z359.1, ANSI Z359.12, CSA Z259.12, ANSI/ASSE Z359.13-2013",
    imagenes: [
      { archivo: "eslingas-con-absorbedor-in-8020.webp", alt: "Eslinga sencilla con absorbedor de energía y ganchos de acero" },
      { archivo: "eslingas-con-absorbedor-in-8020-2.webp", alt: "Eslinga sencilla regulable con absorbedor y hebilla de ajuste" },
      { archivo: "eslingas-con-absorbedor-in-8020-3.webp", alt: "Eslinga con absorbedor y gancho de gran apertura" },
    ],
  },
  {
    slug: "eslingas-de-posicionamiento-in-8040",
    categoria: "trabajo-en-alturas",
    nombre: "Eslingas de posicionamiento IN 8040 / IN 8040-1 / IN 8040-R",
    resumen:
      "Eslingas de posicionamiento y restricción en cuerda semiestática de 14 mm, con gancho mixto de gran apertura o regulables.",
    descripcion: [],
    caracteristicas: [],
    diferenciadores: [],
    modelos: [
      {
        nombre: "Eslinga de posicionamiento en cuerda (IN 8040)",
        descripcion:
          "La eslinga IN 8040 está diseñada para sistemas de posicionamiento y restricción, fabricada en cuerda semiestática de 14 mm, lo que le proporciona mayor resistencia a la abrasión, flexibilidad y desempeño en condiciones exigentes frente a soluciones en reata.",
      },
      {
        nombre: "Eslinga de posicionamiento en cuerda con gancho mixto (IN 8040-1)",
        descripcion:
          "La eslinga IN 8040-1 es un elemento que incorpora un sistema de gancho mixto, facilitando la conexión a diferentes tipos de estructuras. Gracias a su gancho de gran apertura (2 1/4\"), esta eslinga permite conexiones rápidas y seguras en estructuras donde los ganchos tradicionales no son suficientes, mejorando la eficiencia operativa.",
      },
      {
        // TODO(contenido): en el portafolio el título de esta referencia repite el de la IN 8020-1
        // ("Eslinga Sencilla Regulable con Absorbedor y Mosquetón Mixto"); parece un error de copia.
        nombre: "Eslinga de posicionamiento regulable (IN 8040-R)",
        descripcion:
          "La eslinga IN 8040-R es un elemento regulable permite ajustar la longitud de forma rápida y segura, optimizando la postura y el control del trabajador. A diferencia de una eslinga fija, este modelo permite regular la longitud en tiempo real, optimizando la posición del trabajador, mejorando la ergonomía y reduciendo riesgos operativos. Una solución diseñada para entornos exigentes donde la adaptabilidad, resistencia y control son fundamentales.",
      },
    ],
    // TODO(contenido): el portafolio escribe "ANSI/ASSEA10.32-2012" (probable error de tipeo de "ANSI/ASSE A10.32-2012").
    normas: "ANSI Z359.1, ANSI Z359.12, CSA Z259.12, ANSI/ASSEA10.32-2012, ANSI/ASSE Z359.3-2019",
    imagenes: [
      { archivo: "eslingas-de-posicionamiento-in-8040.webp", alt: "Eslinga de posicionamiento en cuerda blanca con ganchos de acero" },
      { archivo: "eslingas-de-posicionamiento-in-8040-2.webp", alt: "Eslinga de posicionamiento en cuerda con gancho de gran apertura" },
      { archivo: "eslingas-de-posicionamiento-in-8040-3.webp", alt: "Eslinga de posicionamiento en cuerda con ganchos de acero y absorbedor" },
    ],
  },

  // ───────────── Señalización y seguridad vial ─────────────
  {
    slug: "conos-viales-pvc-90-cm",
    categoria: "senalizacion-y-seguridad-vial",
    nombre: "Conos viales en PVC 90 cm",
    resumen:
      "Cono vial de 90 cm en PVC flexible, naranja con franjas reflectivas, para señalización temporal y control de tránsito.",
    descripcion: [
      "El cono vial de 90 cm es un elemento fundamental para la señalización temporal y control de tránsito, diseñado para ofrecer máxima visibilidad, estabilidad y durabilidad en entornos urbanos e industriales. Fabricado en PVC flexible, garantiza resistencia al uso continuo y a condiciones ambientales exigentes.",
    ],
    caracteristicas: [
      "Alta visibilidad: Color naranja brillante con franjas reflectivas.",
      "Seguridad operativa: Delimita zonas de riesgo de forma clara y efectiva.",
      "Resistencia y flexibilidad: Material que soporta impactos sin deformarse permanentemente.",
      "Estabilidad: Peso adecuado para uso en exteriores.",
      "Versatilidad: Apto para múltiples aplicaciones viales e industriales.",
    ],
    diferenciadores: [],
    modelos: [
      {
        nombre: "Cono vial base naranja body de 90 cm",
        descripcion:
          "El cono vial base naranja body de 90 cm está diseñado para ofrecer señalización clara, rápida y efectiva, siendo ideal para operaciones donde se requiere movilidad, fácil instalación y alta visibilidad.",
        caracteristicas: [
          "Ligero y funcional: Facilita transporte, instalación y reubicación.",
          "Resistencia operativa: Material flexible que soporta impactos.",
          "Versatilidad de uso: Ideal para señalización temporal y móvil.",
          "Configuración adaptable: Opciones de reflectividad según necesidad.",
        ],
      },
    ],
    imagenes: [
      { archivo: "conos-viales-pvc-90-cm.webp", alt: "Cono vial naranja con franjas reflectivas blancas y base naranja" },
      { archivo: "conos-viales-pvc-90-cm-2.webp", alt: "Cono vial naranja con franjas reflectivas, visto de frente" },
    ],
  },
  {
    slug: "senalizador-vial-tubular-base-pesada",
    categoria: "senalizacion-y-seguridad-vial",
    nombre: "Señalizador Vial Tubular Base Pesada",
    resumen:
      "Señalizador tubular de base pesada con reflectivos prismáticos, para demarcar, acordonar y controlar zonas de riesgo.",
    descripcion: [
      "El señalizador vial tubular de base pesada es un sistema especializado para demarcación, acordonamiento y control de zonas de riesgo, diseñado para ofrecer mayor estabilidad, visibilidad y durabilidad frente a soluciones tradicionales. Su estructura tubular permite crear cerramientos más definidos y seguros en entornos de obra y tránsito.",
    ],
    caracteristicas: [
      "Alta estabilidad: Base pesada que evita desplazamientos por viento o impacto.",
      "Visibilidad superior: Reflectivos prismáticos de alta intensidad.",
      "Delimitación estructurada: Permite acordonar áreas con cinta o cadena.",
      "Durabilidad prolongada: Materiales resistentes a intemperie y radiación UV.",
      "Cumplimiento normativo: Alineado con el Manual de Señalización Vial Colombia 2015.",
    ],
    diferenciadores: [],
    modelos: [],
    usos: {
      intro: "Ideal para escenarios donde se requiere delimitación continua y control visual claro:",
      items: [
        "Cerramientos de obra",
        "Señalización en vías",
        "Delimitación de zonas de riesgo",
        "Control de tránsito peatonal y vehicular",
        "Obras civiles y mantenimiento vial",
      ],
    },
    imagenes: [
      {
        archivo: "senalizador-vial-tubular-base-pesada.webp",
        alt: "Señalizador vial tubular naranja con reflectivos y base pesada negra",
      },
    ],
  },
  {
    slug: "cilindro-vial-tipo-caneca",
    categoria: "senalizacion-y-seguridad-vial",
    nombre: "Cilindro Vial Tipo Caneca",
    resumen:
      "Cilindro vial con bandas reflectivas y base lastrada, para canalizar, separar y guiar el flujo vehicular.",
    descripcion: [
      "El cilindro vial tipo caneca es un dispositivo diseñado para canalizar, separar y guiar el flujo vehicular, ofreciendo alta visibilidad diurna y nocturna gracias a su sistema de bandas reflectivas. Su estructura robusta con base lastrada proporciona estabilidad superior, ideal para operaciones viales exigentes.",
    ],
    caracteristicas: [
      "Alta visibilidad 360°: Bandas reflectivas que alertan con anticipación.",
      "Máxima estabilidad: Sistema de lastre que evita desplazamientos.",
      "Control efectivo del tráfico: Ideal para canalización y desvíos.",
      "Durabilidad en exteriores: Material con protección UV.",
      "Versatilidad operativa: Apto para múltiples escenarios viales.",
    ],
    diferenciadores: [],
    modelos: [],
    usos: {
      intro: "Especialmente recomendado para escenarios de control y canalización vial:",
      items: [
        "División de carriles",
        "Desvíos temporales",
        "Zonas de parqueo",
        "Ciclorrutas",
        "Cruces peligrosos",
        "Obras viales",
        "Reducción de velocidad",
        "Delimitación de zonas de riesgo",
      ],
    },
    imagenes: [
      { archivo: "cilindro-vial-tipo-caneca.webp", alt: "Cilindro vial tipo caneca naranja y blanco con bandas reflectivas y base negra" },
    ],
  },
];

// ───────────── Consultas ─────────────

export function productosDeCategoria(categoria: string): Producto[] {
  return productos.filter((p) => p.categoria === categoria);
}

export function productoPorSlug(slug: string): Producto | undefined {
  return productos.find((p) => p.slug === slug);
}

/** Producto de una categoría concreta (la dirección es /productos/<categoria>/<producto>). */
export function productoDeCategoria(categoria: string, slug: string): Producto | undefined {
  return productos.find((p) => p.categoria === categoria && p.slug === slug);
}

/** Otros productos de la misma categoría, para "Productos relacionados". */
export function productosRelacionados(producto: Producto, max = 4): Producto[] {
  return productos.filter((p) => p.categoria === producto.categoria && p.slug !== producto.slug).slice(0, max);
}

// Producto cuya foto se usa como portada de cada categoría (uno representativo).
// Las categorías sin productos en el portafolio no tienen portada: se ve un bloque de color.
const PORTADAS: Partial<Record<CategoriaSlug, string>> = {
  "dotacion-ropa-de-trabajo": "overol-con-reflectivos",
  "calzado-de-seguridad": "bota-safety-tridensidad",
  "proteccion-personal": "cascos-v-gard",
  "trabajo-en-alturas": "arnes-in-8004",
  "senalizacion-y-seguridad-vial": "conos-viales-pvc-90-cm",
};

export function portadaDeCategoria(categoria: CategoriaSlug): ImagenProducto | undefined {
  const slug = PORTADAS[categoria];
  return slug ? productoPorSlug(slug)?.imagenes[0] : undefined;
}

/** Ruta pública de una foto del catálogo. */
export function rutaImagen(archivo: string): string {
  return `/catalogo/${archivo}`;
}
