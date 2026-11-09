// Íconos dibujados con SVG directamente en el código: no hace falta instalar
// ningún paquete. Trazos basados en Lucide (https://lucide.dev, licencia ISC).
// Son decorativos (aria-hidden): el texto de al lado ya dice lo que significan.
// Toman el color del texto que los rodea (currentColor).

import type { ReactNode } from "react";

type PropsIcono = { className?: string };

function Icono({ className, children }: PropsIcono & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}

/** Globo de chat con un teléfono: representa WhatsApp. */
export function IconoWhatsApp({ className }: PropsIcono) {
  return (
    <Icono className={className}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path
        transform="translate(7.2 7.2) scale(0.4)"
        vectorEffect="non-scaling-stroke"
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      />
    </Icono>
  );
}

/** Camisa: dotación y uniformes. */
export function IconoUniforme({ className }: PropsIcono) {
  return (
    <Icono className={className}>
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    </Icono>
  );
}

/** Etiqueta: personalización con el logo de la empresa. */
export function IconoEtiqueta({ className }: PropsIcono) {
  return (
    <Icono className={className}>
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </Icono>
  );
}

/** Caja: un solo proveedor para todo. */
export function IconoPaquete({ className }: PropsIcono) {
  return (
    <Icono className={className}>
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </Icono>
  );
}

/** Hoja con renglones: facturación electrónica. */
export function IconoDocumento({ className }: PropsIcono) {
  return (
    <Icono className={className}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </Icono>
  );
}

/** Globo de mensaje con renglones: asesoría. */
export function IconoMensaje({ className }: PropsIcono) {
  return (
    <Icono className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 9h8" />
      <path d="M8 13h6" />
    </Icono>
  );
}

/** Camión: despachos. */
export function IconoCamion({ className }: PropsIcono) {
  return (
    <Icono className={className}>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </Icono>
  );
}

/** Reloj: atención rápida. */
export function IconoReloj({ className }: PropsIcono) {
  return (
    <Icono className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </Icono>
  );
}
