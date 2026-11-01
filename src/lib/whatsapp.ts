import { contacto } from "./contenido";

// Mensaje que llega prellenado al WhatsApp de Fesapy.
// El cliente solo completa los datos después de cada ":".
export const MENSAJE_COTIZACION = [
  "Hola, Fesapy. Quiero cotizar.",
  "Empresa:",
  "NIT:",
  "Productos y cantidades:",
  "¿Con logo de la empresa? (sí/no):",
  "Ciudad de entrega:",
].join("\n");

/**
 * Arma el enlace de WhatsApp: https://wa.me/<número>?text=<mensaje>
 *
 * - encodeURIComponent convierte espacios, tildes, "¿", ":" y saltos de línea
 *   en códigos seguros para una URL (por ejemplo, el salto de línea queda "%0A").
 *   Sin esto, el mensaje llegaría cortado o roto.
 * - Del número se dejan solo los dígitos: wa.me no acepta "+", espacios ni guiones.
 * - Si aún no hay número (TODO en contenido.ts), wa.me/?text=... abre WhatsApp
 *   con el mensaje escrito y la persona elige a quién enviarlo.
 */
export function enlaceWhatsApp(
  mensaje: string = MENSAJE_COTIZACION,
  numero: string = contacto.whatsapp,
): string {
  const soloDigitos = numero.replace(/\D/g, "");
  return `https://wa.me/${soloDigitos}?text=${encodeURIComponent(mensaje)}`;
}

/** Enlace listo para los botones de "Cotizar por WhatsApp". */
export const ENLACE_COTIZAR = enlaceWhatsApp();
