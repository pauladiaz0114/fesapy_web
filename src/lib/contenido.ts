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
