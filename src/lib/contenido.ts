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
  // TODO(contenido): número de WhatsApp de Fesapy con indicativo de país,
  // solo dígitos, sin "+" ni espacios. Ejemplo de formato: "573001234567".
  // Mientras esté vacío, el botón abre WhatsApp para que la persona elija el contacto.
  whatsapp: "",
  // TODO(contenido): correo de contacto de Fesapy.
  correo: "",
} as const;
