import type { Metadata } from "next";
import { Categorias } from "@/components/inicio/Categorias";
import { Hero } from "@/components/inicio/Hero";
import { Problemas } from "@/components/inicio/Problemas";

// Título y descripción que muestran Google y WhatsApp al compartir el enlace.
export const metadata: Metadata = {
  title: { absolute: "Fesapy Distribuciones — Dotaciones para tu empresa" },
  description:
    "Dotación industrial, elementos de protección personal y calzado de seguridad con el logo de tu empresa. Sedes en Madrid (Cundinamarca), Bogotá y Villavicencio, con envíos nacionales. Cotiza por WhatsApp o por correo.",
};

// Página de inicio. El encabezado, el pie y el botón flotante vienen de layout.tsx.
export default function Inicio() {
  return (
    <>
      <Hero />
      {/* "Cómo cotizar" se quitó el 2026-11-26 (pedido de Sebastián): el hero ya tiene los botones
          de cotizar y la franja dorada "¿No ves lo que buscas?" cierra la página. */}
      <Problemas />
      <Categorias />
      {/* La sección de clientes y reseñas se quitó el 2026-11-12: vuelve cuando haya logos y
          reseñas reales con permiso (ver docs/DECISIONES.md). */}
    </>
  );
}
