import { contacto } from "./contenido";

/**
 * Arma un enlace mailto: que abre el programa de correo de la persona con el
 * mensaje ya escrito.
 *
 * - encodeURIComponent convierte espacios, tildes y saltos de línea en códigos
 *   seguros (el salto de línea queda "%0A"). En mailto los espacios deben ser
 *   "%20", no "+": encodeURIComponent lo hace bien.
 * - El asunto va en UNA sola línea: se le quitan los saltos de línea para que
 *   nadie pueda "inyectar" otras cabeceras de correo.
 */
export function enlaceCorreo(asunto: string, cuerpo: string): string {
  const asuntoUnaLinea = asunto.replace(/[\r\n]+/g, " ").trim();
  return `mailto:${contacto.correo}?subject=${encodeURIComponent(asuntoUnaLinea)}&body=${encodeURIComponent(cuerpo)}`;
}
