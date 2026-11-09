// Limpieza de texto que escribe una persona (antes de validarlo o de armar un mensaje).
// Se usa en el navegador (formulario de cotización), por eso NO lleva "server-only".

// Caracteres de control (U+0000–U+001F y U+007F) y los de dirección de texto
// invisibles (U+200B–U+200F, U+202A–U+202E, U+2066–U+2069).
// Los saltos de línea (\n) se tratan aparte.
const CONTROL = /[\u0000-\u0009\u000B-\u001F\u007F​-‏‪-‮⁦-⁩]/g;

/**
 * Texto de UNA línea (nombre, empresa, correo…): sin saltos de línea ni
 * caracteres de control, con los espacios repetidos unidos y sin espacios en las puntas.
 */
export function limpiarLinea(texto: string): string {
  return texto.replace(/[\r\n]+/g, " ").replace(CONTROL, "").replace(/\s+/g, " ").trim();
}

/**
 * Texto de VARIAS líneas (el mensaje): conserva los saltos de línea, pero quita
 * caracteres de control, espacios al final de cada línea y más de 2 saltos seguidos.
 */
export function limpiarParrafo(texto: string): string {
  return texto
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL, "")
    .replace(/[ \t]+/g, " ")
    .replace(/ ?\n ?/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
