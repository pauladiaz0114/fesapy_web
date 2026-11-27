import { z } from "zod";
import { limpiarLinea, limpiarParrafo } from "../sanitizar";

// Validación del formulario de reseñas. Corre en el NAVEGADOR: el formulario no guarda nada en
// ningún servidor, solo arma un mensaje para WhatsApp o correo (igual que la cotización).

export const esquemaResena = z.strictObject({
  nombre: z
    .string()
    .min(2, { error: "Escribe tu nombre." })
    .max(80, { error: "El nombre es demasiado largo (máximo 80 letras)." }),
  // Opcional: puede quedar vacío.
  empresa: z.string().max(100, { error: "El nombre de la empresa es demasiado largo (máximo 100)." }),
  calificacion: z
    .number({ error: "Elige de 1 a 5 estrellas." })
    .int()
    .min(1, { error: "Elige de 1 a 5 estrellas." })
    .max(5, { error: "Elige de 1 a 5 estrellas." }),
  resena: z
    .string()
    .min(10, { error: "Cuéntanos un poco más (mínimo 10 letras)." })
    .max(600, { error: "La reseña es demasiado larga (máximo 600 letras)." }),
  autoriza: z.literal(true, {
    error: "Debes autorizar la publicación y el tratamiento de tus datos para enviar la reseña.",
  }),
});

export type DatosResena = z.infer<typeof esquemaResena>;
export type CampoResena = keyof DatosResena;

/** Lo que llega del formulario, antes de limpiarlo (0 estrellas = sin elegir). */
export type ValoresResena = {
  nombre: string;
  empresa: string;
  calificacion: number;
  resena: string;
  autoriza: boolean;
};

export function limpiarResena(v: ValoresResena): ValoresResena {
  return {
    nombre: limpiarLinea(v.nombre),
    empresa: limpiarLinea(v.empresa),
    calificacion: v.calificacion,
    resena: limpiarParrafo(v.resena),
    autoriza: v.autoriza,
  };
}

export type ResultadoResena =
  | { ok: true; datos: DatosResena }
  | { ok: false; errores: Partial<Record<CampoResena, string>> };

/** Limpia y valida. Devuelve los datos listos o UN mensaje de error por campo. */
export function validarResena(valores: ValoresResena): ResultadoResena {
  const resultado = esquemaResena.safeParse(limpiarResena(valores));
  if (resultado.success) return { ok: true, datos: resultado.data };
  const errores: Partial<Record<CampoResena, string>> = {};
  for (const problema of resultado.error.issues) {
    const campo = problema.path[0] as CampoResena | undefined;
    if (campo && !errores[campo]) errores[campo] = problema.message;
  }
  return { ok: false, errores };
}

/** Texto que llega a Fesapy (WhatsApp o cuerpo del correo). Recibe datos YA validados. */
export function mensajeResena(d: DatosResena): string {
  return [
    "Hola, Fesapy. Quiero dejar una reseña.",
    `Nombre: ${d.nombre}`,
    `Empresa: ${d.empresa || "(no indicada)"}`,
    `Calificación: ${"★".repeat(d.calificacion)}${"☆".repeat(5 - d.calificacion)} (${d.calificacion} de 5)`,
    `Reseña: ${d.resena}`,
    "",
    "Autorizo a Fesapy a publicar esta reseña con mi nombre y empresa en su sitio web, y el tratamiento de mis datos según su política de tratamiento de datos.",
  ].join("\n");
}

/** Asunto del correo: UNA sola línea. */
export function asuntoResena(d: DatosResena): string {
  return `Reseña de ${d.nombre}`;
}
