import { nombreCategoria, type DatosCotizacion } from "./validaciones/cotizacion";

// Arma el texto de la solicitud con los datos del formulario.
// El mismo texto sirve para WhatsApp y para el cuerpo del correo.
// Recibe datos YA validados y limpios (ver validarCotizacion).

export function mensajeCotizacion(d: DatosCotizacion): string {
  return [
    "Hola, Fesapy. Quiero cotizar.",
    `Nombre: ${d.nombre}`,
    `Empresa: ${d.empresa}`,
    `Correo: ${d.correo}`,
    `Teléfono: ${d.telefono}`,
    `Ciudad de entrega: ${d.ciudad}`,
    `Categoría: ${nombreCategoria(d.categoria)}`,
    `Mensaje: ${d.mensaje}`,
    "",
    "Autorizo el tratamiento de mis datos personales según la política de tratamiento de datos de Fesapy.",
  ].join("\n");
}

/** Asunto del correo: UNA sola línea, sin saltos. */
export function asuntoCotizacion(d: DatosCotizacion): string {
  return `Solicitud de cotización - ${d.empresa}`;
}
