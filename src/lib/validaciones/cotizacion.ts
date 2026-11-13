import { z } from "zod";
import { categoriaValida, categorias } from "../contenido";
import { limpiarLinea, limpiarParrafo } from "../sanitizar";

// Validación del formulario de cotización. Corre en el NAVEGADOR: el formulario
// no guarda nada en ningún servidor, solo arma un mensaje para WhatsApp o correo.
// (Si algún día se guardan datos, esta misma validación debe repetirse en el servidor.)

// Teléfono colombiano "razonable", tras quitar espacios, guiones, puntos y paréntesis:
//  - celular: 10 dígitos que empiezan por 3        (3123329422)
//  - fijo con indicativo: 10 dígitos que empiezan por 60 (6013456789)
//  - fijo local: 7 dígitos                         (3456789)
// Se acepta un prefijo +57 o 57 al comienzo.
const SOLO_DIGITOS_Y_SIGNO = /[\s\-.()]/g;

export function normalizarTelefono(valor: string): string {
  let t = valor.replace(SOLO_DIGITOS_Y_SIGNO, "");
  if (t.startsWith("+57")) t = t.slice(3);
  else if (t.length > 10 && t.startsWith("57")) t = t.slice(2);
  return t;
}

const telefonoValido = (valor: string) => {
  const t = normalizarTelefono(valor);
  return /^3\d{9}$/.test(t) || /^60\d{8}$/.test(t) || /^\d{7}$/.test(t);
};

// El formulario NO pide NIT (decisión del 2026-11-12: menos datos personales y menos fricción).

export const esquemaCotizacion = z.strictObject({
  nombre: z
    .string()
    .min(2, { error: "Escribe tu nombre." })
    .max(80, { error: "El nombre es demasiado largo (máximo 80 letras)." }),
  empresa: z
    .string()
    .min(2, { error: "Escribe el nombre de tu empresa." })
    .max(100, { error: "El nombre de la empresa es demasiado largo (máximo 100)." }),
  correo: z
    .string()
    .max(120, { error: "El correo es demasiado largo." })
    .pipe(z.email({ error: "Escribe un correo válido, por ejemplo nombre@empresa.com." })),
  telefono: z
    .string()
    .max(25, { error: "El teléfono es demasiado largo." })
    .refine(telefonoValido, {
      error: "Escribe un teléfono colombiano válido, por ejemplo 312 332 9422.",
    }),
  ciudad: z
    .string()
    .min(2, { error: "Escribe la ciudad de entrega." })
    .max(80, { error: "La ciudad es demasiado larga (máximo 80 letras)." }),
  categoria: z.string().refine((v) => categoriaValida(v) !== undefined, {
    error: "Elige una categoría.",
  }),
  mensaje: z
    .string()
    .min(10, { error: "Cuéntanos un poco más qué necesitas (mínimo 10 letras)." })
    .max(800, { error: "El mensaje es demasiado largo (máximo 800 letras)." }),
  acepta: z.literal(true, {
    error: "Debes autorizar el tratamiento de tus datos para poder enviar la solicitud.",
  }),
});

export type DatosCotizacion = z.infer<typeof esquemaCotizacion>;
export type CampoCotizacion = keyof DatosCotizacion;

/** Lo que llega del formulario, antes de limpiarlo. */
export type ValoresFormulario = {
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
  ciudad: string;
  categoria: string;
  mensaje: string;
  acepta: boolean;
};

/** Limpia cada campo (espacios, caracteres raros). */
export function limpiarValores(v: ValoresFormulario): ValoresFormulario {
  return {
    nombre: limpiarLinea(v.nombre),
    empresa: limpiarLinea(v.empresa),
    correo: limpiarLinea(v.correo).toLowerCase(),
    telefono: limpiarLinea(v.telefono),
    ciudad: limpiarLinea(v.ciudad),
    categoria: limpiarLinea(v.categoria),
    mensaje: limpiarParrafo(v.mensaje),
    acepta: v.acepta,
  };
}

export type ResultadoValidacion =
  | { ok: true; datos: DatosCotizacion }
  | { ok: false; errores: Partial<Record<CampoCotizacion, string>> };

/** Limpia y valida. Devuelve los datos listos o UN mensaje de error por campo. */
export function validarCotizacion(valores: ValoresFormulario): ResultadoValidacion {
  const resultado = esquemaCotizacion.safeParse(limpiarValores(valores));
  if (resultado.success) return { ok: true, datos: resultado.data };

  const errores: Partial<Record<CampoCotizacion, string>> = {};
  for (const problema of resultado.error.issues) {
    const campo = problema.path[0] as CampoCotizacion | undefined;
    if (campo && !errores[campo]) errores[campo] = problema.message;
  }
  return { ok: false, errores };
}

/** Texto de la categoría elegida (por su slug), para el mensaje. */
export function nombreCategoria(slug: string): string {
  return categorias.find((c) => c.slug === slug)?.nombre ?? slug;
}
