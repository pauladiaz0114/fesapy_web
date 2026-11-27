// Reseñas de clientes que se muestran en el inicio ("Lo que dicen nuestros clientes").
//
// REGLAS (no inventar testimonios):
// - Solo reseñas REALES que el cliente envió y en las que AUTORIZÓ publicar su nombre y empresa
//   (el formulario de reseñas pide esa autorización; llega a Fesapy por WhatsApp o correo).
// - Se copian tal cual las escribió el cliente (se pueden corregir solo tildes u ortografía).
// - Si un cliente pide retirarla, se borra de esta lista.
// Mientras la lista esté vacía, la sección muestra solo la invitación y el formulario.

export type Resena = {
  nombre: string;
  /** Opcional: empresa del cliente, si autorizó mostrarla. */
  empresa?: string;
  /** De 1 a 5 estrellas. */
  calificacion: 1 | 2 | 3 | 4 | 5;
  texto: string;
  /** Mes y año en que llegó, por ejemplo "noviembre de 2026". */
  fecha: string;
  /** Opcional: slug del producto si la reseña es de un producto (sale también en su ficha). */
  producto?: string;
};

// TODO(contenido): agregar aquí las reseñas reales autorizadas que lleguen a Fesapy.
export const resenas: Resena[] = [];

// TODO(contenido): enlace del perfil de Fesapy en Google (Google Business Profile) para ver y dejar
// reseñas allí. Mientras sea null, el botón "Ver reseñas en Google" no aparece.
export const enlaceResenasGoogle: string | null = null;
