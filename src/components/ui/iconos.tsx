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

/** Camisa: uniformes industriales. */
export function IconoUniforme({ className }: PropsIcono) {
  return (
    <Icono className={className}>
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    </Icono>
  );
}

/** Maletín: dotaciones empresariales. */
export function IconoDotacion({ className }: PropsIcono) {
  return (
    <Icono className={className}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </Icono>
  );
}

/** Escudo con chulo: elementos de seguridad. */
export function IconoSeguridad({ className }: PropsIcono) {
  return (
    <Icono className={className}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </Icono>
  );
}

/** Medalla: calidad y confianza. */
export function IconoCalidad({ className }: PropsIcono) {
  return (
    <Icono className={className}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </Icono>
  );
}

/** Fábrica. */
export function IconoFabrica({ className }: PropsIcono) {
  return (
    <Icono className={className}>
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M17 18h1" />
      <path d="M12 18h1" />
      <path d="M7 18h1" />
    </Icono>
  );
}

/** Gota: petroleras. */
export function IconoPetrolera({ className }: PropsIcono) {
  return (
    <Icono className={className}>
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </Icono>
  );
}

/** Casco: constructoras. */
export function IconoConstructora({ className }: PropsIcono) {
  return (
    <Icono className={className}>
      <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
      <path d="M14 6a6 6 0 0 1 6 6v3" />
      <path d="M4 15v-3a6 6 0 0 1 6-6" />
      <rect x="2" y="15" width="20" height="4" rx="1" />
    </Icono>
  );
}
