import type { Metadata } from "next";
import { BloqueCotizacion } from "@/components/inicio/BloqueCotizacion";
import { Categorias } from "@/components/inicio/Categorias";
import { ClientesResenas } from "@/components/inicio/ClientesResenas";
import { Hero } from "@/components/inicio/Hero";
import { Problemas } from "@/components/inicio/Problemas";
import { Ventajas } from "@/components/inicio/Ventajas";

// Título y descripción que muestran Google y WhatsApp al compartir el enlace.
export const metadata: Metadata = {
  title: { absolute: "Fesapy Distribuciones — Dotaciones para tu empresa" },
  description:
    "Dotación industrial, elementos de protección personal y calzado de seguridad con el logo de tu empresa. Atendemos empresas desde Madrid, Cundinamarca. Cotiza por WhatsApp o por correo.",
};

// Página de inicio. El encabezado, el pie y el botón flotante vienen de layout.tsx.
export default function Inicio() {
  return (
    <>
      <Hero />
      <BloqueCotizacion />
      <Ventajas />
      <Problemas />
      <Categorias />
      <ClientesResenas />
    </>
  );
}
